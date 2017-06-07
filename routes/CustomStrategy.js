const passport = require('passport-strategy')
const util = require('util')
const formBody = util.promisify(require('body/form'))
const request = require('request-promise-native')

class Strategy extends passport.Strategy {

	constructor(options) {
      	super();
      	this.name = 'custom';
      	this.options = options
	}

	authenticate(req, options) {

		formBody(req)
		.then( body => {
	    	if (!!body.saml) {
	        	return this.redirectionFromHub(body, options)
			} else {
				return this.redirectToHub(req, options)
			}
		})
		.catch( err => {this.error(err)})
	}

	redirectToHub(req, options) {

		return request(this.options.serviceProviderUrl + '/authn-request')
		.then( samlAuthnRequest => {
			req.res.send(`
			<h1>Send SAML Authn request to hub</h1>
			<form method='post' action='${this.options.sampleHubUrl}?callback=${encodeURIComponent(this.options.callbackUrl)}'>
				<input type='hidden' name='saml' value='${samlAuthnRequest.saml}'/>
				<input type='hidden' name='relayState' value='${this.options.relayState(req)}'/>
				<button>Submit</button>
			</form>`)
		})

	}

	redirectionFromHub(body, options) {

		return request({
			uri: this.options.serviceProviderUrl + '/authn-response',
			body: { saml: body.saml },
			method: 'POST',
			json: true
		})
		.then( user => {
			this.success(user, {});
		})

	}

}

module.exports = Strategy;
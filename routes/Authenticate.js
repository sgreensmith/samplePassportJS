const https = require('https')
const http = require('http')
const util = require('util')
const formBody = util.promisify(require('body/form'))
const request = require('request-promise-native')

const Authenticate = {

    authenticate: (callbackUrl, serviceProviderUrl, ) => {
    	return async function (req, res, next) {

			try {

				let samlAuthnRequest = await request(serviceProviderUrl + '/authn-request')

				res.send(`
					<h1>Send SAML Authn request to hub</h1>
					<form method='post' action='http://localhost:3001/authenticate?callback=${encodeURIComponent(callbackUrl)}'>
						<input type='hidden' value='${samlAuthnRequest.saml}'></input>
						<button>Submit</button>
					</form>
				`)

			} catch (err) {
				next(err)
			}

    	}
    },

    callback: async function (req, serviceProviderUrl) {

    	let body = await formBody(req)

		return request({
			uri: serviceProviderUrl + '/authn-response',
			body: { saml: body.saml },
			method: 'POST',
			json: true
		})

    },

	getAuthnRequest: async function (serviceProviderUrl) {

		return await request(serviceProviderUrl + '/authn-request')

	}
}

module.exports = Authenticate
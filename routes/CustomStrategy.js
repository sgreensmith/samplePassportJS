var passport = require('passport-strategy');


class Strategy extends passport.Strategy {
	constructor(options) {
      	super();
      	this.name = 'custom';
      	this.options = options
	}

	authenticate(req, options) {

	    if (req.headers['referer'] === 'http://localhost:3001/authenticate') {
	        this.redirectionFromHub(req, options)
	    } else {
			this.redirectToHub(req, options)
		}
	}

	redirectToHub(req, options) {
		req.res.send(`
		<h1>Send SAML Authn request to hub</h1>
		<form method='post' action='http://localhost:3001/authenticate?callback=${encodeURIComponent(this.options.callback)}'>
			<button>Submit</button>
		</form>`)
	}

	redirectionFromHub(req, options) {
		var user = {username: 'hristo'};

		//this.error('bad saml', 400)

		//this.fail('reason', 400)

		this.success(user, {});
	}

}

module.exports = Strategy;
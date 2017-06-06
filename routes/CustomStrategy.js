var passport = require('passport-strategy');


class Strategy extends passport.Strategy {
	constructor() {
      	super();
      	this.name = 'custom';
	}

	authenticate(req, options) {
	    if (isSamlBackFromHub) {
	        this.redirectionFromHub(req, options)
	    } else {
			this.redirectToHub(req, options)
		}
	}

	redirectToHub(req, options) {
		req.res.send(`<form method='post' action='http://localhost:3001/authenticate'><button>Submit</button></form>`)
	}

	redirectionFromHub(req, options) {
		var user = {username: 'sam'};

		//this.error('bad saml', 400)

		//this.fail('reason', 400)

		this.redirectPostBack()

		this.success(user, {});
	}

}

module.exports = Strategy;
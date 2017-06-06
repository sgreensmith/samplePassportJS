const router = require('express').Router()
const Authenticate = require('./Authenticate')

const config = {
	callbackUrl: 'http://localhost:3000/login-callback',
	serviceProviderUrl: 'http://localhost:3002',
	sampleHubUrl: 'http://localhost:3001/authenticate'
}

/**
 * An example integration where the samlAuthnRequest
 * is rendered by the authentication library
 */
router.get('/login', Authenticate.authenticate(config.callbackUrl, config.serviceProviderUrl))

/**
 * An example integration where the samlAuthnRequest
 * is rendered by the application so that it can add a
 * possible RelayState-parameter
 */
router.get('/login-with-relaystate', async function(req, res, next) {

	const authnRequest = await Authenticate.getAuthnRequest(config.serviceProviderUrl)

	res.render('samlform', {
		sampleHubUrl: config.sampleHubUrl,
		callbackUrl: encodeURIComponent(config.callbackUrl),
		saml: authnRequest.saml
	})

})

/**
 * An example callback handler that gets user attributes from
 * a saml-response message
 */
router.post('/login-callback', async function (req, res, next) {
	try {
		let user = await Authenticate.callback(req, config.serviceProviderUrl)

		res.render('index', {
			username: user.name,
			title: 'Example of using custom authentication framework'
		})

	} catch (err) {
		next(err)
	}
});

module.exports = router

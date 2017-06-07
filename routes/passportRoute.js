var express = require('express');
var router = express.Router();
var passport = require('passport');
var CustomStrategy = require('./CustomStrategy');

passport.serializeUser(function(user, done) {
	done(null, user.name)
});

passport.deserializeUser(function(name, done) {
	done(null, { username: name })
});

/**
 * Configure the custom strategy with Service Provider and IDP urls
 * Relay state is optional
 */
passport.use(new CustomStrategy({
    callbackUrl: 'http://localhost:3000/passport-login',
    relayState: req => {
    	return 'relayState'
    },
	serviceProviderUrl: 'http://localhost:3002',
	sampleHubUrl: 'http://localhost:3001/authenticate'
}));

/**
 *  Initial login request required to generate a POST to the Passport middleware
 */
router.get('/passport-login', passport.authenticate('custom'));

/**
 * Applies the passport middleware
 *
 */
router.post('/passport-login', passport.authenticate('custom', { successRedirect: '/', failureRedirect: '/passport-login', session: true }));

module.exports = router;

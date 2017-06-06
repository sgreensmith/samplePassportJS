var express = require('express');
var router = express.Router();
var passport = require('passport');
var CustomStrategy = require('./CustomStrategy');

passport.serializeUser(function(user, done) {
  console.log('SERIALIZE')
  done(null, user.username);
});

passport.deserializeUser(function(username, done) {
  done(null, { username: username })
});

passport.use(new CustomStrategy({
    callback: 'http://localhost:3000/passport-login'
}));


router.get('/passport-login', function(req, res, next) {
    res.render('passport-login');
})

router.post('/passport-login', passport.authenticate('custom', { successRedirect: '/', failureRedirect: '/passport-login' }));

module.exports = router;

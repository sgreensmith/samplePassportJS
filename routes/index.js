var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var CustomStrategy = require('./CustomStrategy');

passport.use(new CustomStrategy());


/* GET home page. */
router.get('/', function(req, res, next) {
console.log(req.user)
var name = req.user && req.user.username ? req.user.username : ''
  res.render('index', {
    title: 'example of using password',
    username: name
  });
});

//
//router.get('/lo:gin', verifyLoginRoute({options...}))
//router.post('/login-callback', verifyLoginCallbackRoute(function onSuccess() {


}))


router.get('/login', function(req, res, next) {
    res.render('login');
})

router.post('/login', passport.authenticate('custom', { successRedirect: '/', failureRedirect: '/login' }));

module.exports = router;

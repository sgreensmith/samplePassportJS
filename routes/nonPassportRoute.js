const router = require('express').Router();
const Authenticate = require('./Authenticate');

router.get('/login', function(req, res, next) {
    res.render('login');
})

router.post('/login', Authenticate.authenticate('http://localhost:3000/login-callback'));

router.post('/login-callback', (req, res) => {
	Authenticate.callback(req)
		.then(user => {
			//set the user in session and redirect
			res.render('index', {
				username: user.username,
				title: 'Example of using custom authentication framework'
			})
		})
		.catch(err => {
			console.error(err)
		})
});


module.exports = router;

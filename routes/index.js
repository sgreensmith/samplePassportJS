const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.user)
  let name = req.user && req.user.username ? req.user.username : ''
  res.render('index', {
    title: 'example of using password',
    username: name
  });
});

module.exports = router;

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

/* GET home page. */
router.get('/', function(req, res) {
  res.render('detail', { title: 'detail' });
});


module.exports = router;

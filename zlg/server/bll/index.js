var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.set('Content-Type', 'text/html; charset=utf-8');
  res.end('主页');
});

module.exports = router;

var express = require('express');
var admin = require('../../dao/admin.js');

var router = express.Router();

router.get('/', function (req, res) {
    var adminnumber = '123321'

    admin.insertAdmin(adminnumber, function () {
        console.log(result);
        res.set('Content-Type', 'text/html; charset=utf-8');
        res.end('注册成功');
    })
})



module.exports = router;
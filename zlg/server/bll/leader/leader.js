var express = require('express');
var leader = require('../../dao/leader.js');

var router = express.Router();

router.get('/add', function (req, res) {
    var username = 'aaaaaa';
    var password = '123456';

    leader.insertLeader(username, password, function (result) {
        console.log(result);
        res.json({
            result
        })
    })
})

module.exports = router;

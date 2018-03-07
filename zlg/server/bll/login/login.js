var express = require('express');
var leader = require('../../dao/leader.js');
var user = require('../../dao/user.js');
var storage = require('../../dao/storage.js');
var multiparty = require('multiparty');

var router = express.Router();


router.post('/', function (req, res) {
    var form = new multiparty.Form();
    form.parse(req, function (err, fields, files) {
        var username = fields.username[0];
        var password = fields.password[0];
        var identity = fields.identity[0];

        // var username = '1233221'
        // var password = '12345'
        // var identity = 3

        console.log(username)
        console.log(password)
        console.log(identity)

        switch (identity[0]){
            case '1' :
              console.log('login1')
                leader.findLeader(username, password, function (result) {
                    var array = new Array()
                    for (var i in result) {
                        array.push(JSON.parse(result[i]))
                    }
                    console.log('-------------------')
                    console.log(array)
                    console.log('-------------------')
                    if (array.length === 0) {
                        res.json({
                            backInfo: '0'
                        })
                        console.log('不存在该用户')
                    }else if (array.length === 1) {
                        res.json({
                            backInfo: '1',
                            array
                        })
                        // req.session.userinfo = array[0]
                        // req.session.userinfo = result
                        res.send(array);
                        console.log('登录成功')
                    }else {
                        res.json({
                            backInfo: '2'
                        })

                        console.log('登录超时');
                    }
                });
                break;

            case '2':

                storage.findStorageOfLogin(username, password, function (result) {
                    var array = new Array()
                    for (var i in result) {
                        array.push(JSON.parse(result[i]))
                    }
                    console.log('-------------------')
                    console.log(array)
                    console.log('-------------------')
                    if (array.length === 0) {
                        res.json({
                            backInfo: '0'

                        })

                        console.log('不存在该用户')
                    }else if (array.length === 1) {
                        res.json({
                            backInfo: '1',
                            array
                            // username: array[0].username,
                            // storageId: array[0].storageId
                        })
                        // req.session.userinfo = array[0]
                        // req.session.userinfo = result
                        res.send(array);
                        console.log('登录成功')
                    }else {
                        res.json({
                            backInfo: '2'
                        })

                        console.log('登录超时');
                    }
                })
                break;
            case '3':
                user.findUser(username,password,function (result) {
                    var array = new Array()
                    for (var i in result) {
                        array.push(JSON.parse(result[i]))
                    }
                    console.log('-------------------')
                    console.log(array)
                    console.log('-------------------')
                    if (array.length === 0) {
                        res.json({
                            backInfo: '0'
                        })
                        console.log('不存在该用户')
                    }else if (array.length === 1) {
                        res.json({
                            backInfo: '1',
                            array
                        })
                        // req.session.userinfo = array[0]
                        // req.session.userinfo = result
                        res.send(array);
                        console.log('登录成功')
                    }else {
                        res.json({
                            backInfo: '2'
                        })

                        console.log('登录超时');
                    }
                })
                break;
        }
    })
})

module.exports = router;

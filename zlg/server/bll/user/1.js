var express = require('express');
var user = require('../../dao/user.js');
var material = require('../../dao/material.js');
var multiparty = require('multiparty');
var fs = require('fs');

var router = express.Router();

router.get('/add', function (req, res) {
    console.log('------------------------')
    var username = 'aaaaaa'
    var name = 'haha'
    var department = 'sss'
    var password = '123456'
    var phonenumber = '321123'
    var storageId = 1
    var pic = 1

    user.insertUser(storageId, username, name, department, password, phonenumber,pic,function (result) {
        console.log(result);
        res.set('Content-Type', 'text/html; charset=utf-8');
        res.end('注册成功');
    })
})

router.post('/saveUser', function (req, res) {
    var uploadDir='upload';
    var form = new multiparty.Form();
    form.uploadDir=uploadDir;

    form.parse(req, function (err, fields, files) {
        var name = fields.name[0];
        var username = fields.username[0];
        var department = fields.department[0];
        var password = fields.password[0];
        var phonenumber = fields.phonenumber[0];
        var id = fields.id[0];
        var storageId = fields.storageId[0];


      if(files.pic == undefined){
        var originalFilename='';
        var pic='';
      }else {
        var pic=files.pic[0].path;
      }

        user.findUserByUsernameInStorage(username, storageId, function (result) {
            var array = new Array();
            for (var i in result) {
                array.push(JSON.parse(result[i]));
            }
            if(array.length){
                if(id > 0){
                    if(array[0].id == id){
                        if(originalFilename != ''){
                          var pc = array[0].pic;
                            user.updateUser(id, username, name, department, password, phonenumber, pic, function (result) {

                                var array = new Array();
                                for (var i in result) {
                                    array.push(JSON.parse(result[i]));
                                }
                                console.log('-------------------');
                                console.log(array[0]);
                                console.log('-------------------');
                              // fs.unlink(pc);
                                res.json({
                                  update:'ok'
                                })
                            })
                        }else{
                            user.updateUser(id, username, name, department, password, phonenumber, array[0].pic, function (result) {

                                var array = new Array();
                                for (var i in result) {
                                    array.push(JSON.parse(result[i]));
                                }
                                console.log('-------------------');
                                console.log(array[0]);
                                console.log('-------------------');


                                res.json({
                                  update:'ok'
                                })

                            })
                        }
                    }else {
                        res.json({
                            update:'已存在该username'
                        })
                    }
                }else {
                    res.json({
                        add:'已存在该username'
                    })
                }
            }else {
                if(id > 0){
                    if(originalFilename){
                        user.updateUser(id, username, name, department, password, phonenumber, pic, function (result) {
                            var array = new Array();
                            for (var i in result) {
                                array.push(JSON.parse(result[i]));
                            }
                            console.log('-------------------');
                            console.log(array[0]);
                            console.log('-------------------');
                        })
                    }else{
                        user.updateUser(id, username, name, department, password, phonenumber, array[0].pic, function (result) {
                            var array = new Array();
                            for (var i in result) {
                                array.push(JSON.parse(result[i]));
                            }
                            console.log('-------------------');
                            console.log(array[0]);
                            console.log('-------------------');


                        })
                    }
                }else {
                    user.insertUser(storageId, username, name, department, password, phonenumber, pic);
                    res.json({
                        add:'ok'
                    })

                }
            }
        })
    })
})

router.post('/editUser', function (req, res) {
    var form = new multiparty.Form();
    form.parse(req, function (err, fields, files) {
        var id = fields.id[0];

        user.findUserById(id, function (result) {
            if(result != null){
                var array = new Array();
                for (var i in result) {
                    array.push(JSON.parse(result[i]))
                }
                console.log('-------------------')
                console.log(array)
                console.log('-------------------')
                res.send(array);
                res.json({
                    get: 'success'
                })
            }else {
                res.json({
                    get: 'fail'
                })
            }
        })
    })
})

router.post('/deleteUser', function (req, res) {
    var form = new multiparty.Form();
    form.parse(req, function (err, fields, files) {
        var id = fields.id[0];

        material.findMaterialByUserId(id, function (result) {
            if(result.length){
                res.json({
                    deletefail:'该用户借用了物资，不允许删除'
                })
            }else {
                user.findUserById(id, function (result) {
                  var array = new Array();
                  for (var i in result) {
                    array.push(JSON.parse(result[i]))
                  }
                  if(array[0].pic){

                    fs.unlink(array[0].pic);
                  }
                })
                user.deleteUser(id);
                res.json({
                    deletesuccess:'删除成功'
                })
            }
        })
    })
})

router.post('/', function (req, res) {
    var form = new multiparty.Form();
    form.parse(req, function (err, fields, files) {
        var storageId = fields.storageId[0];

        user.findUserInStorage(storageId,function (result) {
            var array = new Array();
            for (var i in result) {
                array.push(JSON.parse(result[i]))
            }
            console.log('-------------------')
            console.log(array)
            console.log('-------------------')
            res.send(array);
            if(result != null){
                res.json({
                    find:'ok'
                })
            }else {
                res.json({
                    find:'fail'
                })
            }
            res.send(array);
        })
    })
})

router.post('/queryUserInStorage',function (req, res) {
    var form = new multiparty.Form();
    form.parse(req, function (err, fields, files) {
        var search = fields.search[0];
        var storageId = fields.storageId[0];
        user.queryUserInStorage(storageId, search, function (result) {
            var array = new Array();
            for (var i in result) {
                array.push(JSON.parse(result[i]))
            }
            console.log('-------------------')
            console.log(array)
            console.log('-------------------')
            res.send(array);
        })
    })
})

module.exports = router;

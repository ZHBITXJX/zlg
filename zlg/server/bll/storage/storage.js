var express = require('express');
var storage = require('../../dao/storage.js');
var cabinet = require('../../dao/cabinet.js');
var multiparty = require('multiparty');


var router = express.Router();

router.get('/add',function (req, res) {
    var number = '20171227';
    var name = "五金柜";
    var location = 'A栋';
    var username = 'aaaaaa';
    var password = '123456';
    var status = '1';

    storage.insertStorage(number, name, location, username, password, status, function (result) {
        console.log(result);
        res.set('Content-Type', 'text/html; charset=utf-8');
        res.end('添加成功');
    })
})

router.get('/',function (req, res) {
    storage.findStorage(function (result) {
        var array = new Array()
        for (var i in result) {
            array.push(JSON.parse(result[i]))
        }
        console.log('-------------------')
        console.log(array)
        console.log('-------------------')

        res.send(array);
    })
})

router.post('/saveStorage',function (req, res) {
    var form = new multiparty.Form();
    form.parse(req, function (err, fields, files) {
        var number = fields.number[0];
        var name = fields.name[0];
        var location = fields.location[0];
        var username = fields.username[0];
        var password = fields.password[0];
        var status = fields.status[0];
        var id = fields.id[0];

        storage.findStorageByUsername(username,function (result) {
            var array = new Array();
            for (var i in result) {
                array.push(JSON.parse(result[i]))
            }
            if(array.length > 0){
                if(id > 0){
                    if(array[0].id == id){
                        storage.updateStorage(id, number, name, location, username, password, status, function (result) {
                            var array = new Array();
                            for (var i in result) {
                                array.push(JSON.parse(result[i]))
                            }
                            console.log('-------------------')
                            console.log(array[0])
                            console.log('-------------------')
                            res.json({
                                update: 'ok'
                            })
                        })
                    }else{
                        res.json({
                            update: '已存在该username'
                        })
                    }
                }else {
                    res.json({
                        add: '已存在该username'
                    })
                }
            }else {
                if(id > 0){
                    storage.updateStorage(id, number, name, location, username, password, status, function (result) {
                        var array = new Array();
                        for (var i in result) {
                            array.push(JSON.parse(result[i]))
                        }
                        console.log('-------------------')
                        console.log(array[0])
                        console.log('-------------------')
                        res.json({
                            update: 'ok'
                        })
                    })
                }else {
                    storage.insertStorage(number, name, location, username, password, status, function (result) {
                        if (result.length === 0){
                            res.json({
                                backInfo:'0'
                            })
                            console.log('增加失败')
                        } else{
                            res.json({
                                backInfo:'1'
                            })
                            console.log('增加成功')
                        }
                    })
                }
            }
        })
    })
})

router.get('/editStorage',function (req, res) {
    var form = new multiparty.Form();
    form.parse(req, function (err, fields, files) {
        var id = fields.id[0];

        storage.findStorageById(id, function (result) {
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

router.post('/updateStorage',function (req, res) {
    var form = new multiparty.Form();
    form.parse(req, function (err, fields, files) {
        var number = fields.number[0];
        var name = fields.name[0];
        var location = fields.location[0];
        var username = fields.username[0];
        var password = fields.password[0];
        var status = fields.status[0];

        storage.updateStorage(number, name, location, username, password, status, function (result) {
            var array = new Array();
            for (var i in result) {
                array.push(JSON.parse(result[i]))
            }
            console.log('-------------------')
            console.log(array)
            console.log('-------------------')
            res.json({
                update: 'ok'
            })
        })
    })
})

router.post('/deleteStorage',function (req, res) {
    var form = new multiparty.Form();
    form.parse(req, function (err, fields, files) {
        var id = fields.id[0];
        console.log(id);
        cabinet.findCabinetByStorageId(id, function (result) {
            if(result.length){
                res.json({
                    deletefail: '该库房还有柜子，不允许删除'
                })
            }else {
                console.log(id);
                storage.deleteStorage(id);
                res.json({
                    deletesuccess: '该库房已删除'
                })
            }
        })
    })
})

router.post('/queryStorage',function (req, res) {
    var form = new multiparty.Form();
    form.parse(req, function (err, fields, files) {
        var search = fields.search[0];

        storage.queryStorage(search, function (result) {
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

var express = require('express');
var cabinet = require('../../dao/cabinet.js');
var material = require('../../dao/material.js');
var multiparty = require('multiparty');

var router = express.Router();

router.get('/add',function (req, res) {
    var number = '123421';
    var name = 'asdasd';
    var location = 'asd';
    var status = '1';
    var storageId = '1';
    var status = 1;
    cabinet.insertCabinet(storageId, number, name, location, status);
    res.set('Content-Type', 'text/html; charset=utf-8');
    res.end('添加成功');

})

router.get('/',function (req, res) {
    cabinet.findCabinet(function (result) {
        var array = new Array()
        for (var i in result) {
            array.push(JSON.parse(result[i]))
        }
        console.log('-------------------')
        console.log(array)
        console.log('-------------------')
        if(array.length){
            res.json({
              result:'success',
              array
            })
        }else {
            res.json({
              result:'fail'
            })
        }

        res.send(array);
    })
})

router.post('/saveCabinet',function (req, res) {
    var form = new multiparty.Form();

    form.parse(req, function (err, fields, files) {
        var id = fields.id[0];
        var number = fields.number[0];
        var name = fields.name[0];
        var location = fields.location[0];
        var status = fields.status[0];
        var storageId = fields.storageId[0];

        cabinet.findCabinetByNumberInStorage(number, storageId, function (result) {
            var array = new Array();
            for (var i in result) {
                array.push(JSON.parse(result[i]))
            }
            if (array.length > 0) {
                if (id > 0) {
                    if (array[0].id == id) {
                        cabinet.updateCabinet(id, number, name, location, status, function (result) {
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
                    } else {
                        res.json({
                            update: '已存在该username'
                        })
                    }
                } else {
                    res.json({
                        add: '已存在该username'
                    })
                }
            } else {
                if (id > 0) {
                    cabinet.updateCabinet(id, number, name, location, status, function (result) {
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
                } else {
                    cabinet.insertCabinet(storageId, number, name, location, status);
                    res.json({
                        addsuccess: '添加成功'
                    })
                }
            }
        })
    })
})

router.get('/editCabinet',function (req, res) {
    var form = new multiparty.Form();

    form.parse(req, function (err, fields, files) {
        var id = fields.id[0];

        cabinet.findCabinetById(id, function (result) {
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

router.post('/deleteCabinet',function (req, res) {
    var form = new multiparty.Form();

    form.parse(req, function (err, fields, files) {
        var id = fields.id[0];

        material.findMaterialByCabinetId(id, function (result) {
            if(result.length){
                res.json({
                    deletefail: '该柜子存在物资，不允许删除'
                })
            }else {
                cabinet.deleteCabinet(id);
                res.json({
                    deletesuccess:'删除成功'
                })
            }
        })
    })

})


router.post('/queryCabinet', function (req, res) {
    var form = new multiparty.Form();

    form.parse(req, function (err, fields, files) {
        var search = fields.search[0];

        cabinet.queryCabinet(search, function (result) {
            var array = new Array();
            for (var i in result) {
                array.push(JSON.parse(result[i]))
            }
            console.log('-------------------')
            console.log(array)
            console.log('-------------------')
            if(array.length){
                res.json({
                    result:'success',
                    array
                })
            }else {
                res.json({
                    result:'fail'
                })
            }
            res.send(array);
        })
    })
})

router.post('/queryCabinetInStorage',function (req, res) {
    var form = new multiparty.Form();

    form.parse(req, function (err, fields, files) {
        var search = fields.search[0];
        var storageId = fields.storageId[0];

        cabinet.queryCabinetInStorage(storageId, search, function (result) {
            var array = new Array();
            for (var i in result) {
                array.push(JSON.parse(result[i]))
            }
            console.log('-------------------')
            console.log(array)
            console.log('-------------------')
            // if(array.length){
            //   res.json({
            //     result:'success',
            //     array
            //   })
            // }else {
            //   res.json({
            //     result:'fail'
            //   })
            // }
            res.send(array);
        })
    })
})

router.post('/findCabinetInStorage',function (req, res) {
    var form = new multiparty.Form();

    form.parse(req, function (err, fields, files) {
        var storageId = fields.storageId[0];

        cabinet.findCabinetByStorageId(storageId, function (result) {
            var array = new Array();
            for (var i in result) {
                array.push(JSON.parse(result[i]))
            }
            console.log('-------------------')
            console.log(array)
            console.log('-------------------')
            // if(array.length){
            //   res.json({
            //     result:'success',
            //     array
            //   })
            // }else {
            //   res.json({
            //     result:'fail'
            //   })
            // }
            res.send(array);
        })

    })

})

module.exports = router;

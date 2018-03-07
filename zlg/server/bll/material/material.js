var express = require('express');
var material = require('../../dao/material.js');
var multiparty = require('multiparty');
var fs = require('fs');
var router = express.Router();

router.get('/add',function (req, res) {
  var number = '1235123';
  var name = '锤子';
  var location = 'A5';
  var weight = '12';
  var testTime = '2017-11-11';
  var adopt = '2017-11-12';
  var status = '1';
  var cabinetId = '1';
  var storageId = '1';


  material.insertMaterial(cabinetId, storageId, number, name, location, weight, testTime, null, null,  adopt, status)
  res.set('Content-Type', 'text/html; charset=utf-8');
  res.end('添加成功');
})

router.post('/',function (req, res) {
  var form = new multiparty.Form();
  form.parse(req, function (err, fields, files) {
    var storageId = fields.storageId[0];

    material.findMaterialInStorage(storageId, function (result) {
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
})

router.post('/saveMaterial',function (req, res) {
  var uploadDir='upload';
  var form = new multiparty.Form();
  form.uploadDir = uploadDir;

  form.parse(req, function (err, fields, files) {
    var number = fields.number[0];
    var name =fields.name[0];
    var location = fields.location[0];
    var weight = fields.weight[0];
    var testTime = fields.testTime[0];
    var adopt = fields.adopt[0];
    var status = fields.status[0];
    var id = fields.id[0];
    var storageId = fields.storageId[0];
    var cabinetNumber = fields.cabinetNumber[0];
    var checkstatus = fields.checkstatus[0];

    // var pic;
    // if(fields.pic[0]){
    //    pic=fields.pic[0]
    //   console.log(pic)
    // } else {
    //
    // }

    if(files.pic == undefined){
      var originalFilename='';
      var pic='';
    }else {
      var pic=files.pic[0].path;
    }

    material.findMaterialByNumberInStorage(number, storageId, function (result) {
      var array = new Array();
      for (var i in result) {
        array.push(JSON.parse(result[i]));
      }
      if(array.length){
        if(id > 0){
          if(array[0].id == id){
            if(array[0].borrowTime == null){

              if(originalFilename != ''){
                 var pc = array[0].pic;
                material.updateMaterial(id, number, name, location, weight, testTime, adopt, status, pic, checkstatus, function (result) {
                  var array = new Array();
                  for (var i in result) {
                    array.push(JSON.parse(result[i]));
                  }
                  console.log('-------------------');
                  console.log(array[0]);
                  console.log('-------------------');
                  fs.unlink(pc);
                  res.json({
                    update:'ok'
                  })
                })
              }else{
                material.updateMaterial(id, number, name, location, weight, testTime, adopt, status, array[0].pic, checkstatus, function (result) {
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
                update:'该物资已被借走，不允许修改'
              })
            }
          }else {
            res.json({
              update:'已存在该number'
            })
          }
        }else {
          res.json({
            add:'已存在该number'
          })
        }
      }else {
        if(id > 0){
          material.findMaterialById(id, function (result) {
            var arr = new Array();
            for (var i in result) {
              arr.push(JSON.parse(result[i]));
            }
            console.log('-------------------');
            console.log(arr[0]);
            console.log('-------------------');
            if (arr[0].borrowTime == null){
              if(originalFilename){
                material.updateMaterial(id, number, name, location, weight, testTime, adopt, status, pic, checkstatus, function (result) {
                  var array = new Array();
                  for (var i in result) {
                    array.push(JSON.parse(result[i]));
                  }
                  console.log('-------------------');
                  console.log(array[0]);
                  console.log('-------------------');
                  res.send(array)
                })
              }else{
                material.updateMaterial(id, number, name, location, weight, testTime, adopt, status, array[0].pic, checkstatus, function (result) {
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
            }else{
              res.json({
                update:'该物资已被借走，不允许修改'
              })
            }
          })
        }else {
          material.insertMaterial(cabinetNumber, storageId, number, name, location, weight, testTime, null, null, adopt, status, pic, checkstatus);
          res.json({
            insert: 'ok'
          })
        }
      }
    })
  })
})

router.post('/editMaterial',function (req, res) {
  var form = new multiparty.Form();

  form.parse(req, function (err, fields, files) {
    var id = fields.id[0];
    material.findMaterialById(id, function (result) {
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

router.post('/deleteMaterial',function (req, res) {
  var form = new multiparty.Form();

  form.parse(req, function (err, fields, files) {
    var id = fields.id[0];

    material.findMaterialById(id, function (result) {
      var array = new Array();
      for (var i in result) {
        array.push(JSON.parse(result[i]))
      }
      if(array[0].userId){
        res.json({
          deletefail: '该物资已被借走，不允许删除'
        })
      }else {
        if(array[0].pic){
          fs.unlink(array[0].pic);
        }

        material.deleteMaterial(id);
        res.json({
          deletesuccess: 'ok'
        })
      }
    })
  })
})

//库房下查找物资
router.post('/queryMaterialInStorage', function (req, res) {
  var form = new multiparty.Form();

  form.parse(req, function (err, fields, files) {
    var storageId = fields.storageId[0];
    var search = fields.search[0];
    // console.log(storageId)
    // console.log(search)

    material.queryMaterialInStorage(search,storageId, function (result) {
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

router.post('/queryMaterialInCabinet',function (req, res) {
  var form = new multiparty.Form();
  form.parse(req, function (err, fields, files) {
    var search = fields.search[0];
    var cabinetId = fields.cabinetId[0];

    material.queryMaterialInCabinet(cabinetId, search, function (result) {
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

router.post('/findMaterialInCabinet',function (req, res) {
  var form = new multiparty.Form();
  form.parse(req, function (err, fields, files) {
    var cabinetId = fields.cabinetId[0];

    material.findMaterialByCabinetId(cabinetId, function (result) {
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

//借还物资
router.post('/materialC', function (req, res) {
  var form = new multiparty.Form();
  form.parse(req, function (err, fields, files) {
    var id = fields.id[0];
    var userId = fields.userId[0];
    var status = fields.status[0];
    // var borrowTime = fields.borrowTime[0];
    // var returnTime = fields.returnTime[0];

    material.findMaterialById(id, function (result) {
      var array = new Array();
      for (var i in result) {
        array.push(JSON.parse(result[i]))
      }
      if(array.length > 0) {
        if(array[0].userId == userId){
          material.circulateMaterial(id, null,  status, function (result) {
            if(result != null) {
              res.json({
                update:'success'
              })
            }else {
              res.json({
                update:'fail'
              })
            }
          })
        }else{
          material.circulateMaterial(id, userId, status, function (result) {
            if(result != null ) {
              res.json({
                update:'success'
              })
            }else {
              res.json({
                update:'fail'
              })
            }
          })
        }
      }else{
        res.json({
          find:'none'
        })
      }
      res.end('OK');
    })
  })
})


//可借物资
router.post('/borrowMaterial',function (req, res) {
  var form = new multiparty.Form();
  form.parse(req, function (err, fields, files) {
    var storageId = fields.storageId[0];

    material.useableMaterial(storageId, function (result) {
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
})


//用户需归还物资
router.post('/loanedMaterial',function (req, res) {
  var form = new multiparty.Form();
  form.parse(req, function (err, fields, files) {
    var userId = fields.userId[0];

    material.loanedMaterial(userId, function (result) {
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
})

router.post('/repairMaterial', function (req, res) {
  var form = new multiparty.Form();
  form.parse(req, function (err, fields, files) {
    var storageId = fields.storageId[0];
    var startTime = fields.startTime[0];
    console.log('startTime')
    console.log(startTime)

    material.repairMaterial(storageId, startTime, function (result) {
      var array = new Array();
      for (var i in result) {
        array.push(JSON.parse(result[i]));
      }
      console.log('-------------------');
      console.log(array);
      console.log('-------------------');

      res.send(array);
    })
  })
})

router.post('/needRepairMaterial', function (req, res) {
  var form = new multiparty.Form();
  form.parse(req, function (err, fields, files) {
    var storageId = fields.storageId[0];

    material.needRepairMaterial(storageId, function (result) {
      var array = new Array();
      for (var i in result) {
        array.push(JSON.parse(result[i]));
      }
      console.log('-------------------');
      console.log(array);
      console.log('-------------------');

      res.send(array);
    })
  })
})

router.post('/BorrowingHistory', function (req, res) {
  var form = new multiparty.Form();
  form.parse(req, function (err, fields, files) {
    var storageId = fields.storageId[0];
    // var startTime = fields.startTime[0];
    // var endTime = fields.endTime[0];
    console.log('storageId')
    console.log(storageId)
    material.materialBorrowingRecord(storageId, function (result) {
      console.log('storageId')
      var array = new Array()
      for (var i in result) {
        array.push(JSON.parse(result[i]))
      }
      // for(var a in array){
      //     if(array[a].userId != null){
      //         user.findUserById(array[a].userId, function (result) {
      //             var arr = new Array();
      //             for (var i in result) {
      //                 arr.push(JSON.parse(result[i]))
      //             }
      //             array[a].push({user:arr[a].name});
      //         })
      //     }else {
      //         array[a].push({user: null});
      //     }
      // }
      console.log('-------------------')
      console.log(array)
      console.log('-------------------')
      res.send(array);
    })
  })
})

router.get('/abc', function (req, res) {
  material.findMaterialByDetail(function (result) {
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

//用户查询可借物品
router.post('/userQueryMaterialInStorage', function (req, res) {
  var form = new multiparty.Form();

  form.parse(req, function (err, fields, files) {
    var storageId = fields.storageId[0];
    var search = fields.search[0];
    // console.log(storageId)
    // console.log(search)

    material.userQueryMaterialInStorage(search,storageId, function (result) {
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

//物资送检
router.post('/materialTransmission', function (req, res) {
  var form = new multiparty.Form();

  form.parse(req, function (err, fields, files) {
    var id = fields.id[0];
    var testTime = fields.testTime[0];

    material.materialTransmission(id, testTime, function (result) {
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

//物资检测
router.post('/materialMeasurement', function (req, res) {
  var form = new multiparty.Form();

  form.parse(req, function (err, fields, files) {
    var id = fields.id[0];
    var adopt = fields.adopt[0];

    // var id = 3;
    // var adopt = 123;

    material.materialMeasurement(id, adopt, function (result) {
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

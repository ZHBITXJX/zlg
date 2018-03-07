var Material = require('../model').Material;
var Cabinet = require('../model').Cabinet;
var User = require('../model').User;
var Storage = require('../model').Storage;
// var cabinet = require('./cabinet.js');

function insertMaterial(cabinetNumber, storageId, number, name, location, weight, testTime, borrowTime, returnTime, adopt, status, pic, checkstatus) {
    (async () => {
        Cabinet.findOne(
            {
                where:{
                    number: cabinetNumber,
                    storageId: storageId
                }
            }
        ).then(function (cabinet) {
            cabinet.createMaterial({
                storageId: storageId,
                number: number,
                name: name,
                location: location,
                weight: weight,
                borrowTime: borrowTime,
                testTime: testTime,
                returnTime: returnTime,
                adopt: adopt,
                status: status,
                pic: pic,
                checkstatus: checkstatus,
            })
        })
    })();
}

function findMaterialByCabinetId(cabinetId, callback) {
    (async () => {
        var material = await Material.findAll({
            where:{
                cabinet_id:cabinetId
            }
        })

        var result = new Array();
        console.log(`find ${material.length} material:`);
        for(var u in material){
            result.push(JSON.stringify(u))
        }
        callback(result);
    })();
}

function findMaterialInStorage(storageId, callback) {
    (async () => {
        var material = await Material.findAll({
            // include: [User],
            include: [Cabinet],
            where: {
                storage_id: storageId
            }
        });

        var result = new Array();
        console.log(`find ${material.length} material:`);
        for(let u of material){
            result.push(JSON.stringify(u))
        }
        callback(result);
    })();
}

function findMaterialById(id, callback) {
    (async () => {
        var material = await Material.findAll({
            where:{
                id: id
            }
        })

        var result = new Array();
        console.log(`find ${material.length} material:`);
        for(let u of material) {
            result.push(JSON.stringify(u))
        }
        callback(result);
    })();
}

function useableMaterial(storageId, callback) {
    (async () => {
        var material = await Material.findAll({
            where :{
                storage_id: storageId,
                user_id: null,
                checkstatus: 1
            }
        })

        var result = new Array();
        console.log(`find ${material.length} material:`);
        for(let u of material) {
            result.push(JSON.stringify(u))
        }
        callback(result);
    })();
}

function updateMaterial(id, number, name, location, weight, testTime, adopt, status, pic, checkstatus, callback) {
    (async () => {
        var material = await Material.update({
            number: number,
            name: name,
            location: location,
            weight: weight,
            testTime: testTime,
            adopt: adopt,
            status: status,
            pic:pic,
            checkstatus: checkstatus
        },{
            where:{
                id: id
            }
        })

        var result = new Array();
        console.log(`find ${material.length} material:`);
        for(let u of material){
            result.push(JSON.stringify(u))
        }
        callback(result);
    })();
}

function deleteMaterial(id, callback) {
    (async () => {
        var material = await Material.destroy({
            where:{
                id: id
            }})

        var result = new Array();
        console.log(`find ${material.length} material:`);
        for(let u of material){
            result.push(JSON.stringify(u))
        }
        callback(result);
    })();
}

function queryMaterialInCabinet(cabinetId, search, callback) {
    (async () => {
        var material = await Material.findAll({
            'where':{
                '$or':[
                    {'number': {
                        '$like':'%' + search + '%'
                    }},
                    {'name': {
                        '$like':'%' + search + '%'
                    }},
                    {'location': {
                        '$like':'%' + search + '%'
                    }}
                ],
                '$and':[
                    {'id': cabinetId}
                ]
            }
        })

        var result = new Array();
        console.log(`find ${material.length} material:`);
        for(let u of material){
            result.push(JSON.stringify(u))
        }
        callback(result);
    })();
}

function queryMaterialInStorage(search, storageId,  callback) {
    (async () => {
        var material = await Material.findAll({
            'where':{
                '$or':[
                    {'number': {
                        '$like':'%' + search + '%'
                    }},
                    {'name': {
                        '$like':'%' + search + '%'
                    }},
                    {'location': {
                        '$like':'%' + search + '%'
                    }},
                    {'status': {
                        '$like':'%' + search + '%'
                    }}
                ],
                '$and':[
                    {
                        'storageId': storageId
                    }
                ]

            }
        });

        var result = new Array();
        console.log(`find ${material.length} material:`);
        for(let u of material){
            result.push(JSON.stringify(u))
        }
        console.log('------------------------');
        console.log(material);
        console.log('------------------------');
        callback(result);
    })();
}

//借还物资操作
function circulateMaterial(id, userId, status, callback) {
    (async () =>{
        var material = await Material.update({
            userId: userId,
            // borrowTime: borrowTime,
            // returnTime: returnTime,
            status: status
        },{
            where:{
                id:id
            }
        })

        var result = new Array();
        console.log(`find ${material.length} material:`);
        for(let u of material){
            result.push(JSON.stringify(u))
        }
        // console.log('------------------------');
        // console.log(result);
        // console.log('------------------------');
        callback(result);
    })();
}

//用户已经借用的物资
function loanedMaterial(userId, callback) {
    (async () => {
        var material = await Material.findAll({
            where: {
                user_Id: userId,
                status: 0
            }
        })

        var result = new Array();
        console.log(`find ${material.length} material:`);
        for(let u of material){
            result.push(JSON.stringify(u))
        }
        // console.log('------------------------');
        // console.log(result);
        // console.log('------------------------');
        callback(result);
    })();
}

function findMaterialByUserId(userId, callback) {
    (async () => {
        var material = await Material.findAll({
            where:{
                userId: userId
            }
        })

        var result = new Array();
        console.log(`find ${material.length} material:`);
        for(let u of material){
            result.push(JSON.stringify(u))
        }
        // console.log('------------------------');
        console.log(result);
        // console.log('------------------------');
        callback(result);
    })();
}

function findMaterialByCabinetId(cabinetId, callback) {
    (async () => {
        var material = await Material.findAll({
            where: {
                cabinetId: cabinetId
            }
        })

        var result = new Array();
        console.log(`find ${material.length} material:`);
        for(let u of material){
            result.push(JSON.stringify(u))
        }
        // console.log('------------------------');
        console.log(result);
        // console.log('------------------------');
        callback(result);
    })();
}

function needRepairMaterial(storageId, callback) {
    (async () => {
        var material = await Material.findAll({
            where: {
                checkstatus: 0,
                storageId: storageId,
                userId: null
            }
        });

        var result = new Array();
        console.log(`find ${material.length} material:`);
        for(let u of material){
            result.push(JSON.stringify(u))
        }
        // console.log('------------------------');
        // console.log(result);
        // console.log('------------------------');
        callback(result);
    })();
}

function repairMaterial(storageId, startTime, callback) {
    (async () => {
        var material = await Material.findAll({
            where: {
                storageId: storageId,
                checkstatus: 1,
                userId: null,
                adopt:{
                    $gte: startTime
                },
            }
        })

        var result = new Array();
        console.log(`find ${material.length} material:`);
        for(let u of material){
            result.push(JSON.stringify(u))
        }
        // console.log('------------------------');
        // console.log(result);
        // console.log('------------------------');
        callback(result);
    })();
}

function findMaterialByNumberInStorage(number, storageId, callback) {
    (async () => {
        var material = await Material.findAll({
            where: {
                number: number,
                storageId: storageId
            }
        })

        var result = new Array();
        console.log(`find ${material.length} material:`);
        for(let u of material){
            result.push(JSON.stringify(u))
        }
        // console.log('------------------------');
        // console.log(result);
        // console.log('------------------------');
        callback(result);
    })()
}


function materialBorrowingRecord(storageId, callback) {
    (async () => {
        var material = await Material.findAll({
            include: [User],
            where: {
                storageId: storageId,
                // borrowTime: {
                //     between: [startTime, endTime]
                // }
                status: 0
            }
        })

        var result = new Array();
        console.log(`find ${material.length} material:`);
        for(let u of material){
            result.push(JSON.stringify(u))
        }
        // console.log('------------------------');
        // console.log(result);
        // console.log('------------------------');
        callback(result);
    })();
}

//基于可借状态的物资查询
function userQueryMaterialInStorage(search, storageId, callback) {
    (async () => {
        var material = await Material.findAll({
            'where':{
                '$or':[
                    {'number': {
                        '$like':'%' + search + '%'
                    }},
                    {'name': {
                        '$like':'%' + search + '%'
                    }},
                    {'location': {
                        '$like':'%' + search + '%'
                    }}
                ],
                '$and':[
                    {
                        'storageId': storageId,
                        'status': 1
                    }
                ]

            }
        });

        var result = new Array();
        console.log(`find ${material.length} material:`);
        for(let u of material){
            result.push(JSON.stringify(u))
        }
        console.log('------------------------');
        console.log(material);
        console.log('------------------------');
        callback(result);
    })();
}

function findMaterialByDetail(callback) {
    // var sdl = "{'number':{'$like':'%'+"+number+"+'%'}},";
    // var sql = "where:{'$and':["
    // var sbl = "],}"
    //
    // var obj = {
    //     where:{}
    // }
    //
    // var sql = sql + sdl + sbl;
    // console.log(sql);
    // console.log(sdl);
    //
    // (async () => {
    //     var material = await Material.query(
    //         // {
    //         // where:{'$and':[{'number':{'$like':'%'+number+'%'}},],}
    //         // sql
    //         // where: {
    //         //    // sdl
    //         //    //  '$and':[
    //         //    //      // sql,
    //         //    //      // {'number': {'$like':'%' + number + '%'}},
    //         //    //      // {'location': {
    //         //    //      //     '$like':'%' + 'A' + '%'
    //         //    //      // }},
    //         //    //  ],
    //         //
    //         // }
    //         // }
    //     )
    //
    //     var result = new Array();
    //     console.log(`find ${material.length} material:`);
    //     for(let u of material){
    //         result.push(JSON.stringify(u))
    //     }
    //     // console.log('------------------------');
    //     console.log(result);
    //     // console.log('------------------------');
    //     callback(result);
    // })();
    (async () => {
        var material = await Material.findAll({
            include: [User]
        })

        var result = new Array();
        console.log(`find ${material.length} material:`);
        for(let u of material){
            result.push(JSON.stringify(u))
        }
        // console.log('------------------------');
        // console.log(result);
        // console.log('------------------------');
        callback(result);
    })();


}

//物资送检
function materialTransmission(id, testTime, callback) {
    (async () => {
        var material = await Material.update({
            checkstatus: 0,
            testTime: testTime,
            adopt: null
        },{
            where:{
                id: id
            }
        })

        var result = new Array();
        console.log(`find ${material.length} material:`);
        for(let u of material){
            result.push(JSON.stringify(u))
        }
        callback(result);
    })();
}

//检测物资
function materialMeasurement(id, adopt, callback) {
    (async () => {
        var material = await Material.update({
            checkstatus: 1,
            adopt: adopt,
        },{
            where:{
                id: id
            }
        })

        var result = new Array();
        console.log(`find ${material.length} material:`);
        for(let u of material){
            result.push(JSON.stringify(u))
        }
        callback(result);
    })();
}

exports.materialMeasurement = materialMeasurement;
exports.materialTransmission = materialTransmission;
exports.userQueryMaterialInStorage = userQueryMaterialInStorage;
exports.needRepairMaterial = needRepairMaterial;
exports.materialBorrowingRecord = materialBorrowingRecord;
exports.findMaterialByNumberInStorage = findMaterialByNumberInStorage;
exports.repairMaterial = repairMaterial;
exports.findMaterialByUserId = findMaterialByUserId;
exports.findMaterialByDetail = findMaterialByDetail;
exports.loanedMaterial = loanedMaterial;
exports.useableMaterial = useableMaterial;
exports.circulateMaterial = circulateMaterial;
exports.findMaterialById = findMaterialById;
exports.queryMaterialInStorage = queryMaterialInStorage;
exports.queryMaterialInCabinet = queryMaterialInCabinet;
exports.deleteMaterial = deleteMaterial;
exports.updateMaterial = updateMaterial;
exports.findMaterialInStorage = findMaterialInStorage;
exports.findMaterialByCabinetId = findMaterialByCabinetId;
exports.insertMaterial = insertMaterial;


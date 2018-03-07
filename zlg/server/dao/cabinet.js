var Cabinet = require('../model').Cabinet;
var Storage = require('../model').Storage;
// var storage = require('./storage.js');

function insertCabinet(storageId, number, name, location, status) {
    (async () => {
        Storage.findOne(
            {
                where:{
                    id : storageId
                }
            }
        ).then(function (storage) {
            storage.createCabinet({
                number: number,
                name: name,
                location: location,
                status: status
            })
        })
    })();
}

function findCabinetByStorageId(storageId, callback) {
    (async () => {
        var cabinet = await Cabinet.findAll({
            where:{
                storage_id:storageId
            }
        })

        var result = new Array();
        console.log(`find ${cabinet.length} cabinet:`);
        for(let u of cabinet){
            result.push(JSON.stringify(u))
        }
        callback(result);
    })();
}

function findCabinet(callback) {
    (async () => {
        var cabinet = await Cabinet.findAll();

        var result = new Array();
        console.log(`find ${cabinet.length} cabinet:`);
        for(let u of cabinet){
            result.push(JSON.stringify(u))
        }
        callback(result);
    })();
}

function findCabinetById(id, callback) {
    (async () => {
        var cabinet = await Cabinet.findAll({
            where:{
                id: id
            }
        })

        var result = new Array();
        console.log(`find ${cabinet.length} cabinet:`);
        for(let u of cabinet){
            result.push(JSON.stringify(u))
        }
        callback(result);
    })();
}

function updateCabinet(id, number, name, location, status, callback) {
    (async () => {
        var cabinet = await Cabinet.update({
            number: number,
            name: name,
            location: location,
            status: status
        },{
            where:{
                id: id
            }
        })

        var result = new Array();
        console.log(`find ${cabinet.length} cabinet:`);
        for(let u of cabinet){
            result.push(JSON.stringify(u))
        }
        callback(result);
    })();
}

function deleteCabinet(id, callback) {
    (async () => {
        var cabinet = await Cabinet.destroy({
            where:{
                id: id
            }})

        var result = new Array();
        console.log(`find ${cabinet.length} cabinet:`);
        for(let u of cabinet){
            result.push(JSON.stringify(u))
        }
        callback(result);
    })();
}

function queryCabinetInStorage(storageId, search, callback) {
    (async () => {
        var cabinet = await Cabinet.findAll({
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
                    {'storageId': storageId}
                ]
            }
        })

        var result = new Array();
        console.log(`find ${cabinet.length} cabinet:`);
        for(let u of cabinet){
            result.push(JSON.stringify(u))
        }
        console.log('------------------------');
        console.log(cabinet);
        console.log('------------------------');
        callback(result);
    })();
}

function queryCabinet(search, callback) {
    (async () => {
        var cabinet = await Cabinet.findAll({
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
                ]

            }
        });

        var result = new Array();
        console.log(`find ${cabinet.length} cabinet:`);
        for(let u of cabinet){
            result.push(JSON.stringify(u))
        }
        console.log('------------------------');
        console.log(cabinet);
        console.log('------------------------');
        callback(result);
    })();
}

function findCabinetByNumberInStorage(number, storageId, callback) {
    (async () => {
        var cabinet = await Cabinet.findAll({
            where: {
                number: number,
                storageId: storageId
            }
        })

        var result = new Array();
        console.log(`find ${cabinet.length} cabinet:`);
        for(let u of cabinet){
            result.push(JSON.stringify(u))
        }
        // console.log('------------------------');
        // console.log(cabinet);
        // console.log('------------------------');
        callback(result);
    })();
}

exports.findCabinetByNumberInStorage = findCabinetByNumberInStorage;
exports.findCabinetById = findCabinetById;
exports.queryCabinet = queryCabinet;
exports.queryCabinetInStorage = queryCabinetInStorage;
exports.deleteCabinet = deleteCabinet;
exports.updateCabinet = updateCabinet;
exports.findCabinet = findCabinet;
exports.findCabinetByStorageId = findCabinetByStorageId;
exports.insertCabinet = insertCabinet;

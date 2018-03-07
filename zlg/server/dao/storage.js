var Storage = require('../model').Storage;
var User = require('../model').User;

function insertStorage(number, name, location, username, password, status, callback) {
    (async () => {
        var storage = await Storage.create({
            number: number,
            name: name,
            location: location,
            username: username,
            password: password,
            status: status
        });
        console.log('-------------------------------');
        console.log(storage);
        console.log('-------------------------------');
        callback(storage);

       // var result = new Array();
       //  console.log(`find ${storage.length} storage:`)
       //  for(let u of storage){
       //      result.push(JSON.stringify(u))
       //  }
       //  console.log('-------------------------------')
       //  console.log(result);
       //  console.log('-------------------------------')
       //  callback(result);

        /*var result = new Array();
        console.log(`find ${storage.length} storage:`)
        for(let u of storage){
            result.push(JSON.stringify(u))
        }
        callback(result);*/

    })();
}

function deleteStorage(id, callback) {
    (async () => {
        var storage = await Storage.destroy({
            where:{
                id: id
            }
        })

        var result = new Array();
        // console.log(`find ${leader.length} leader:`)
        for(let u of storage){
            result.push(JSON.stringify(u))
        }
        callback(result);

    })();
}

function updateStorage(id,number, name, location, username, password, status, callback) {
    (async () => {
        var storage = await Storage.update({
            number: number,
            name: name,
            location: location,
            username: username,
            password: password,
            status: status
        },{
            where:{
                id: id
            }
        })

        var result = new Array();
        console.log(`find ${storage.length} storage:`);
        for(let u of storage){
            result.push(JSON.stringify(u))
        }
        callback(result);
    })();
}

function findStorage(callback) {
    (async () => {
        var storage = await Storage.findAll({
            include: [User]
        });

        var result = new Array();
        console.log(`find ${storage.length} storage:`);
        for(let u of storage){
            result.push(JSON.stringify(u))
        }
        callback(result);
    })();
}

function queryStorage(search, callback) {
    (async () => {
        var storage = await Storage.findAll({
            'where': {
                '$or': [
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
            // where:{
            //     name: name
            // }
        });

        var result = new Array();
        console.log(`find ${storage.length} storage:`);
        for(let u of storage){
            result.push(JSON.stringify(u))
        }
        console.log('------------------------');
        console.log(storage);
        console.log('------------------------');
        callback(result);
    })();
}

function findStorageById(id, callback) {
    (async () => {
        var storage = await Storage.findAll({
            where:{
                id: id
            }
        });

        var result = new Array();
        console.log(`find ${storage.length} storage:`);
        for(let u of storage){
            result.push(JSON.stringify(u))
        }
        callback(result);
    })();
}


function findStorageOfLogin(username, password, callback) {
    (async () => {
        var storage = await Storage.findAll({
            where:{
                username: username,
                password: password
            }
        });

        var result = new Array();
        console.log(`find ${storage.length} storage:`);
        for(let u of storage){
            result.push(JSON.stringify(u))
        }
        callback(result);
    })();
}

function findStorageByUsername(username, callback) {
    (async () => {
        var storage = await Storage.findAll({
            where:{
                username: username
            }
        })

        var result = new Array();
        console.log(`find ${storage.length} storage:`);
        for(let u of storage){
            result.push(JSON.stringify(u))
        }
        callback(result);
    })();
}

exports.findStorageByUsername = findStorageByUsername;
exports.findStorageOfLogin = findStorageOfLogin;
exports.insertStorage = insertStorage;
exports.deleteStorage = deleteStorage;
exports.updateStorage = updateStorage;
exports.findStorage = findStorage;
exports.queryStorage = queryStorage;
exports.findStorageById = findStorageById;

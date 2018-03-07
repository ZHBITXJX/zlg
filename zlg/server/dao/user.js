var User = require('../model').User;
var Storage = require('../model').Storage;

function findUser(username, password, callback) {
    (async () => {
        var user = await User.findAll({
            where:{
                username: username,
                password: password
            }
        });

        var result = new Array();
        console.log(`find ${user.length} user:`)
        for(let u of user){
            result.push(JSON.stringify(u))
        }
        callback(result);
    })();
}

function insertUser(storageId, username, name, department, password, phonenumber, pic) {
  (async () => {
    var user = await Storage.findOne(
      {
        where:{
          id : storageId
        }
      }
    ).then(function (storage) {
        storage.createUser({
            username: username,
            name: name,
            department: department,
            phonenumber: phonenumber,
            password: password,
            pic:pic
        })
    })

      var result = new Array();
      console.log(`find ${user.length} user:`)
      for(let u of user){
          result.push(JSON.stringify(u))
      }
      callback(result);
  })();
}

function updateUser(id, username, name, department, password, phonenumber, pic, callback) {
    (async () => {
        var user = await User.update({
            username: username,
            name: name,
            department: department,
            password: password,
            phonenumber: phonenumber,
            pic: pic
        },{
            where:{
                id: id
            }
        })

        var result = new Array();
        console.log(`find ${user.length} User:`)
        for(let u of user){
            result.push(JSON.stringify(u))
        }
        callback(result);
    })();
}

function deleteUser(id) {
    (async () =>{
        await User.destroy({
            where: {
                id:id
            }
        })
    })();
}

function findUserById(id, callback) {
    (async () =>{
        var user = await User.findAll({
            where:{
                id:id
            }
        })

        var result = new Array();
        console.log(`find ${user.length} User:`)
        for(let u of user){
            result.push(JSON.stringify(u))
        }
        callback(result);
    })();
}

function findUserInStorage(storageId, callback) {
  (async ()=>{
    var user = await User.findAll({
      where: {
        storageId: storageId
      }
    })

    var result = new Array();
    console.log(`find ${user.length} user:`)
    for(let u of user){
      result.push(JSON.stringify(u))
    }
    callback(result);
  })();
}

function queryUserInStorage(storageId, search, callback) {
  (async () => {
    var user = await User.findAll({
      'where':{
        '$or':[
          {'department': {
            '$like':'%' + search + '%'
          }},
          {'name': {
            '$like':'%' + search + '%'
          }},
        ],
        '$and':[
          {'storageId': storageId}
        ]
      }
    })

    var result = new Array();
    console.log(`find ${user.length} user:`);
    for(let u of user){
      result.push(JSON.stringify(u))
    }
    console.log('------------------------');
    console.log(user);
    console.log('------------------------');
    callback(result);
  })();
}

function findUserByUsernameInStorage(username, storageId, callback) {
    (async () => {
        var user = await User.findAll({
            where: {
                username: username,
                storageId: storageId
            }
        })

        var result = new Array();
        console.log(`find ${user.length} user:`);
        for(let u of user){
            result.push(JSON.stringify(u))
        }
        console.log('------------------------');
        console.log(user);
        console.log('------------------------');
        callback(result);
    })();
}

exports.findUserByUsernameInStorage = findUserByUsernameInStorage;
exports.queryUserInStorage = queryUserInStorage;
exports.findUserInStorage = findUserInStorage;
exports.deleteUser = deleteUser;
exports.findUserById = findUserById;
exports.updateUser = updateUser;
exports.findUser = findUser;
exports.insertUser = insertUser;

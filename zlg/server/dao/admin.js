var Admin = require('../model').Admin;

function insertAdmin(username, password, storageId, callback) {
    (async () => {
        var admin = await Admin.create({
            username: username,
            password: password,
            storageId: storageId
    });

        var result = new Array();
        console.log(`find ${admin.length} admin:`)
        for(let u of admin){
            result.push(JSON.stringify(u))
        }
        callback(result);
    })();
}

function deleteAdmin(id, callback) {
    (async () => {
        var admin = await Admin.destroy({
        where:{
            id: id
        }
    })

        var result = new Array();
        console.log(`find ${leader.length} admin:`)
        for(let u of admin){
            result.push(JSON.stringify(u))
        }
        callback(result);
    })();
}
function findAdmin(callback) {
    (async () => {
        var admin = await Admin.findAll();

        var result = new Array();
        console.log(`find ${admin.length} admin:`)
        for(let u of admin){
            result.push(JSON.stringify(u))
        }
        callback(result);
    })();
}

function updateAdmin(id, username, password, storageId,callback) {
    (async () => {
        var admin = await Admin.update({
            username: username,
            password: password,
            storageId: storageId
        },{
            where:{
                id: id
            }
        })
    })();
}

exports.updateAdmin  = updateAdmin;
exports.insertAdmin  = insertAdmin;
exports.deleteAdmin  = deleteAdmin;
exports.findAdmin  = findAdmin;

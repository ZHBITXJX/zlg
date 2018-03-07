var Leader = require('../model').Leader;

function insertLeader(username, password, callback) {
    (async () => {
        await Leader.create({
            username:username,
            password:password
        });

        // var result = new Array();
        // console.log(`find ${leader.length} leader:`)
        // for(let u of leader){
        //     result.push(JSON.stringify(u))
        // }
        // callback(result);
})();
}

function deleteLeader(id, callback) {
    (async () => {
        var leader = await Leader.destroy({
        where:{
            id: id
        }
    })

        var result = new Array();
        // console.log(`find ${leader.length} leader:`)
        for(let u of leader){
            result.push(JSON.stringify(u))
        }
        callback(result);
})();
}

function updateLeader(id, username, password, callback) {
    (async () => {
        var leader = await Leader.update({
        username: username,
        password: password
    },{
        where:{
            id: id
        }
    })

        var result = new Array();
        console.log(`find ${leader.length} leader:`)
        for(let u of leader){
            result.push(JSON.stringify(u))
        }
        callback(result);

    })();
}

function findLeader(username, password, callback) {
    (async () => {
        var leader = await Leader.findAll({
            where:{
                username: username,
                password: password
            }
        });

        var result = new Array();
        console.log(`find ${leader.length} leader:`)
        for(let u of leader){
            result.push(JSON.stringify(u))
        }
        callback(result);
    })();
}

exports.insertLeader = insertLeader
exports.deleteLeader = deleteLeader
exports.updateLeader = updateLeader
exports.findLeader = findLeader



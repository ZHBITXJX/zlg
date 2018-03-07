'use strict'
const Sequelize = require('sequelize')

exports.sequelize = function() {
  return new Sequelize('zlg', 'root', '1234', { host: 'localhost',dialect: 'mysql', port: 3306, logging: console.log, Sequelize: Sequelize })
}


// const Sequelize = require('sequelize')
// const sequelize = new Sequelize('test3', 'root', '1234', {
//     host: 'localhost',
//     dialect: 'mysql',
//     pool: {
//         max: 5,
//         min: 0,
//         idle: 10000
//     },
//     Sequelize: Sequelize
// })
//
// function dbconfig() {
//     return sequelize
// }
//
// // eslint-disable-next-line new-cap
// module.exports = new dbconfig()

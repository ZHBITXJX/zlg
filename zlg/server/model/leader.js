'use strict'

//中心管理员model定义
module.exports = function(sequelize, DataType) {
  return sequelize.define('Leader', {
    // id: { type: DataType.BIGINT(11), autoIncrement: true, primaryKey: true, unique: true },
    username: { type: DataType.STRING, allowNull: false, unique: true, comment: '中心管理员账号' },
    password: { type: DataType.STRING, allowNull: false, comment: '中心管理员密码' }
  },
    {
      timestamps: true,
      underscored: true,
      freezeTableName: true,
      tableName: 'leader',
      charset: 'utf8',
      collate: 'utf8_general_ci'
    })
}


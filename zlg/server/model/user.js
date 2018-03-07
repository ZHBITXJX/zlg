'use strict'

// 使用人员model定义
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('User', {
            id: { type: DataTypes.BIGINT(11), autoIncrement: true, primaryKey: true, unique: true },
            username: { type: DataTypes.STRING, allowNull: false, comment: '用户账号' },
            name: { type: DataTypes.STRING, allowNull: false, comment: '名字' },
            department: { type: DataTypes.STRING, allowNull: false, comment: '部门' },
            password: { type: DataTypes.STRING, allowNull: false, comment: '用户密码' },
            phonenumber: { type:DataTypes.STRING, allowNull: false, comment:'电话号码'},
            pic:{type:DataTypes.TEXT, allowNull:true, comment:'存放图片路径'},
        storageId: {
          type: DataTypes.BIGINT(11),
          field: 'storage_id',
          references: {
            model: 'Storage',
            key: 'id'
          },
          comment: '库房Id' },
        },
        {
            timestamps: true,
            underscored: true,
            // paranoid: true,
            freezeTableName: true,
            tableName: 'user',
            charset: 'utf8',
            collate: 'utf8_general_ci',
          indexes: [{
            name: 'cabinet_storageId',
            method: 'BTREE',
            fields: ['storage_id']
          }]
        })
}

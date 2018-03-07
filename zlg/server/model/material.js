'use strict'
// 物资model定义
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Material', {
            id: { type: DataTypes.BIGINT(11), autoIncrement: true, primaryKey: true, unique: true },
            cabinetId: {
                type: DataTypes.BIGINT(11),
                field: 'cabinet_id',
                references: {
                    model: 'Cabinet',
                    key: 'id'
                },
                comment: '柜子Id' },
            userId:{
                type:DataTypes.BIGINT(11),
                field:'user_id',
                references: {
                    model:'User',
                    key: 'id'
                },comment:'借用人Id', allowNull:true
            },
            storageId:{
                type:DataTypes.BIGINT(11),
                field:'storage_id',
                references: {
                    model:'Storage',
                    key: 'id'
                },comment:'库房Id', allowNull:true
            },
            number: { type: DataTypes.STRING, allowNull: false, comment: '物资编号' },
            name: { type: DataTypes.STRING, allowNull: false, comment: '物资名称' },
            location: { type: DataTypes.STRING, allowNull: false, comment: '物资位置' },
            weight: { type: DataTypes.STRING, allowNull: false, comment: '物资重量' },
            testTime: { type: DataTypes.STRING, allowNull: true, comment: '检测时间' },
            borrowTime:{ type: DataTypes.STRING, allowNull: true, comment: '借用日期' },
            returnTime: { type: DataTypes.STRING, allowNull: true, comment: '归还期限' },
            adopt: { type: DataTypes.STRING, allowNull: true, comment: '最后检测通过日期' },
            pic:{type:DataTypes.TEXT, allowNull:true, comment:'存放图片路径'},
            status: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true, comment: '工具状态' },
            checkstatus:{type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true, comment: '检修状态'}
        },
        {
            underscored: true,
            timestamps: true,
            tableName: 'material',
            comment: '物资信息',
            charset: 'utf8',
            collate: 'utf8_general_ci',
            indexes: [{
                name: 'material_cabinetId',
                method: 'BTREE',
                fields: ['cabinet_id']
            },{
                name:'material_userId',
                method: 'BTREE',
                fields: ['user_id']
            },{
                name: 'material_storageId',
                method: 'BTREE',
                fields: ['storage_id']
            }]
        })
}


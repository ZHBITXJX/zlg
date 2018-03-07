'use strict'

// 重力柜model定义
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Cabinet', {
            id: { type: DataTypes.BIGINT(11), autoIncrement: true, primaryKey: true, unique: true },
            storageId: {
                type: DataTypes.BIGINT(11),
                field: 'storage_id',
                references: {
                    model: 'Storage',
                    key: 'id'
                },
                comment: '库房Id' },
            number: { type: DataTypes.STRING, allowNull: false, comment: '柜子编号' },
            name: { type: DataTypes.STRING, allowNull: false, comment: '柜子名称' },
            location: { type: DataTypes.STRING, field: 'location', allowNull: false, comment: '位置' },
            status: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true, comment: '是否正常状态' }
        },
        {
            underscored: true,
            timestamps: true,
            tableName: 'cabinet',
            comment: '柜子信息',
            charset: 'utf8',
            collate: 'utf8_general_ci',
            indexes: [{
                name: 'cabinet_storageId',
                method: 'BTREE',
                fields: ['storage_id']
            }]
        })
}


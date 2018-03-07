'use strict'

// 库房model定义
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Storage', {
            id: { type: DataTypes.BIGINT(11), autoIncrement: true, primaryKey: true, unique: true },
            number: { type: DataTypes.STRING, allowNull: false, comment: '库房编号' },
            name: { type: DataTypes.STRING, allowNull: false, comment: '库房名称' },
            location: { type: DataTypes.STRING, allowNull: false, comment: '位置' },
            username: { type: DataTypes.STRING, allowNull: false, comment: '用户名' },
            password: { type: DataTypes.STRING, allowNull: false, comment: '用户密码' },
            status: { type:DataTypes.BOOLEAN, allowNull: false, comment: '库房状态'}
        },
        {
            timestamps: true,
            underscored: true,
            // paranoid: true,
            freezeTableName: true,
            tableName: 'storage',
            charset: 'utf8',
            collate: 'utf8_general_ci'
        })
}

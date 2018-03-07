'use strict'

//库房管理员model定义
module.exports = function(sequelize, DataType) {
    return sequelize.define('admin', {
            username:{ type: DataType.STRING, comment:'管理员账号'},
            password:{ type: DataType.STRING, comment:'管理员密码'},
            storageId:{type: DataType.STRING, comment:'管理柜子ID'}
        },
        {
            timestamps: true,
            underscored: true,
            freezeTableName: true,
            tableName: 'admin',
            charset: 'utf8',
            collate: 'utf8_general_ci'
        })
}


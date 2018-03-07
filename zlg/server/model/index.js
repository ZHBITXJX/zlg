var sequelize = require('../config/db.js').sequelize();
var Admin = sequelize.import('./admin.js');
var Leader = sequelize.import('./leader.js');
var Storage = sequelize.import('./storage.js');
var Cabinet = sequelize.import('./cabinet.js');
var Material = sequelize.import('./material.js');
var User = sequelize.import('./user.js');

Storage.hasMany(Cabinet, { foreignKey: 'storage_id', targetKey: 'id' })
Cabinet.belongsTo(Storage);
Cabinet.hasMany(Material, { foreignKey: 'cabinet_id', targetKey: 'id' })
Material.belongsTo(Cabinet);
User.hasMany(Material,{foreignKey:'user_id', targetKey: 'id'})
Material.belongsTo(User);
Storage.hasMany(User, { foreignKey: 'storage_id', targetKey: 'id' })
User.belongsTo(Storage);

sequelize.sync();

exports.Admin = Admin;
exports.Leader = Leader;
exports.Storage = Storage;
exports.Cabinet = Cabinet;
exports.Material = Material;
exports.User = User;

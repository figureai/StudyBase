const {Sequelize} = require('sequelize')
const {
    dbName,
    host, 
    port, 
    user,
    password
} = require('../config/config').database
const sequelize = new Sequelize(dbName, user, password, {
    dialect: 'mysql',
    host,
    port,
    // logging: true,
    timezone: '+08:00', // 时区
    define: {
        timestamps: true,  // 自动添加 createAt updateAt 字段
        paranoid: true,     // 是否添加delete time字段
        underscored: true   // 字段为下划线命名 比如 createAt 变成 create_at
    }
})
// 同步所有模型
sequelize.sync()


module.exports = {
    sequelize
}

const {sequelize} = require('../../core/db')
const {Sequelize, Model, DataTypes} = require('sequelize')
const { database } = require('../../config/config')

class Flow extends Model {

}
Flow.init({
    index: DataTypes.INTEGER,
    art_id: DataTypes.STRING,
    type: DataTypes.STRING,
},{
    sequelize,
    tableName: 'flow'
})

module.exports = {
    Flow
}
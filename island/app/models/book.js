
const {sequelize} = require('../../core/db')
const {Sequelize, Model, DataTypes} = require('sequelize')
const util = require('util')
const { default: Axios } = require('axios')

class Book extends Model {
    constructor(id) {
        super()
        this.id = id
    }

    async detail() {
        const url = util.format(global.config.yushu.detailUrl, this.id)
        const book = await Axios.get(url)
        return book.data
    }
}

Book.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    fav_nums: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
},{
    sequelize,
    tableName: 'book'
})

module.exports = {
    Book
}
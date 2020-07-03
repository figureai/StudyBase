
const {sequelize} = require('../../core/db')
const {Sequelize, Model, DataTypes, Op} = require('sequelize')
const {Favor} = require('./favor')
const {ArtType} = require('@enum')
class HotBook extends Model {
    static async getAll() {
        const books = await HotBook.findAll({
            order:['index']
        })
        let ids = []
        books.forEach(book => {
            ids.push(book.id)
        })
        const favors = await Favor.findAll({
            where: {
                art_id: {
                    [Op.in]:ids
                },
                type: ArtType.BOOK
            },
            group: ['art_id'],
            attributes: ['art_id', [Sequelize.fn('COUNT','*'), 'count']]
        })
        books.forEach(book => {
            let count = 0
            favors.forEach(favor=>{
                if(book.id == favor.art_id) {
                    count = favor.getDataValue('count')
                }
            })
            book.setDataValue('fav_nums', count)
        })
        return books
    }
}
HotBook.init({
    index: DataTypes.INTEGER,
    image: DataTypes.STRING,
    author: DataTypes.STRING,
    title: DataTypes.STRING,
},{
    sequelize,
    tableName: 'hot_book'
})

module.exports = {
    HotBook
}
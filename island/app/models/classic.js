
const {sequelize} = require('../../core/db')
const {Sequelize, Model, DataTypes} = require('sequelize')

const classicFields = {
    image: DataTypes.STRING,
    title: DataTypes.STRING,
    pubdate: DataTypes.STRING,
    content: DataTypes.STRING,
    fav_nums: DataTypes.STRING,
    type: DataTypes.STRING
}

class Movie extends Model {

}
Movie.init(classicFields,{
    sequelize,
    tableName:'movie'
})

class Sentence extends Model {

}
Sentence.init(classicFields,{
    sequelize,
    tableName:'sentence'
})


const musicFields = Object.assign({url:DataTypes.STRING},classicFields)
class Music extends Model {

}
Music.init(musicFields,{
    sequelize,
    tableName:'music'
})

module.exports = {
    Movie,
    Sentence,
    Music
}
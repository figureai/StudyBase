const { Movie, Music, Sentence } = require('./classic')
const {ArtType} = require('../lib/enum')
const { Op } = require('sequelize')
const { flatten } = require('lodash')

class Art {
    static async findArt(art_id, type) {
        let art = null
        const finder = {
            where: {
                id: art_id
            }
        }
        switch (type) {
            case ArtType.MUSIC://music
                art = await Music.scope('noTime').findOne(finder)
                break;
            case ArtType.MOVIE://movie
                art = await Movie.scope('noTime').findOne(finder)
                break;
            case ArtType.SENTENCE://sentence
                art = await Sentence.scope('noTime').findOne(finder)
                break;
            default:
                break;
        }
        if(art) {
            return art
        } else {
            throw new global.errs.ErrorException('资源未找到','1','404')
        }
    }

    static async fintArtList(favors) {
        let typeObj = {
            100: [],
            200: [],
            300: [],
        }
        for(let favor of favors) {
            const {type, art_id} = favor
            typeObj[type].push(art_id)
        }
        let allArts = []
        for(let key in typeObj) {
            const arts = await this._getArtListByType(typeObj[key], parseInt(key))
            allArts.push(arts)
        }
        // allArts = [[1],[2,3,3,3,],[4,4,4]]
        const list = flatten(allArts)
        return list
    }

    static async _getArtListByType(ids, type) {
        let arts = []
        const finder = {
            where: {
                id: {
                    [Op.in]: ids
                }
            }
        }
        switch (type) {
            case ArtType.MUSIC://music
                arts = await Music.scope('noTime').findAll(finder)
                break;
            case ArtType.MOVIE://movie
                arts = await Movie.scope('noTime').findAll(finder)
                break;
            case ArtType.SENTENCE://sentence
                arts = await Sentence.scope('noTime').findAll(finder)
                break;
            default:
                break;
        }
        return arts
    }

}

module.exports = {
    Art
}

const {sequelize} = require('../../core/db')
const {Sequelize, Model, DataTypes} = require('sequelize')
const {Art} = require('./art')

class Favor extends Model {

    // 点赞
    static async onLike(art_id, type, uid) {
        // 先查询有没有点过赞
        let favor = await Favor.findOne({
            where: {
                art_id,
                type,
                uid
            }
        })
        if(favor) {
            throw new global.errs.ErrorException('已点过赞')
        }
        try {
            const transaction = await sequelize.transaction()
            // 新增一条记录
            favor = await Favor.create({art_id, type, uid})
            // 更新对应期刊的点赞数
            const art = await Art.findArt(art_id, type)
            await art.increment('fav_nums',{by:1})
            await transaction.commit()
        } catch (error) {
            throw new global.errs.ErrorException('点赞出错')
        }
    }
    // 取消点赞
    static async onDislike(art_id, type, uid) {
        // 先查询有没有点过赞
        let favor = await Favor.findOne({
            where: {
                art_id,
                type,
                uid
            }
        })
        if(!favor) {
            throw new global.errs.ErrorException('未给该期刊点过赞')
        }
        try {
            const transaction = await sequelize.transaction()
            // 删除一条记录
            await favor.destroy({force:true})
            // 更新对应期刊的点赞数
            const art = await Art.findArt(art_id, type)
            await art.decrement('fav_nums',{by:1})
            await transaction.commit()
        } catch (error) {
            throw new global.errs.ErrorException('取消点赞出错')
        }
    }

    static async getLikeStatus(art_id, type, uid) {
        let favor = await Favor.findOne({
            where: {
                art_id,
                type,
                uid
            }
        })
        return favor ? true : false
    }
}

Favor.init({
    art_id: DataTypes.INTEGER,
    type: DataTypes.INTEGER,
    uid: DataTypes.INTEGER
},{
    sequelize,
    tableName: 'favor'
})

module.exports = {
    Favor
}
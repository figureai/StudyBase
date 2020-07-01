const Router = require('koa-router')
const {HttpException} = require('../../../core/http-exception')
const {PositiveIntegerValidator} = require('../../validators/validator')
const {Auth} = require('../../../middlewares/auth')
const {Flow} = require('../../models/flow')
const {Art} = require('../../models/art')
const router = new Router({
    prefix: '/v1/classic'
})


/** 获取最新一期 */
// new Auth(Auth.USER).m
router.get('/latest',new Auth(Auth.USER).m, async (ctx, next)=>{
    const {art_id, type, index} = await Flow.findOne({
        order: [
            ['index','DESC']
        ]
    })
    const lastestArt = await Art.findLatestArt(art_id, type)
    lastestArt.setDataValue('index', index)
    ctx.body = lastestArt
})

module.exports = {router}

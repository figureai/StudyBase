const Router = require('koa-router')
const {HttpException} = require('../../../core/http-exception')
const {
    PositiveIntegerValidator, 
    LikeValidator,
} = require('@validator')
const {Auth} = require('../../../middlewares/auth')
const {Flow} = require('../../models/flow')
const {Art} = require('../../models/art')
const {Favor} = require('../../models/favor')
const router = new Router({
    prefix: '/v1/classic'
})


/** 获取最新一期 */
router.get('/latest',new Auth(Auth.USER).m, async (ctx, next)=>{
    const art = findArtWithFlowIndex(index)
    ctx.body = art
    const flow = await Flow.findOne({
        order: [
            ['index','DESC']
        ]
    })
    const {art_id, type, index} = flow
    const lastestArt = await Art.findArt(art_id, type)
    const fav_status = await Favor.getLikeStatus(art_id, type, ctx.auth.uid)
    lastestArt.setDataValue('index', index)
    lastestArt.setDataValue('fav_status', fav_status)
    ctx.body = lastestArt
})

// 点赞
router.post('/like',new Auth(Auth.USER).m, async (ctx, next)=>{
    const v = await new LikeValidator().validate(ctx)
    await Favor.onLike(v.get('body.art_id'),v.get('body.type'), ctx.auth.uid)
    throw new global.errs.Success('已点赞', '0')
})


// 取消点赞
router.post('/dislike',new Auth(Auth.USER).m, async (ctx, next)=>{
    const v = await new LikeValidator().validate(ctx)
    await Favor.onDislike(v.get('body.art_id'), v.get('body.type'), ctx.auth.uid)
    throw new global.errs.Success('已取消点赞', '0')
})

// 获取当前一期的下一期
router.post('/:index/next',new Auth(Auth.USER).m, async (ctx, next)=>{
    const v = await new PositiveIntegerValidator().validate(ctx, {
        id: 'index'
    })
    const index = v.get('path.index')+1
    const art = await getArtWithFlow(index, ctx)
    ctx.body = art
})

// 获取当前一期的上一期
router.post('/:index/pre',new Auth(Auth.USER).m, async (ctx, next)=>{
    const v = await new PositiveIntegerValidator().validate(ctx, {
        id: 'index'
    })
    const index = v.get('path.index')-1
    const art = await getArtWithFlow(index, ctx)
    ctx.body = art
})

// 获取某一期的详细信息
router.post('/info',new Auth(Auth.USER).m, async (ctx, next)=>{
    const v = await new PositiveIntegerValidator().validate(ctx, {
        id: 'index'
    })
    const index = v.get('body.index')
    const art = await getArtWithFlow(index, ctx)
    ctx.body = art
})

// 获取我喜欢的期刊
router.post('/my-likes',new Auth(Auth.USER).m, async (ctx, next)=>{
    const favors = await Favor.findAll({
        where: {
            uid: ctx.auth.uid
        }
    })
    const artList = await Art.fintArtList(favors)
    ctx.body = artList
})



async function getArtWithFlow(index, ctx) {
    const flow = await Flow.scope('noTime').findOne({
        where: {
            index,
        }
    })
    if(flow) {
        const {art_id, index, type} = flow
        const art = await Art.findArt(art_id, type)
        const fav_status = await Favor.getLikeStatus(art_id, type, ctx.auth.uid)
        art.setDataValue('index', index)
        art.setDataValue('fav_status', fav_status)
        return art
    } else {
        throw new global.errs.ErrorException('资源未找到', '1')
    }
}


module.exports = {router}

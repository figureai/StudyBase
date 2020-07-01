

const Router = require('koa-router')
const {TokenValidator, EmptyValidator} = require('../../validators/validator')
const {LoginType} = require('../../lib/enum')
const { User } = require('../../models/user')
const {generateToken} = require('../../../core/util')
const {Auth} = require('../../../middlewares/auth')
const { WxManager } = require('../../services/wx')
const router = new Router({
    prefix: '/v1/token'  // 路径前缀
})

router.post('/', async (ctx, next)=>{
    const v = await new TokenValidator().validate(ctx)
    const loginType = v.get('body.type')
    let token = ''
    switch (loginType) {
        case LoginType.USER_EMAIL:
            // 
            token = await emailLogin(v.get('body.account'),v.get('body.secret'))
            break;
        case LoginType.USER_MINI_PROGRAM:
            token = await WxManager.codeToToken(v.get('body.account'))
            break;
        default:
            break;
    }
    ctx.body = {token}
})

router.post('/verify', async(ctx,next)=>{
    const v = await new EmptyValidator().validate(ctx)
    const result = Auth.verifyToken(v.get('body.token'))
    ctx.body = {
        result
    }
})

async function emailLogin(account, secret) {
    const user = await User.verifyEmailLogin(account, secret)
    const token = generateToken(user.id, Auth.USER)
    return token
}


module.exports = {
    router
}
const Router = require('koa-router')
const {TokenValidator} = require('../../validators/validator')
const {LoginType} = require('../../lib/enum')
const { User } = require('../../models/user')
const router = new Router({
    prefix: '/v1/token'  // 路径前缀
})

router.post('/', async (ctx)=>{
    const v = await new TokenValidator().validate(ctx)
    const loginType = v.get('body.type')
    switch (loginType) {
        case LoginType.USER_EMAIL:
            // 
            await emailLogin(v.get('body.account'),v.get('body.secret'))
            break;
    
        default:
            break;
    }
})

async function emailLogin(account, secret) {
    await User.verifyEmailLogin(account, secret)
}
module.exports = {
    router
}
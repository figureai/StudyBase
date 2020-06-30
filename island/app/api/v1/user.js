
const Router = require('koa-router')
const {RegisterValidator} = require('../../validators/validator')
const {User} = require('../../models/user')
const router = new Router({
    prefix: '/v1/user'  // 路径前缀
})

router.post('/register', async (ctx) => {
    const v = await new RegisterValidator().validate(ctx)
    // token 实际上是一串无意义的字符串
    // jwt 可携带数据的字符串
    const user = {
        email: v.get('body.email'),
        password: v.get('body.password2'),
        nickname: v.get('body.nickname')
    }
    // 添加到数据库
    User.create(user)
    throw new global.errs.Success('注册成功', '0')
})

module.exports = {
    router
}
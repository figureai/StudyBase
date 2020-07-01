const basicAuth = require('basic-auth')
const jwt = require('jsonwebtoken')
class Auth {
    static USER = 8
    static ADMIN = 16
    static SUPER_ADMIN = 32
    constructor(level) {
        this.level = level
        // Auth.USER = 8   // 普通用户 scope
        // Auth.ADMIN = 16 // 管理员 scope
        // Auth.SUPER_ADMIN = 32   // 超级管理员 scope
    }

    get m() {
        return async (ctx, next) => {
            // 身份验证机制 HttpBasicAuth
            // 校验客户端传过来的 token 是否过期
            const token = basicAuth(ctx.req)
            ctx.body = token
            let errmsg = 'token不合法'
            if(!token || !token.name) {
                throw new global.errs.Forbbiden(errmsg)
            }
            try {
                var jwtPayload = jwt.verify(token.name, global.config.security.secretKey)
            } catch (error) {
                if(error.name == 'TokenExpiredError') {
                    errmsg = 'token已过期'
                }
                throw new global.errs.Forbbiden(errmsg)
            }
            if(jwtPayload.scope < this.level) {
                errmsg = '权限不足'
                throw new global.errs.Forbbiden(errmsg)
            }
            ctx.auth = {
                uid: jwtPayload.uid,
                scope: jwtPayload.scope
            }
            await next()
        }
    }

    static verifyToken(token) {
        try {
            var jwtPayload = jwt.verify(token, global.config.security.secretKey)

        } catch (error) {
            return false
        }
        if(jwtPayload.uid) {
            return true
        }
    }
}

module.exports = {
    Auth
}

const {HttpException} = require('../core/http-exception')
const catchError = async (ctx, next) => {
    try {
        await next()
    } catch (error) {
        if(error instanceof HttpException) {
            // 已知异常
            const {errorCode, msg, code} = error
            ctx.body = {
                error_code: errorCode,
                msg,
                request: `${ctx.method} ${ctx.path}`,
            }
            // ctx.status = code
        } else{
            ctx.body = {
                msg: '服务器报错了~',
                error_code: 999,
                request: `${ctx.method} ${ctx.path}`
            }
            ctx.status = 500
            if(global.config.envionment === 'dev') {
                // 开发环境，抛出错误
                throw error
            }
        }
    }
}

module.exports = catchError
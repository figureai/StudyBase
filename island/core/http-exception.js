class HttpException extends Error {
    constructor(msg='服务器错误', code=400,errorCode=10001) {
        super()
        this.code = code
        this.msg = msg
        this.errorCode = errorCode
    }
}

class ParameterException extends HttpException{
    constructor(msg, errorCode){
        super()
        this.code = 400
        this.msg = msg || '参数错误'
        this.errorCode = errorCode || 10000
    }
}

class Success extends HttpException {
    constructor(msg, errorCode){
        super()
        this.code = 200
        this.msg = msg || '操作成功'
        this.errorCode = errorCode || 0
    }
}

class AuthFailed extends HttpException {
    constructor(msg, errorCode){
        super()
        this.code = 404
        this.msg = msg || '获取资源出错'
        this.errorCode = errorCode || 10001
    }
}

class Forbbiden extends HttpException {
    constructor(msg, errorCode){
        super()
        this.code = 403
        this.msg = msg || '禁止访问'
        this.errorCode = errorCode || 10006
    }
}

module.exports = {
    HttpException,
    ParameterException,
    Success,
    AuthFailed,
    Forbbiden
}
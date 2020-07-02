const {Rule, LinValidator} = require('../../core/lin-validator-v2')
const {User} = require('../models/user')
const {LoginType, ArtType } = require('../lib/enum')
const { extend } = require('lodash')
class PositiveIntegerValidator extends LinValidator {
    constructor() {
        super()
        this.id = [
            new Rule('isInt', '需要是正整数', {min:1})
        ]
    }
}

class RegisterValidator extends LinValidator {
    constructor() {
        super()
        this.email = [
            new Rule('isEmail', '邮箱格式有误')
        ]
        this.password1 = [
            new Rule('isLength', '密码长度最小6位，最多16位', {
                min: 6,
                max: 16
            }),
        ]
        this.password2 = this.passsword1
        this.nickname = [
            new Rule('isLength', '昵称长度不符合规范', {
                min: 4,
                max: 32
            })
        ]
    }

    validatePassword(vals) {
        const psw1 = vals.body.password1
        const psw2 = vals.body.password2
        if(psw1 !== psw2) {
            throw new Error('两个密码必须相同')
        }
    }

    async validateEmail(vals) {
        const email = vals.body.email
        const user = await User.findOne({
            where: {
                email
            }
        })
        if(user) {
            throw new Error('email已存在')
        }
    }
}

class TokenValidator extends LinValidator {
    constructor() {
        //  web account + secret
        // 小程序  account
        super()
        this.account = [
            new Rule('isLength', '不符合账号规则', {
                min: 4,
                max: 32
            })
        ]
        this.secret = [
            new Rule('isOptional',),
            new Rule('isLength', '至少6个字符', {
                min: 6,
                max: 128
            })
        ]
    }
    validateLoginType(vals) {
        if(!vals.body.type) {
            throw new Error('type是必须参数')
        }
        if(!LoginType.isThisType(vals.body.type)) {
            throw new Error('type参数不合法')
        }
    }
}

class EmptyValidator extends LinValidator {
    constructor() {
        super()
        this.token = [
            new Rule('isLength','token不能为空', {min:1})
        ]
    }
}

class LikeValidator extends LinValidator {
    constructor() {
        super()
        this.art_id = [
            new Rule('isLength', 'art_id不能为空', {min:1}),
            new Rule('isInt', '需要是正整数', {min:0})
        ]
    }

    validateArtType(vals) {
        if(!vals.body.type) {
            throw new Error('type是必须参数')
        }
        if(!ArtType.isThisType(vals.body.type)) {
            throw new Error('type参数不合法')
        }
    }
}

module.exports = {
    PositiveIntegerValidator,
    RegisterValidator,
    TokenValidator,
    EmptyValidator,
    LikeValidator,
}

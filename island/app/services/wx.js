
const util = require('util')
const axios = require('axios')
const {User} = require('../models/user')
const {generateToken} = require('../../core/util')
const { Auth } = require('../../middlewares/auth')

class WxManager {
    static async codeToToken(code) {
        const {
            appId,
            appSecret,
            loginUrl
        } = global.config.wx
        const wxLogin = util.format(loginUrl,appId,appSecret,code)
        const {status, data} = await axios.get(wxLogin)
        if(status !== 200) {
            throw new global.errs.AuthFailed('openid获取失败')
        }
        if(data.errcode) {
            throw new global.errs.AuthFailed('openid获取失败'+data.errcode)
        }
        const user = await User.getUserByOpenId(data.openid)
        const token = await generateToken(user.id, Auth.USER)
        return token
    }
}

module.exports = {
    WxManager
}
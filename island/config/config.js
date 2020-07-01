module.exports = {
    // dev: 开发环境    prod: 生产环境
    envionment: 'dev',
    database: {
        dbName: 'island',
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'lch111111'
    },
    security: {
        secretKey: 'adfaldfkjaoiho',    // 私钥，最好是很长的随机字符串
        expiresIn: 60*60*24*30    // 令牌过期时间
    },
    wx: {
        appId: 'wx984d38bff24cca5d',
        appSecret: '0a8a2427b8df789387ec4ee46fd1a851',
        loginUrl: 'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code'
    }
}
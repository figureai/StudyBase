const bcrypt = require('bcryptjs')
const {sequelize} = require('../../core/db')
const {Sequelize, Model, DataTypes} = require('sequelize')


class User extends Model {
    static async verifyEmailLogin(email,password) {
        const user = await User.findOne({
            where: {
                email
            }
        })
        if(!user) {
            throw new global.errs.AuthFailed('账号不存在')
        }
        if(!bcrypt.compareSync(password,user.password)) {
            throw new global.errs.AuthFailed('密码不正确')
        }
        return user
    }
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nickname: DataTypes.STRING,
    email: {
        type: DataTypes.STRING(128),
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        set(val) {
            const solt = bcrypt.genSaltSync(10)
            const pwd = bcrypt.hashSync(val, solt)
            this.setDataValue('password', pwd)
        }
    },
    openid: {
        type: DataTypes.STRING,
        unique: true,
    }
}, {
    sequelize,
    tableName: 'user',     // 表的名字
})

module.exports = {
    User,
}

function isThisType(val) {
    return Object.values(this).includes(val)
}
const LoginType = {
    USER_MINI_PROGRAM: 100,
    USER_EMAIL: 101,
    USER_MOBILE: 102,
    ADMIN_EMAIL: 200,
    isThisType
}
console.log('lch--000-', isThisType('202'))
module.exports = {
    LoginType
}
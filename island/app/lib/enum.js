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

const ArtType = {
    MUSIC: 100,     // 音乐
    MOVIE: 200,     // 电影
    SENTENCE: 300,  // 句子
    BOOK: 400,      // 书籍
    isThisType
}
module.exports = {
    LoginType,
    ArtType
}
const Koa = require('koa')

const app = new Koa()
// 应用程序对象 中间件
app.listen(3000)

function test() {
    console.log('hello, 7yue')
}
// 注册
app.use(test)
const Koa = require('koa')
// const book = require('./api/v1/book')
// const classic = require('./api/v1/classic')
const requireDirectory = require('require-directory')
const Router = require('koa-router')


const app = new Koa()
// 手动注册router
// app.use(book.routes())
// app.use(classic.routes())
// yarn global add nodemon --prefix /usr/local 

// 使用 require-directory 自动注册 router
const modules = requireDirectory(module, './app/api/v1', {
    visit:whenLoadModule
})
function whenLoadModule(obj) {
    function routerAndUse(obj) {
        if(obj instanceof Router) {
            app.use(obj.routes())
        }
    }
    routerAndUse(obj)
    if(obj instanceof Object) {
        Object.values(obj).forEach((value)=>{
            routerAndUse(value)
        })
    }
}



app.listen(3000)


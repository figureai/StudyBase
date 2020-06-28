const Koa = require('koa')
const Router = require('koa-router')
const app = new Koa()
const router = new Router()


// 客户端兼容性  新版本兼容旧版本
// 处理方法，api 携带版本号
// 1 路径  2 查询参数  3 header
// 开闭原则  修改代码是关闭的，扩展是开放的，简单来说就是新增功能的时候，尽量通过扩展，而不是修改代码的方式来实现
router.get('/classic/latest',(ctx,next)=>{
    ctx.body = {key:'classic'}
})
// router.post('',()=>{})  router.put('',()=>{})  router.delete('',()=>{})
app.use(router.routes())

// 注册 可注册多个中间件
/** ctx: 上下文  next：下一个中间件函数 */
// 为了确保每个中间件都依照 洋葱模型 执行，最好在每个中间加上 async await
// 中间件之间的调用（也就是next）本质上也会返回 一个promise
// await 关键点1： 求值，对 promise 求值，同时也可对表达式求值
// 关键点2：阻塞线程 , 等待异步结果的返回
// app.use(async (ctx, next)=>{
//     console.log('1')
//     await next()
//     console.log('2')
// })

// 洋葱模型的好处，可以把中间件的返回值挂载到ctx上

// app.use(async (ctx, next)=>{
//     console.log(ctx.path)
//     console.log(ctx.method)
//     if(ctx.path === '/classic/latest' && ctx.method === 'GET') {
//         // return 'classic'
//         console.log('lch---000---')
        
//     }
// })

// 应用程序对象
app.listen(3000)


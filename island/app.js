require('module-alias/register')
const Koa = require('koa')
const InitManager = require('./core/init')
const koaBody = require('koa-body')({
    multipart: true
})

const catchError = require('./middlewares/exception')
require('./app/models/user')
const app = new Koa()

app.use(koaBody)
app.use(catchError)
InitManager.initCore(app)




app.listen(3000)


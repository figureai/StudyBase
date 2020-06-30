const requireDirectory = require('require-directory')
const Router = require('koa-router')

class InitManager {
    static initCore(app) {
        InitManager.app = app
        // 入口方法
        InitManager.initLoadRouters()
        InitManager.loadErrorException()
        InitManager.loadConfig()
    }
    static initLoadRouters() {
        const apiDirectory = `${process.cwd()}/app/api`
        const modules = requireDirectory(module, apiDirectory, {
            visit:whenLoadModule
        })
        function whenLoadModule(obj) {
            routerAndUse(obj)
            if(obj instanceof Object) {
                Object.values(obj).forEach((value)=>{
                    routerAndUse(value)
                })
            }
            function routerAndUse(obj) {
                if(obj instanceof Router) {
                    InitManager.app.use(obj.routes())
                }
            }
        }
    }

    static loadErrorException() {
        const exceptionsPath = `${process.cwd()}/core/http-exception`
        const exceptions = require(exceptionsPath)
        global.errs = exceptions
    }

    static loadConfig() {
        const configPath = `${process.cwd()}/config/config`
        const config = require(configPath)
        global.config = config
    }
}

module.exports = InitManager
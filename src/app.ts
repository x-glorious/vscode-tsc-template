/**
 *  @author xuhuihuang
 *  @todo 此app 缺少守护进程，需要外部自己构造守护
 */
// -------------------------------------------first of all--------------------------------
// 引入 module alias
import ModuleAlias from 'module-alias'
// 设置别名 @root 代表根目录
ModuleAlias.addAlias('@root', __dirname)

// 先把 格式化 console 引入
import FormatConsole from '@root/tools/formatConsole'
// 打印 开始 app
FormatConsole.info('Start init app')
// -------------------------------------------first of all--------------------------------

import Koa from 'koa'
import Logger from 'koa-logger'
import Cors from 'koa2-cors'
import AppRouter from '@root/routes'
import Environment from '@root/tools/environment'
import AsyncLine from '@root/tools/asyncLine'
import { init as dbInit } from '@root/db'
import Settings from '@root/settings'

const app = new Koa()
const port = Environment.PORT
const corsSettings = Settings.cors

const koaAppInit = async () => {
    // 注册 logger ----- 必须放到最前面
    app.use(Logger((str) => FormatConsole.logger(str)))
    FormatConsole.info(`Add logger finished`)

    // 添加跨域设置
    app.use(
        Cors({
            origin: (ctx) => {
                if (corsSettings.origin.includes(ctx.origin)) {
                    return ctx.origin
                } else {
                    return false
                }
            },
            maxAge: corsSettings.maxAge,
            credentials: true,
            allowMethods: corsSettings.method,
            allowHeaders: corsSettings.header
        })
    )
    FormatConsole.info(`Add cors finished`)

    // 添加 routes
    app.use(AppRouter.routes())
    FormatConsole.info(`Add routes finished`)

    // 监听端口
    app.listen(port)
    FormatConsole.info(`Listen port ${port}`)
}

// 顺序执行初始化操作
AsyncLine([dbInit, koaAppInit], (error) => {
    // 初始化发生错误，则直接，报错并且退出
    FormatConsole.error(error)
    FormatConsole.error('App init failed')
    process.exit(1)
})

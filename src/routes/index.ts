import Koa from 'koa'
import Router from 'koa-router'
import Fs from 'fs'
import KoaJwt from 'koa-jwt'
import KoaBody from 'koa-body'
import Settings from '@root/settings'
import SecretKey from '@root/secretKey'
import FormatConsole from '@root/tools/formatConsole'
import { MethodEnum, IRouter, ICtx } from '@root/routes/types'

const router = new Router()
const koaJwt = KoaJwt({
    cookie: Settings.token.cookieName,
    secret: SecretKey,
    algorithms: [Settings.token.algorithm]
})
const koaBody = KoaBody()

const methodsMap = {
    [MethodEnum.GET]: router.get.bind(router),
    [MethodEnum.POST]: router.post.bind(router)
}

const ignoreFiles = ['index.js', 'types.js']

// 轮询调用目录下面所有的 route 文件
Fs.readdirSync(__dirname).forEach((fileName) => {
    if (/.js$/.test(fileName) && !ignoreFiles.includes(fileName)) {
        const addRoutes = require('./' + fileName).default as IRouter[]

        if (Array.isArray(addRoutes)) {
            addRoutes.forEach((router) => {
                const middleware: Koa.Middleware[] = []

                if (router.useAuth) {
                    middleware.push(koaJwt)
                }

                if (router.useBody) {
                    middleware.push(koaBody)
                }

                middleware.push(async (ctx, next) => {
                    await router.dispose(ctx as ICtx)
                    await next()
                })

                methodsMap[router.method](router.path, ...middleware)
            })
        } else {
            FormatConsole.error('Router config file export format error')
            process.exit(1)
        }
    }
})

// 对于所有的接口都增加 前缀
router.prefix(`/${Settings.apiPrefix}`)

// 提示 路由注册完成
FormatConsole.info(`Get routes finished --- prefix : /${Settings.apiPrefix}`)

export default router

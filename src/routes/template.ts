/**
 * @author xuhuihuang
 * routes 设置例子
 */
import { setToken } from '@root/tools/token'
import { IRouter, MethodEnum } from '@root/routes/types'

const routers: IRouter[] = [
    // 没有增加 用户权限校验
    {
        path: '/test',
        method: MethodEnum.GET,
        dispose: async (ctx) => {
            ctx.body = 'Test'
        }
    },
    // 增加用户权限校验,并且使用 koaBody 解析 post 数据
    {
        path: '/test/auth',
        method: MethodEnum.POST,
        dispose: async (ctx) => {
            // ctx.request.body 可以获取到 post 过来的 格式，如果是 json 格式的话，直接 可以获取到对象
            // ctx.state.user 代表 token 里面存储的 payload
            const body = ctx.request.body
            ctx.body = { ...ctx.state.user, ...body }
        },
        useAuth: true,
        useBody: true
    },
    // 增加用户权限校验,并且使用 koaBody 解析 post 数据
    {
        path: '/test/auth/login',
        method: MethodEnum.POST,
        dispose: async (ctx) => {
            setToken({ userId: 22333 }, ctx.cookies)
            ctx.body = 'login success'
        },
        useBody: true
    }
]
export default routers

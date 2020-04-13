import Koa from 'koa'
import Router from 'koa-router'

export type ICtx = Koa.ParameterizedContext<any, Router.IRouterParamContext<any, {}>>

export enum MethodEnum {
    GET,
    POST
}

export interface IRouter {
    /**
     * 路径
     */
    path: string | RegExp
    /**
     * 路径方法
     */
    method: MethodEnum
    /**
     * 处理函数
     */
    dispose: (ctx: ICtx) => Promise<void>
    /**
     * 是否使用身份校验
     * 默认：不使用
     */
    useAuth?: boolean
    /**
     * 是否使用 Body prase
     * 一般用于获取Post参数
     */
    useBody?: boolean
}

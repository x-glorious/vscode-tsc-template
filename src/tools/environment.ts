import FormatConsole from '@root/tools/formatConsole'

type AppMode = 'development' | 'production'

/**
 * 获取端口
 */
const getPort = (): number => {
    if (process.env.PORT === undefined) {
        FormatConsole.error('App should has PORT environment para')
        process.exit(1)
    }
    return Number(process.env.PORT)
}

/**
 * 获取模式
 */
const getMode = (): AppMode => {
    if (process.env.NODE_ENV === undefined) {
        FormatConsole.error('App should has NODE_ENV environment para')
        process.exit(1)
    }
    return process.env.NODE_ENV as AppMode
}

export default {
    /**
     * app 监听端口
     */
    PORT: getPort(),
    /**
     * app 运行模式，是开发环境还是正式环境
     */
    MODE: getMode()
}

export default {
    dbName: 'chickenStudy',
    userName: 'root',
    pws: 'Jesus_Crazy',
    collections: {
        test: 'test'
    },
    /**
     * api 前缀
     */
    apiPrefix: 'api',
    /**
     * 跨域设置
     */
    cors: {
        /**
         * 允许源
         */
        origin: ['http://localhost:3000'],
        /**
         * 允许方法
         */
        method: ['GET', 'POST', 'DELETE'],
        /**
         * 允许头
         */
        header: ['Content-Type', 'Authorization', 'Accept'],
        /**
         * 缓存 12 小时
         */
        maxAge: 12 * 60 * 60
    },
    /**
     * 和用户 token 有关的信息
     */
    token: {
        /**
         * cookie 中保存 token 的名字
         */
        cookieName: 'ChickenToken',
        /**
         * 过期时间
         */
        expiresIn: '3h',
        /**
         * 加密算法
         */
        algorithm: 'HS256'
    }
}

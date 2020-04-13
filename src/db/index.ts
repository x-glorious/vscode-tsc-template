import { MongoClient, Db } from 'mongodb'
import FormatConsole from '@root/tools/formatConsole'
import Settings from '@root/settings'

let mongoClient: undefined | MongoClient = undefined
let db: undefined | Db = undefined

/**
 * 获取客户端对象
 */
export const getClient = () => {
    if (mongoClient) {
        return mongoClient
    } else {
        throw new Error('Client not create')
    }
}

/**
 * 获取到数据库连接，由于Mongodb内部做了线程池处理，故而直接拿出来使用就好
 */
export const getDb = () => {
    if (db) {
        return db
    } else {
        throw new Error('Db not create')
    }
}

/**
 * 初始化 db
 */
export const init = () => {
    const promise = new Promise<void>((res, rej) => {
        MongoClient.connect(
            `mongodb://${Settings.userName}:${Settings.pws}@localhost:27017?authMechanism=DEFAULT`,
            {
                authSource: 'admin',
                useUnifiedTopology: true,
                socketTimeoutMS: 500
            },
            (error, client) => {
                // 保存mongo客户端
                mongoClient = client

                // 如果连接出现了错误，直接抛出，中断进程
                if (error) {
                    rej('Connect to mongodb failed -- type : ' + error.name)
                    return
                }

                db = client.db(Settings.dbName)

                // 测试连接成功
                if (!error) {
                    FormatConsole.info('Connect to MongoDb success')
                    res()
                }
            }
        )
    })

    // 如果获取到了错误，直接报错，并且退出程序
    return promise
}

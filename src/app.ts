/**
 * @author xuhuihuang
 * @todo 此app 缺少守护进程，需要外部自己构造守护
 */
// -------------------------------------------first of all--------------------------------
// 引入 module alias
import ModuleAlias from 'module-alias'
// 设置别名 @root 代表根目录
ModuleAlias.addAlias('@root', __dirname)
// -------------------------------------------first of all--------------------------------

import { consoleTest } from '@root/test/es6Test'

consoleTest()

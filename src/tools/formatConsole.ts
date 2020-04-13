const styles = {
    cyanBack: `\u001b[46;30m`,
    pinkBack: `\u001b[45;30m`,
    yellowBack: `\u001b[43;30m`
}

/**
 * 控制台打印信息
 * 级别：information -- 信息
 * @param text 文本信息
 */
const info = (text: string) => {
    console.log(format(styles.cyanBack, 'INFO', text))
}

/**
 * 控制台打印信息
 * 级别：error -- 错误
 * @param text 错误信息
 */
const error = (text: string) => {
    console.log(format(styles.pinkBack, 'ERROR', text))
}

/**
 * 控制台打印信息
 * 级别：logger -- 记录
 * @param text 文本信息
 */
const logger = (text: string) => {
    console.log(format(styles.yellowBack, 'LOGGER', text))
}

/**
 * 产生颜色格式化字符串
 * @param back 背景色
 * @param content 内容
 */
const format = (back: string, title: string, content: string) => {
    return `${back} ${title} \u001b[0m ${content}`
}

export default {
    info,
    error,
    logger
}

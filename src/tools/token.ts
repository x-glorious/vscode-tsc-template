import Cookies from 'cookies'
import Jwt from 'jsonwebtoken'
import SecretKey from '@root/secretKey'
import Settings from '@root/settings'

/**
 * 设置 token
 * @param payload payload 参数，其信息将会被保存在token中(其他请求可以通过 ctx.state.user 获取 default),故而，不要放机密敏感信息（🌰，可以放 user_id之类的，但不能是 passwords）
 * @param cookies ctx.request.cookies
 */
export const setToken = (payload: object, cookies: Cookies) => {
    const token = Jwt.sign(payload, SecretKey, {
        algorithm: Settings.token.algorithm,
        expiresIn: Settings.token.expiresIn
    })
    // 将 token 设置到 cookie 中
    cookies.set(Settings.token.cookieName, token)
}

import axios from 'axios'

/**
 * 获取我的菜单
 */
export async function mineMenus() {
    return axios({
        url: `/api/mine/menus`,
        method: `get`
    })
}

/**
 * 获取我的信息
 */
export async function mineInfo() {
    return axios({
        url: `/api/mine`,
        method: `get`
    })
}

/**
 * 修改我的基本信息
 * @param {
 *  email 邮箱
 *  phone 手机号
 *  ext 分机
 * } mine 个人信息
 */
export async function modifyMyselfInformation(mine) {
    return axios({
        url: `/api/mine/information`,
        method: `put`,
        data: mine
    })
}

/**
 * 修改我的密码
 * @param {
 *  password 当前密码
 *  newpwd  新密码
 * } mine 密码信息
 */
export async function modifyMyselfPassword(mine) {
    return axios({
        url: `/api/mine/password`,
        method: `put`,
        data: mine
    })
}

/**
 *  我的操作记录
 * @param {
 * pageNum 页码
 * pageSize 页面大小
 * } params
 */
export async function queryMineLog(params) {
    return axios({
        url: `/api/mine/operation`,
        method: `get`,
        params: params
    })
}

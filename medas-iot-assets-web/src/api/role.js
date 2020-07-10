import axios from 'axios'

/**
 * 創建角色
 * @param {*} role 角色信息
 */
export async function createRole(role) {
    return axios({
        url: `/role/create`,
        method: 'post',
        data: role
    })
}

/**
 * 修改角色信息
 * @param {*} roleid 角色編號
 * @param {*} role 角色信息
 */
export async function updateRole(roleid, role) {
    return axios({
        url: `/role/update/${roleid}`,
        method: 'post',
        data: role
    })
}

/**
 * 獲取所有角色信息
 */
export async function fetchAllRoleList() {
    return axios({
        url: `/role/listAll`,
        method: `get`
    })
}

/**
 * 獲取角色信息
 * @param {*} param 查詢條件
 */
export async function fetchList(param) {
    return axios({
        url: `/role/list`,
        method: `get`,
        param: param
    })
}

/**
 * 刪除角色
 * @param {*} roleid 角色編號
 */
export async function deleteRole(roleid) {
    let ids = [];
    ids.push(roleid);
    let params = new URLSearchParams()
    params.append("ids", ids)
    return axios({
        url: `/role/delete`,
        method: `post`,
        data: params
    })
}

/**
 * 啟用禁用角色
 * @param {*} roleid 角色編號
 * @param {*} status 1：啟用，0禁用
 */
export async function disableRole(roleid, status) {
    return axios({
        url: `/role/updateStatus/${roleid}?status=${status}`,
        method: `post`
    })
}
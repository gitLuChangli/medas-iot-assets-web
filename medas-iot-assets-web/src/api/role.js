import axios from 'axios'

/**
 * 創建角色
 * @param {*} role 角色信息
 */
export async function createRole(role) {
    return axios({
        url: `/api/admin/role/create`,
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
        url: `/api/admin/role/update/${roleid}`,
        method: 'post',
        data: role
    })
}

/**
 * 獲取所有角色信息
 */
export async function fetchAllRoleList() {
    return axios({
        url: `/api/admin/role/listAll`,
        method: `get`
    })
}

/**
 * 獲取角色信息
 * @param {*} param 查詢條件
 */
export async function fetchList(param) {
    return axios({
        url: `/api/admin/role/list`,
        method: `get`,
        params: param
    })
}

/**
 * 刪除角色
 * @param {*} roleid 角色編號
 */
export async function deleteRole(roleid) {
    let ids = []
    ids.push(roleid)
    let params = new URLSearchParams()
    params.append('ids', ids)
    return axios({
        url: `/api/admin/role/delete`,
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
        url: `/api/admin/role/updateStatus/${roleid}?status=${status}`,
        method: `post`
    })
}

export async function listMenuByRole(roleid) {
    return axios({
        url: `/api/admin/role/listMenu/${roleid}`,
        method: `get`
    })
}

export async function listResourceByRole(roleid) {
    return axios({
        url: `/api/admin/role/listResource/${roleid}`,
        method: `get`
    })
}

export async function allocMenu(data) {
    return axios({
        url: `/api/admin/role/allocMenu`,
        method: `post`,
        data: data
    })
}

export async function allocResource(data) {
    return axios({
        url: `/api/admin/role/allocResource`,
        method: `post`,
        data: data
    })
}

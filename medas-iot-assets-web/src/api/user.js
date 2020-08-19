import axios from 'axios'

export async function createUser(user) {
    return axios({
        url: `/api/admin/user/`,
        method: `post`,
        data: user
    })
}

export async function updateUser(user) {
    return axios({
        url: `/api/admin/user/`,
        method: `put`,
        data: user
    })
}

export async function queryUsers(prams) {
    return axios({
        url: `/api/admin/user/`,
        method: `get`,
        params: prams
    })
}

export async function disableUser(userid, status) {
    return axios({
        url: `/api/admin/user/disable/${userid}/${status}`,
        method: `put`
    })
}

export async function deleteUser(userid) {
    return axios({
        url: `/api/admin/user/${userid}`,
        method: `delete`
    })
}

export async function queryCompanyRelation(userid) {
    return axios({
        url: `/api/admin/user/company/relation/${userid}`,
        method: `get`
    })
}

export async function resetPassword(userid) {
    return axios({
        url: `/api/admin/user/reset/password/${userid}`,
        method: `put`
    })
}

export async function getUserRoles(userid) {
    return axios({
        url: `/api/admin/user/role/${userid}`,
        method: `get`
    })
}

export async function updateUserRoles(params) {
    return axios({
        url: `/api/admin/user/role/update`,
        method: `post`,
        data: params
    })
}

export async function queryCompanyUsers() {
    return axios({
        url: `/api/admin2/company/users/`,
        method: `get`
    })
}

export async function adminQueryCompanyUsers(companyId) {
    return axios({
        url: `/api/admin/company/users/?company=${companyId}`,
        method: `get`
    })
}

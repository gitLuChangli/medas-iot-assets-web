import axios from 'axios'

export async function queryUsers(prams) {
    return axios({
        url: `/admin/list`,
        method: `get`,
        params: prams
    })
}

export async function createUser(user) {
    return axios({
        url: `/admin/`,
        method: `post`,
        data: user
    })
}

export async function updateUser(userid, user) {
    return axios({
        url: `/admin/${userid}`,
        method: `put`,
        data: user
    })
}

export async function disableUser(userid, status) {
    return axios({
        url: `/admin/disable/${userid}/${status}`,
        method: `put`
    })
}

export async function deleteUser(userid) {
    return axios({
        url: `/admin/delete/${userid}`,
        method: `post`
    })
}

export async function queryCompanyRelation(userid) {
    return axios({
        url: `/admin/company/relation/${userid}`,
        method: `get`
    })
}

export async function resetPassword(userid) {
    return axios({
        url: `/admin/reset/password/${userid}`,
        method: `put`
    })
}

export async function getUserRoles(userid) {
    return axios({
        url: `/admin/role/${userid}`,
        method: `get`
    })
}

export async function updateUserRoles(params) {
    return axios({
        url: `/admin/role/update`,
        method: `post`,
        data: params
    })
}

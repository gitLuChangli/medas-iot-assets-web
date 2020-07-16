import axios from 'axios'

export async function queryInventory(companyId, params) {
    return axios({
        url: `/api/inventory/company/${companyId}`,
        data: `get`,
        params: params
    })
}

export async function setWorkers(woId, params) {
    return axios({
        url: `/api/inventory/set/worker/${woId}`,
        method: `put`,
        params: params
    })
}

export async function completeInventory(woId, params) {
    return axios({
        url: `/api/inventory/complete/${woId}`,
        method: `put`,
        params: params
    })
}

export async function deleteInventory(woId) {
    return axios({
        url: `/api/inventory/${woId}`,
        method: `delete`
    })
}

export async function queryByUsername(username, params) {
    return axios({
        url: `/api/inventory/username/${username}`,
        method: `get`,
        params: params
    })
}

import axios from 'axios'
import { sync } from 'rimraf'

export async function importAssets(data) {
    return axios({
        url: `/api/admin2/asset/`,
        method: `post`,
        data: data
    })
}

export async function adminImportAssets(companyId, data) {
    return axios({
        url: `/api/admin/asset/?company=${companyId}`,
        method: `post`,
        data: data
    })
}

export async function queryAssets(params) {
    return axios({
        url: `/api/admin2/asset/`,
        method: `get`,
        params: params
    })
}

export async function adminQueryAssets(companyId, params) {
    return axios({
        url: `/api/admin/asset/?company=${companyId}`,
        method: `get`,
        params: params
    })
}

export async function createInventory(assetIds) {
    return axios({
        url: `/api/admin2/asset/inventory/`,
        method: `post`,
        params: assetIds
    })
}

export async function adminCreateInventory(companyId, assetIds) {
    return axios({
        url: `/api/admin/asset/inventory/?company=${companyId}`,
        method: `post`,
        params: assetIds
    })
}

export async function queryInventory(params) {
    return axios({
        url: `/api/admin2/asset/orders/`,
        method: `get`,
        params: params
    })
}

export async function adminQueryInventory(companyId, params) {
    return axios({
        url: `/api/admin/asset/orders/?company=${companyId}`,
        method: `get`,
        params: params
    })
}

export async function setWorkers(workId, params) {
    return axios({
        url: `/api/admin2/asset/set/worker/${workId}`,
        method: `put`,
        params: params
    })
}

export async function adminSetWorkders(companyId, workId, params) {
    return axios({
        url: `/api/admin/asset/set/worker/${workId}?company=${companyId}`,
        method: `put`,
        params: params
    })
}

export async function completeInventory(workId, params) {
    return axios({
        url: `/api/admin2/asset/complete/${workId}`,
        method: `put`,
        params: params
    })
}

export async function adminCompleteInventory(companyId, workId, params) {
    return axios({
        url: `/api/admin/asset/complete/${workId}?company=${companyId}`,
        method: `put`,
        params: params
    })
}

export async function deleteInventory(workId) {
    return axios({
        url: `/api/admin2/asset/work/${workId}`,
        method: `delete`
    })
}

export async function adminDeleteInventory(companyId, workId) {
    return axios({
        url: `/api/admin2/asset/work/${workId}?company=${companyId}`,
        method: `delete`
    })
}

export async function mineOrders(params) {
    return axios({
        url: `/api/user/asset/orders/`,
        method: `get`,
        params: params
    })
}

export async function adminDownloadWork(companyId, workId) {
    return axios({
        url: `/api/admin/asset/download/work/${workId}?company=${companyId}`,
        method: `get`
    })
}

export async function downloadMyWork(workId) {
    return axios({
        url: `/api/admin2/asset/download/work/${workId}`,
        method: `get`,
        responseType: 'blob'
    })
}

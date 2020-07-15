import axios from 'axios'

export async function importAssets(data) {
    return axios({
        url: `/api/asset/`,
        method: `post`,
        data: data
    })
}

export async function queryAssets(companyId, params) {
    return axios({
        url: `/api/asset/company/${companyId}`,
        method: `get`,
        params: params
    })
}

export async function createInventory(companyId, assetIds) {
    return axios({
        url: `/api/asset/create/inventory/${companyId}`,
        method: `post`,
        params: assetIds
    })
}

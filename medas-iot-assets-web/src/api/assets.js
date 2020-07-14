import axios from 'axios'

export async function importAssets(data) {
    return axios({
        url: `/api/asset/`,
        method: `post`,
        data: data
    })
}

export async function queryAssets(companyId, params) {
    console.log(params)
    return axios({
        url: `/api/asset/company/${companyId}`,
        method: `get`,
        params: params
    })
}

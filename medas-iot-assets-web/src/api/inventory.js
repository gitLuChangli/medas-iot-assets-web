import axios from 'axios'

export async function queryInventory(companyId, params) {
    return axios({
        url: `/api/inventory/company/${companyId}`,
        data: `get`,
        param: params
    })
}

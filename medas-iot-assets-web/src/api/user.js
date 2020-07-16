import axios from 'axios'

export async function queryCompanyUsers(companyId) {
    return axios({
        url: `/admin/company/${companyId}`,
        method: `get`
    })
}

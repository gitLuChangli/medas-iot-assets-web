import axios from 'axios'

/**
 * 创建/修改部门
 * @param {*} modify true：修改，false：创建
 * @param {
    *  id 部門編號
    *  feeCode 费用代码，不为空
    *  name 部门名称，不为空
    *  note 部门備註
    *  area 园区
    * status 狀態
    *  ancestors 所属部门，从最高层级开始，逗号隔开
    * } company 部门信息
    */
export async function saveCompany(modify, company) {
    var _method = modify ? 'put' : 'post'
    var _url = modify ? `/api/company/${company.id}` : `/api/company/`
    return axios({
        url: _url,
        data: company,
        method: _method
    })
}

/**
 * 启用/禁用部门
 * @param {\\d+} companyId 部门编号
 * @param {^[01]$} status 1：禁用，0启用
 */
export async function disableCompany(companyId, status) {
    return axios({
        url: `/api/company/disable/${companyId}/${status}`,
        method: `put`
    })
}

/**
 * 删除部门
 * @param {\\d+} companyId 部门编号
 */
export async function deleteCompany(companyId) {
    return axios({
        url: `/api/company/${companyId}`,
        method: `delete`
    })
}

/**
 * 获取所有的部门
 */
export async function queryCompanies() {
    return axios({
        url: `/api/company/descendants`,
        method: `get`
    })
}

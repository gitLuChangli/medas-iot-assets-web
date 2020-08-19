import axios from 'axios'

export async function createMenu(menu) {
    return axios({
        url: `/api/admin/menu/create`,
        method: `post`,
        data: menu
    })
}

export async function updateMenu(menuid, menu) {
    return axios({
        url: `/api/admin/menu/update/${menuid}`,
        method: `post`,
        data: menu
    })
}

export async function deleteMenu(menuid) {
    return axios({
        url: `/api/admin/menu/delete/${menuid}`,
        method: `post`
    })
}

export async function getMenu(menuid) {
    return axios({
        url: `/api/admin/menu/${menuid}`,
        method: `get`
    })
}

export async function updateHidden(menuid, hidden) {
    return axios({
        url: `/api/admin/menu/updateHidden/${menuid}?hidden=${hidden}`,
        method: `post`
    })
}

export async function fetchList(parentid, params) {
    return axios({
        url: `/api/admin/menu/list/${parentid}`,
        method: `get`,
        params: params
    })
}

export async function fetchTreeList() {
    return axios({
        url: `/api/admin/menu/treeList`,
        method: `get`
    })
}

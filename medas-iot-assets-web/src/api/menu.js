import axios from 'axios'

export async function createMenu(menu) {
    return axios({
        url: `/menu/create`,
        method: `post`,
        data: menu
    })
}

export async function updateMenu(menuid, menu) {
    return axios({
        url: `/menu/update/${menuid}`,
        method: `post`,
        data: menu
    })
}

export async function deleteMenu(menuid) {
    return axios({
        url: `/menu/delete/${menuid}`,
        method: `post`
    })
}

export async function getMenu(menuid) {
    return axios({
        url: `/menu/${menuid}`,
        method: `get`
    })
}

export async function updateHidden(menuid, hidden) {
    return axios({
        url: `/menu/updateHidden/${menuid}?hidden=${hidden}`,
        method: `post`
    })
}

export async function fetchList(parentid, params) {
    return axios({
        url: `/menu/list/${parentid}`,
        method: `get`,
        data: params
    })
}

export async function fetchTreeList() {
    return axios({
        url: `/menu/treeList`,
        method: `get`
    })
}
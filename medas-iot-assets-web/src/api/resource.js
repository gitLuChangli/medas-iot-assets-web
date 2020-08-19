import axios from 'axios'

export async function fetchList(params) {
    return axios({
        url: `/api/admin/resource/list`,
        method: `get`,
        params: params
    })
}

export async function createResource(resource) {
    return axios({
        url: `/api/admin/resource/create`,
        method: `post`,
        data: resource
    })
}

export async function updateResource(id, resource) {
    return axios({
        url: `/api/admin/resource/update/${id}`,
        method: `post`,
        data: resource
    })
}

export async function deleteResource(id) {
    return axios({
        url: `/api/admin/resource/delete/${id}`,
        method: `post`
    })
}

export async function fetchAllResourceList() {
    return axios({
        url: `/api/admin/resource/listAll`,
        method: `get`
    })
}

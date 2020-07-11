import axios from 'axios'

export async function fetchList(params) {
    return axios({
        url: `/resource/list`,
        method: `get`,
        params: params
    })
}

export async function createResource(resource) {
    return axios({
        url: `/resource/create`,
        method: `post`,
        data: resource
    })
}

export async function updateResource(id, resource) {
    return axios({
        url: `/resource/update/${id}`,
        method: `post`,
        data: resource
    })
}

export async function deleteResource(id) {
    return axios({
        url: `/resource/delete/${id}`,
        method: `pst`        
    })
}

export async function fetchAllResourceList() {
    return axios({
        url: `/resource/listAll`,
        method: `get`
    })
}

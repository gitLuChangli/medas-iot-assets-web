import axios from 'axios'

export async function listResourceCategories() {
    return axios({
        url: `/resourceCategory/listAll`,
        method: `get`
    })
}

export async function createResourceCategory(category) {
    return axios({
        url: `/resourceCategory/create`,
        method: `post`,
        data: category
    })
}

export async function updateResourceCategory(id, category) {
    return axios({
        url: `/resourceCategory/update/${id}`,
        method: `post`,
        data: category
    })
}

export async function deleteResourceCategory(id) {
    return axios({
        url: `/resourceCategory/delete/${id}`,
        method: `post`
    })
}

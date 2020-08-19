import axios from 'axios'

export async function listResourceCategories() {
    return axios({
        url: `/api/admin/resource/category/listAll`,
        method: `get`
    })
}

export async function createResourceCategory(category) {
    return axios({
        url: `/api/admin/resource/category/create`,
        method: `post`,
        data: category
    })
}

export async function updateResourceCategory(id, category) {
    return axios({
        url: `/api/admin/resource/category/update/${id}`,
        method: `post`,
        data: category
    })
}

export async function deleteResourceCategory(id) {
    return axios({
        url: `/api/admin/resource/category/delete/${id}`,
        method: `post`
    })
}

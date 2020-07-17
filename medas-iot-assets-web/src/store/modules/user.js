import { getToken, getTokenHead, setToken, setTokenHead } from '@/utils/auth'

const user = {
    state: {
        token: getToken(),
        tokenHead: getTokenHead(),
        name: '',
        avatar: '',
        roles: []
    },
    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
            setToken(token)
        },
        SET_TOKEN_HEAD: (state, tokenHead) => {
            state.tokenHead = tokenHead
            setTokenHead(tokenHead)
        },
        SET_NAME: (state, name) => {
            state.name = name
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles
        }
    },
    actions: {
        SetToken({ commit }, token) {
            commit('SET_TOKEN', token)
        },
        SetTokenHead({ commit }, tokenHead) {
            commit('SET_TOKEN_HEAD', tokenHead)
        }
    }
}
export default user

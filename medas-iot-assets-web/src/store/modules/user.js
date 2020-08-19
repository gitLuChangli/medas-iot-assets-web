import { getToken, getTokenHead, setToken, setTokenHead, removeToken, removeTokenHead, getMenus, setMenus, removeMenus, setMine, getMine, removeMine } from '@/utils/auth'
import { mineInfo } from '@/api/mine'

const user = {
    state: {
        token: getToken(),
        tokenHead: getTokenHead(),
        name: '',
        avatar: '',
        roles: [],
        menus: getMenus(),
        mine: getMine()
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
        },
        SET_MENUS: (state, menus) => {
            state.menus = menus
            setMenus(menus)
        },
        SET_MINE: (state, mine) => {
            state.mine = mine
            setMine(mine)
        }
    },
    actions: {
        SetToken({ commit }, token) {
            commit('SET_TOKEN', token)
        },
        SetTokenHead({ commit }, tokenHead) {
            commit('SET_TOKEN_HEAD', tokenHead)
        },
        Logout({commit}) {
            console.log(`logout`)
            commit('SET_TOKEN', '')
            removeToken()
            removeTokenHead()
            removeMine()
            removeMenus()
        },
        SetMenus({commit}, menus) {
            commit('SET_MENUS', menus)
        },
        SetMine({commit}, mine) {
            commit('SET_MINE', mine)
        },
        MineInformation({commit}) {
            mineInfo().then(res => {
                if (res.data.code === 200) {
                    console.log(res.data.data)
                    commit('SET_MINE', res.data.data)
                }
            })
        },
        CheckToken({commit}) {
            if (getTokenHead() === null || getToken() === null) {
                self.location = '/#login'
            }
        }
    }
}
export default user

import Cookies from 'js-cookie'

const app = {
    state: {
        sidebar: {
            opened: !+Cookies.get('sidebarStatus'),
            withoutAnimation: false
        },
        clientHeight: Cookies.get('clientHeight')
    },

    mutations: {
        TOGGLE_SIDEBAR: state => {
            if (state.sidebar.opened) {
                Cookies.set('sidebarStatus', 1)
            } else {
                Cookies.set('sidebarStatus', 0)
            }
            state.sidebar.opened = !state.sidebar.opened
        },
        CLOSE_SIDEBAR: (state, withoutAnimation) => {
            Cookies.set('sidebarStatus', 1)
            state.sidebar.opened = false
            state.sidebar.withoutAnimation = withoutAnimation
        },
        SET_HEIGHT: (state, height) => {
            Cookies.set('clientHeight', height)
            state.clientHeight = height
        }
    },
    actions: {
        ToggleSideBar: ({ commit }) => {
            commit('TOGGLE_SIDEBAR')
        },
        CloseSideBar: ({ commit }) => {
            commit('CLOSE_SIDEBAR')
        },
        SetClientHeight: ({commit}, height) => {
            commit('SET_HEIGHT', height)
        }
    }
}

export default app

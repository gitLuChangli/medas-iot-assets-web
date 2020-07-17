const getters = {
    sidebar: state => state.app.sidebar,
    clientHeight: state => state.app.clientHeight,
    avatar: state => state.user.avatar,
    token: state => state.user.token,
    tokenHead: state => state.user.tokenHead
}
export default getters

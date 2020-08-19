import Cookies from 'js-cookie'

const TokenKey = 'token'

const TokenHead = 'tokenHead'

const Menus = 'menus'

const Mine = 'mine'

export function getToken() {
    return Cookies.get(TokenKey)
}

export function setToken(token) {
    return Cookies.set(TokenKey, token)
}

export function removeToken() {
    return Cookies.remove(TokenKey)
}

export function getTokenHead() {
    return Cookies.get(TokenHead)
}

export function setTokenHead(tokenHead) {
    return Cookies.set(TokenHead, tokenHead)
}

export function removeTokenHead() {
    return Cookies.remove(TokenHead)
}

export function setMenus(menus) {
    localStorage.setItem(Menus, JSON.stringify(menus))
}

export function getMenus() {
    return JSON.parse(localStorage.getItem(Menus))
}

export function removeMenus() {
    localStorage.removeItem(Menus)
}

export function setMine(mine) {
    localStorage.setItem(Mine, JSON.stringify(mine))
}

export function getMine() {
    return JSON.parse(localStorage.getItem(Mine))
}

export function removeMine() {
    localStorage.removeItem(Mine)
}

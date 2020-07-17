import Cookies from 'js-cookie'

const TokenKey = 'token'

const TokenHead = 'tokenHead'

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

const setUserName = function (data) {
    sessionStorage.setItem('userName', data)

}
const getUserName = function () {
    return sessionStorage.getItem('userName')
}
const setToken = function (data) {
    sessionStorage.setItem('token', data)

}
const getToken = function () {
    return sessionStorage.getItem('token')

}
const setUserId = function (data) {
    sessionStorage.setItem("userId", data)
}
const getUserId = function () {
    return sessionStorage.getItem('userId')

}
const setTenantId = function (data) {
    sessionStorage.setItem("tenantId", data)

}
const getTenantId = function () {
    return sessionStorage.getItem('tenantId')

}
const clearStorage = function () {
    sessionStorage.removeItem('userName')
    sessionStorage.removeItem('token')
    sessionStorage.removeItem("userId")
    sessionStorage.removeItem("tenantId")
}

export {
    setUserName,
    setTenantId,
    setToken,
    setUserId,
    getTenantId,
    getToken,
    getUserName,
    getUserId,
    clearStorage
}
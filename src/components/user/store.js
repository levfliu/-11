import { queryRecord, loginRequest } from '../../util/server.js'
import router from '../../util/router'
import * as storage from '../../util/storage.js'

const state = {
    userName: '',
    userId: '5b174e99930cb2e0101df7d3',
    tenantId: '5de2ab2b00b5f31ff6d54a1dc7ee7fb2',
    password: '{}',
    Token: '{}',
    isLogin: false
}

const actions = {
    login: ({ commit }, userLogin) => {
        loginRequest('userLogin', userLogin)
            .then(resp => {
                storage.setUserName(userLogin.userName)
                storage.setTenantId(resp[1].TenantId)
                storage.setToken(resp[1].Token)
                storage.setUserId(resp[1].UserId)
                commit('userName', userLogin.UserName)
                commit('password', userLogin.UserPassword)
                commit('Token', resp.Token)
                commit('isLogin', true)

                // commit('Token', resp[1].Token)
                // commit('isLogin', true)
                // commit('userId', resp[1].UserId)
                // commit('tenantId', resp[1].TenantId)
                router.push('/intraduce')
            })
            .catch(err => {
                console.log(err)
            })
    },
    logout: ({ commit, state }) => {
        commit("isLogin", false)
        storage.clearStorage()
        router.push('/login')
    }
}

const mutations = {
    logout(state) {
        state.isLogin = false
    },
    userId(state, data) {
        state.userId = data
        storage.setUserId(data)
        sessionStorage.setItem("userId", data)
    },
    tenantId(state, data) {
        state.tenantId = data
        sessionStorage.setItem("tenantId", data)
    },
    userName(state, data) {
        state.userName = data
        sessionStorage.setItem('userName', data)
    },
    password(state, data) {
        // sessionStorage.setItem('password', data)
        state.password = data
    },
    Token(state, token) {
        sessionStorage.setItem('token', token)
    },
    isLogin(state, data) {
        state.isLogin = data
    }
}

const getters = {
    userId: (state) => state.userId,
    tenantId: (state) => state.tenantId,
    userName() {
        return sessionStorage.getItem('userName')
    },
    password: (state) => state.password,
    Token() {
        return sessionStorage.getItem('token')
    },
    isLogin(state) {
        if (sessionStorage.getItem('userName') && sessionStorage.getItem('userName').length > 0) {
            state.isLogin = true
        }
        return state.isLogin
    }
}

export {
    state,
    mutations,
    actions,
    getters
}

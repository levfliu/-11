import { FormView, fields } from '../../util/server.js'
import { Message } from 'element-ui'

const state = {
    fields: [],
    // 表单id
    objectId: "xx",
    viewId: "list",
    viewType: 'form',
    // 视图列表
    views: [],
    editView: {
        id: '',
        name: ''
    }
}

const actions = {
    getFields: ({ commit }, objectId) => {
        // objectId="33df367fe53448dd93f5f8c08072d1ac"
        fields(objectId).then(resp => {
            commit('fields', resp)
        }).catch(err => {
            console.log(err)
        })
    },
    getViews: ({ commit }, id) => {
        var params = {
            jsonFilter: {
                objectId: id || state.objectId
            }
        }
        return new Promise((resolve, reject) => {
            FormView('queryFormView', params)
                .then(resp => {
                    commit('views', resp)
                    resolve(resp)
                })
                .catch(err => {
                    console.log(err)
                    reject()
                })

        })
    },
    deleteView: ({ commit }, id) => {
        var params = {
            jsonFilter: {
                id: id
            }
        }
        return new Promise((resolve, reject) => {
            FormView('deleteFormView', params)
                .then(resp => {
                    Message({
                        message: '删除成功',
                        type: 'success'
                    })
                    resolve()
                })
                .catch(err => {
                    console.log(err)
                    reject()
                })

        })
    },
    updateView: ({ commit, dispatch }) => {
        var params = []
        if (state.views.findIndex(t => t.id === state.editView.id) > -1) {
            params = {
                jsonDocs: state.editView
            }
            state.editView
            FormView('updateFormView', params)
                .then(resp => {
                    dispatch("getViews")
                    Message({
                        message: '更新成功',
                        type: 'success'
                    })
                })
                .catch(err => {
                    console.log(err)
                })
        } else {
            params = {
                jsonDocs: state.editView
            }
            FormView('addFormView', params)
                .then(resp => {
                    // commit('pushView', resp)
                    dispatch("getViews")
                    Message({
                        message: '添加成功',
                        type: 'success'
                    })
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }
}

const mutations = {
    fields(state, data) {
        state.fields = data
    },
    views(state, data) {
        state.views = data
    },
    editView(state, data) {
        state.editView = data
    },
    objectId(state, data) {
        state.objectId = data
    },
    viewId(state, data) {
        state.viewId = data
    },
    viewType(state, data) {
        state.viewType = data
    }
}

const getters = {
    objectId(state) {
        return state.objectId
    },
    fieldList(state) {
        return state.fields
    },
    viewId(state) {
        return state.viewId
    },
    editView() {
        return state.editView
    },
    views(state) {
        return state.views
    }
}

export {
    state,
    mutations,
    actions,
    getters
}

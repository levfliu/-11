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
        FormView('deleteFormView', params)
            .then(resp => {
                commit('deleteView', id)
                commit("objectId", "xx")
                commit("viewId", "list")
                commit("viewType", "form")
                commit("editView", {
                    id: '',
                    name: ''
                })
                Message({
                    message: '删除成功',
                    type: 'success'
                })
            })
            .catch(err => {
                console.log(err)
            })
    },
    updateView: ({ commit }) => {
        var params = []
        if (state.views.findIndex(t => t.id === state.editView.id) > -1) {
            params = {
                jsonDocs: state.editView
            }
            state.editView
            FormView('updateFormView', params)
                .then(resp => {
                    commit('updateView', resp)
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
                record: state.addTrigger
            }
            FormView('addFormView', params)
                .then(resp => {
                    commit('pushView', resp)
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
    },


    pushView(state, data) {
        state.views.push(data)
    },
    updateView(state, data) {
        var index = state.views.findIndex(s => s.id === data.id)
        if (index > -1) {
            state.views.splice(index, 1)
            state.views.splice(index, 0, data)
        }
    },
    deleteView(state, id) {
        var index = state.views.findIndex(t => t.id === id)
        if (index > -1) {
            state.views.splice(index, 1)
        }
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

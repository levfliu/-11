import { insertRecord, deleteRecord, queryRecord, updateRecord } from '../../util/server.js'
import { Message } from 'element-ui'

const state = {
    triggerId: false,
    triggerType: 'form',
    triggerFormId: '33df367fe53448dd93f5f8c08072d1ab',
    triggers: [],
    addTrigger: {
        id: '',
        name: ''
    }
}

const actions = {
    getTriggers: ({ commit }, catalog) => {
        var params = {
            condition: {
                objectId: state.triggerFormId
            }
        }
        queryRecord('trigger', params)
            .then(resp => {
                commit('triggers', resp)
            })
            .catch(err => {
                console.log(err)
            })
    },
    deleteTrigger: ({ commit }, id) => {
        var params = {
            condition: {
                id: id
            }
        }
        deleteRecord('trigger', params)
            .then(resp => {
                commit('deleteTrigger', id)
                Message({
                    message: '删除成功',
                    type: 'success'})
            })
            .catch(err => {
                console.log(err)
            })
    },
    updateTrigger: ({ commit }) => {
        var params = []
        if (state.triggers.findIndex(t => t.id === state.addTrigger.id) > -1) {
            params = {
                condition: {
                    id: state.addTrigger.id
                },
                setValue: {
                    name: state.addTrigger.name,
                    action: state.addTrigger.action,
                    description: state.addTrigger.description,
                    script: state.addTrigger.script
                }
            }
            updateRecord('trigger', params)
                .then(resp => {
                    commit('updateTrigger', resp)
                    Message({
                        message: '更新成功',
                        type: 'success'})
                })
                .catch(err => {
                    console.log(err)
                })
        } else {
            params = {
                record: state.addTrigger
            }
            insertRecord('trigger', params)
                .then(resp => {
                    commit('pushTrigger', resp)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }
}

const mutations = {
    triggerInfo (state, data) {
        state.triggerId = data.triggerId
        state.triggerType = data.triggerType
        state.triggerFormId = data.triggerFormId
    },
    triggers (state, data) {
        state.triggers = data
    },
    addTrigger (state, data) {
        state.addTrigger = data
    },
    pushTrigger (state, data) {
        state.triggers.push(data)
    },
    updateTrigger (state, data) {
        var index = state.triggers.findIndex(s => s.id === data.id)
        if (index > -1) {
            state.triggers.splice(index, 1)
            state.triggers.splice(index, 0, data)
        }
    },
    deleteTrigger (state, id) {
        var index = state.triggers.findIndex(t => t.id === id)
        if (index > -1) {
            state.triggers.splice(index, 1)
        }
    }
}

const getters = {
    triggerId (state) {
        return state.triggerId
    },
    addTrigger () {
        return state.addTrigger
    },
    triggers (state) {
        return state.triggers
    }
}

export {
    state,
    mutations,
    actions,
    getters
}

import Vue from 'vue'
import { queryRecord, insertRecord, deleteRecord, queryFormRecord, deleteFormRecord, FormView } from '../../util/server.js'
import { addTreeItem, guid, deleteTreeItem } from '../../util/func.js'
import { Message } from 'element-ui'

const state = {
    centerDialogVisible: false,
    systemFunction: [
        {
            title: '数据构建',
            content: '无码化应用搭建能力，弹指间即完成数据从无到有的收集和使用，业务信息化就是如此简单',
            img: 'card-left-top',
            showDetail: true,
            subFunction: [{
                label: '应用设计'
            }, {
                label: '填报设计'
            }, {
                label: '业务流程'
            }]
        }, {
            title: '数据连接',
            content: '轻松融合不同类型、不同存储终端的海量数据，实现数据毫秒级传输速度，所接即所得，快得不可思议',
            img: 'card-left-bottom',
            showDetail: true,
            subFunction: [{
                label: '数据源'
            }, {
                label: '数据连接器'
            }, {
                label: '数据交换机'
            }]
        }, {
            title: '数据治理',
            content: '专业智能的数据处理、校验、优化，让冗杂的海量数据瞬间变得条理清晰井然有序，管理数据轻松简单',
            img: 'card-right-top',
            showDetail: true,
            subFunction: [{
                label: '数据图书馆'
            }, {
                label: '数据标准'
            }, {
                label: '数据安全'
            }]
        }, {
            title: '数据分析',
            content: '通过拖拽方式就能轻松的搭建多维度海量数据的统计分析、数据可视化',
            img: 'card-right-bottom',
            showDetail: true,
            subFunction: [{
                label: '数据分析仪'
            }, {
                label: '数据大屏'
            }, {
                label: '数据文档'
            }]
        }
    ],
    headerIndex: -1,
    serviceList: [{
        name: '所有数据',
        type: 0
    }],
    serviceType: -1,
    serviceCatalog: null
}

const actions = {
    getApps: ({ commit }, id) => {
        var params = {
            jsonFilter: {}
        }
        if (id != "all") {
            params = {
                jsonFilter: {
                    id: id
                }
            }
        }
        return new Promise((resolve, reject) => {
            FormView("queryApp", params)
                .then(resp => {
                    console.log(resp);
                    resolve(resp)
                })
                .catch(err => {
                    console.log(err);
                    reject()
                })
        })
    },
    getForms: ({ commit }, catalog) => {
        var params = {
            jsonFilter: {
                catalogId: catalog
            }
        }
        return new Promise((resolve, reject) => {
            queryFormRecord('queryForm/5de2ab2b00b5f31ff6d54a1dc7ee7fb2/5b174e99930cb2e0101df7d3', params)
                .then(resp => {
                    commit('serviceAddFormRecord', {
                        type: 18,
                        records: resp
                    })
                    resolve(resp)
                })
                .catch(err => {
                    console.log(err)
                    reject(err)
                })
        })
    },
    deleteForm: ({ commit }, formId) => {
        var params = {
            jsonFilter: {
                id: formId
            }
        }
        deleteFormRecord('', params)
            .then(resp => {
                commit('deleteForm', formId)
                Message({
                    message: '删除成功',
                    type: 'success'
                })
            })
            .catch(err => {
                console.log(err)
            })
    },
    getServiceRecord: ({ commit }, { type, catalog }) => {
        var params = {
            condition: {
                catalog: catalog,
                type: type
            }
        }
        queryRecord('getTreeApps/5de2ab2b00b5f31ff6d54a1dc7ee7fb2', params)
            .then(resp => {
                commit('serviceAddRecord', {
                    type: type,
                    records: resp
                })
            })
            .catch(err => {
                console.log(err)
            })
    },
    deleteCatalog: ({ commit }, catalog) => {
        var params = {
            condition: {
                id: catalog.id
            }
        }
        deleteRecord('catalog', params)
            .then(resp => {
                commit('deleteCatalog', catalog)
                Message({
                    message: '删除成功',
                    type: 'success'
                })
            })
            .catch(err => {
                console.log(err)
            })
    },
    addCatalog: ({ commit }, catalog) => {
        catalog.id = guid()
        var params = {
            record: catalog
        }
        insertRecord('catalog', params)
            .then(resp => {
                commit('addCatalog', resp)
            })
            .catch(err => {
                console.log(err)
            })
    },
    getCatalogs: ({ commit }, { type }) => {
        var params = {
            condition: {
                level: 0,
                $or: [{
                    type: 0
                }, {
                    type: type
                }]
            },
            options: {
                isSerchSubItem: true,
                sort: {
                    sort: 1
                }
            }
        }
        queryRecord('catalog', params)
            .then(resp => {
                commit('serviceCatalogs', {
                    type: type,
                    catalogs: resp
                })
            })
            .catch(err => {
                console.log(err)
            })
    }
}

const mutations = {
    deleteForm(state, formId) {
        var serviceIndex = state.serviceList.findIndex(s => s.type === 18)
        var srsIndex = state.serviceList[serviceIndex].serviceRecords.findIndex(a => a.id === formId)
        state.serviceList[serviceIndex].serviceRecords.splice(srsIndex, 1)
        var value = state.serviceType
        state.serviceType = -1
        state.serviceType = value
    },
    serviceAddFormRecord(state, data) {
        var service = state.serviceList.find(t => t.type === data.type)
        if (!data.records) {
            data.records = []
        }
        if (typeof (service) == "undefined") {
            return;
        }
        service.serviceRecords = []
        service.serviceRecords = service.serviceRecords.concat(data.records)
        state.serviceType = -1
        state.serviceType = data.type
    },
    serviceCatalog(state, data) {
        state.serviceCatalog = data
    },
    deleteCatalog(state, data) {
        var serviceIndex = state.serviceList.findIndex(s => s.type === data.type)
        var catalogs = state.serviceList[serviceIndex].catalogs
        deleteTreeItem(data, catalogs, 'id', 'id', 'children')
    },
    addCatalog(state, data) {
        var serviceIndex = state.serviceList.findIndex(s => s.type === data.type)
        var catalogs = state.serviceList[serviceIndex].catalogs
        addTreeItem(data, catalogs, 'id', 'parentId', 'children')
        state.centerDialogVisible = false
    },
    centerDialogVisible(state, data) {
        state.centerDialogVisible = data
    },
    serviceType(state, data) {
        state.serviceType = data
    },
    serviceCatalogs(state, data) {
        var serviceIndex = state.serviceList.findIndex(s => s.type === data.type)
        if (serviceIndex < 0) {
            return
        }
        if (!state.serviceList[serviceIndex].catalogs) {
            state.serviceList[serviceIndex].catalogs = []
        }
        Vue.set(state.serviceList[serviceIndex], 'catalogs', data.catalogs)
        state.serviceType = -1
        state.serviceType = data.type
    },
    addService(state, data) {
        var index = state.serviceList.findIndex(s => s.type === data.type)
        if (index < 0) {
            state.serviceList.push(data)
        } else {
            state.serviceList[index] = data
        }
    },
    systemFunction(state, data) {
        state.systemFunction = data
    },
    showOverviewList(state, data) {
        state.systemFunction[data].showDetail = false
    },
    closeOverviewList(state, data) {
        state.systemFunction[data].showDetail = true
    }
}

const getters = {
    serviceCatalog(state) {
        return state.serviceCatalog
    },
    centerDialogVisible(state) {
        return state.centerDialogVisible
    },
    serviceType(state) {
        return state.serviceType
    },
    serviceList(state) {
        return state.serviceList
    },
    systemFunction(state) {
        return state.systemFunction
    }
}

export {
    state,
    mutations,
    actions,
    getters
}

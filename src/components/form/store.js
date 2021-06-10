import { insertFormRecord, updateFormRecord, queryFormRecord, formDataAction } from '../../util/server.js'
import { Message } from 'element-ui'
import commonConfig from './commonConfig'
import Vue from 'vue'
import { Store } from 'vuex'

const state = {
    commonConfig: commonConfig,
    formItems: [
        {
            label: '基础组件',
            icon: 'el-icon-document',
            items: [
                {
                    label: '文本框',
                    name: 'el-input'
                },
                {
                    label: '下拉框',
                    name: 'el-select',
                    data: true,
                    dataConfig:
                    {
                        dataType: 'static',
                        subType: 'el-option',
                        dataOptions: [
                            {
                                value: '1',
                                label: '选项1'
                            }, {
                                value: '2',
                                label: '选项2'
                            }, {
                                value: '3',
                                label: '选项3'
                            }
                        ]
                    }
                },
                {
                    label: '单选框',
                    name: 'el-radio-group',
                    data: true,
                    dataConfig: {
                        dataType: 'static',
                        subType: 'el-radio',
                        dataOptions: [
                            {
                                value: '1',
                                label: '选项1'
                            },
                            {
                                value: '2',
                                label: '选项2'
                            },
                            {
                                value: '3',
                                label: '选项3'
                            }
                        ]
                    }
                },
                {
                    label: '多选框',
                    name: 'el-checkbox-group',
                    data: true,
                    dataConfig: {
                        dataType: 'static',
                        subType: 'el-checkbox',
                        dataOptions: [
                            {
                                value: '1',
                                label: '选项1'
                            },
                            {
                                value: '2',
                                label: '选项2'
                            },
                            {
                                value: '3',
                                label: '选项3'
                            }
                        ]
                    }
                },
                {
                    label: '开关',
                    name: 'el-switch'
                },
                {
                    label: '数字',
                    name: 'el-input-number',
                    defaultValue: 0
                },
                {
                    label: '日期',
                    name: 'el-date-picker'
                },
                {
                    label: '时间',
                    name: 'el-time-select'
                }
            ]
        },
        {
            label: '布局设计',
            icon: 'el-icon-menu',
            items: [
                {
                    label: '页签',
                    name: 'el-tabs'
                },
                {
                    label: '折叠面板',
                    name: 'el-collapse'
                },
                {
                    label: '栅格',
                    name: 'el-row'
                },
                {
                    label: '步骤',
                    name: 'el-steps'
                }
            ]
        },
        {
            label: '高级组件',
            icon: 'el-icon-s-marketing',
            items: [
                {
                    label: '输入框',
                    name: 'el-input'
                }
            ]
        },
        {
            label: '系统组件',
            icon: 'el-icon-s-management',
            items: [
                {
                    label: '输入框',
                    name: 'el-input'
                }
            ]
        }
    ],
    formObject: {
        version: 'v2.0',
        isNewAsset: true,
        name: '数据填报默认值',
        label: '数据填报默认值',
        id: '0x1234567899dsaxvfesdswhftjczdet',
        pluarName: '数据填报默认值',
        pluarLabel: '数据填报默认值',
        objectDescription: '',
        isMobile: false,
        collection: '',
        type: 'ServiceObj',
        isBaseline: false,
        labelAlignMode: 'right',
        labelWidth: 10,
        inline: false,
        formStyle: '1',
        formColumnList: [],
        fields: [],
        tableColumnList: [],
        queryColumnList: [],
        uniqueColumnList: [],
        validateMandatory: true,
        afterSaveOperate: '1',
        updateAfterPrompt: '保存成功',
        saveButtonAlias: '保存',
        theme: 'default',
        draft: false,
        draftColumn: [],
        isAutoCommit: false,
        isRevert: false,
        revertInfo: '返回将不会保存已录入信息，是否确定？',
        limitOne: [],
        primaryKeyColumn: [],
        catalogId: 'defaultTeam',
        variableList: []
    },
    formData: {},
    selectedFieldId: -1,
    openItems: [],
    initFormDataFields() {
        if (!('formColumnList' in state.formObject)) {
            return
        }
        state.formObject.formColumnList.map(function (f) {
            if (!(f.name in state.formData)) {
                if ('defaultValue' in f) {
                    console.log(f);
                    Vue.set(state.formData, f.name, f.defaultValue)
                    state.formData[f.name] = f.defaultValue
                } else {
                    Vue.set(state.formData, f.name, '')
                }
            }
        })
    },
    formItemList: []
}

const actions = {
    formItemListDetail: ({ commit }) => {
        var params = {
            objectId: state.formObject.id,
        }
        formDataAction("queryList/" + state.formObject.name, params)
            .then(resp => {
                if (resp.resCode == 0) {
                    state.formItemList = resp.result
                }
            })
            .catch(err => {
                console.log(err)
            })

    },
    formItemDetail: ({ commit }, recordId) => {
        console.log(recordId);
        var params = {
            recordId,
        }
        formDataAction("query/" + state.formObject.name, params)
            .then(resp => {
                if (resp.resCode == 0) {
                    state.formData = resp.result
                }
            })
            .catch(err => {
                console.log(err)
            })

    },
    formUpdate: ({ commit }, recordId) => {
        if (state.formData._id) {
            delete state.formData._id
        }
        if (state.formData.RecordId) {
            delete state.formData.RecordId
        }
        var params = {
            recordId,
            setValue: state.formData
        }
        formDataAction("update/" + state.formObject.name, params)
            .then(resp => {
                if (resp.resCode == 0) {
                    Message({
                        message: '提交成功',
                        type: 'success'
                    })
                }
            })
            .catch(err => {
                console.log(err)
            })

    },
    formSubmit: ({ commit }) => {
        delete state.formData._id
        var params = {
            record: state.formData
        }
        formDataAction("insert/" + state.formObject.name, params)
            .then(resp => {
                if (resp.resCode == 0) {
                    Message({
                        message: '提交成功',
                        type: 'success'
                    })
                    Object.keys(state.formData).forEach(key => state.formData[key] = '');
                }
                else {
                    Message({
                        message: '错误：' + resp.resMsg,
                        type: 'error'
                    })
                }
            })
            .catch(err => {
                console.log(err)
            })
    },
    getForm: ({ commit, dispatch }) => {
        var params = {
            jsonFilter: {
                id: state.formObject.id
            }
        }
        return new Promise((resolve, reject) => {
            queryFormRecord('', params)
                .then(resp => {
                    if (resp.length > 0) {
                        commit('formObject', resp[0])
                        resolve()
                        // if (type == "update") {
                        //     dispatch("formItemDetail", recordId)
                        // }
                    } else {
                        commit('formObject', undefined)
                        reject()
                    }
                })
                .catch(err => {
                    reject()
                    console.log(err)
                })

        })
    },
    addForm: ({ commit }) => {
        var params = {
            jsonDocs: state.formObject
        }
        insertFormRecord('', params)
            .then(resp => {
                Message({
                    message: '保存填报设计成功',
                    type: 'success'
                })
            })
            .catch(err => {
                console.log(err)
            })
    },
    updateForm: ({ commit }) => {
        var params = {
            jsonDocs: state.formObject
        }
        updateFormRecord('', params)
            .then(resp => {
                Message({
                    message: '保存填报设计成功',
                    type: 'success'
                })
            })
            .catch(err => {
                console.log(err)
            })
    }
}

const mutations = {
    deleteField(state, id) {
        var index = state.formObject.formColumnList.findIndex(f => f.id === id)
        state.formObject.formColumnList.splice(index, 1)
    },
    sortFields(state, { newIndex, oldIndex }) {
        const item = state.formObject.formColumnList[oldIndex]
        const newItem = state.formObject.formColumnList[newIndex]
        if (!item || !newItem) return
        if (newIndex !== oldIndex) {
            state.formObject.formColumnList.splice(oldIndex, 1)
            state.formObject.formColumnList.splice(newIndex, 0, item)
        }
    },
    openItems(state, form) {
        state.openItems = form
    },
    selectedFieldId(state, id) {
        state.selectedFieldId = id
    },
    addField(state, field) {
        if (!state.formObject.formColumnList) {
            state.formObject.formColumnList = []
        }
        state.formObject.formColumnList.push(field)
    },
    formId(state, id) {
        state.formObject.id = id
    },
    formObject(state, form) {
        if (form) {
            state.formObject = form
        }
    },
    formData(state, form) {
        state.formData = form
    },
    formItemList(state, list) {
        state.formItemList = list
    }
}

const getters = {
    formItemList() {
        return state.formItemList
    },
    commonConfig() {
        return state.commonConfig
    },
    openItems() {
        return state.openItems
    },
    formItem: function (state) {
        return function (name) {
            var items = state.formItems.map(a => a.items)
            var funList = [].concat.apply([], items)
            var service = funList.filter(a => (a.name === name))
            if (service && service.length > 0) {
                return service[0]
            }
            return name
        }
    },
    selectedFieldId(state) {
        return state.selectedFieldId
    },
    formItems(state) {
        return state.formItems
    },
    formObject(state) {
        return state.formObject
    },
    formData(state) {
        state.initFormDataFields()
        return state.formData
    }
}

export {
    state,
    mutations,
    actions,
    getters
}

import { queryRecord } from '../../util/server.js'

const state = {
    menuItems: [
        {
            label: '工作台',
            catalog: 'ONEWORK',
            route: 'console',
            listMenus: [{
                label: '概览',
                route: 'overview',
                icon: 'el-icon-collection'
            }, {
                label: '我的业务',
                route: 'operation',
                icon: 'el-icon-menu'
            }, {
                label: '最近',
                route: 'recently',
                icon: 'el-icon-time'
            }, {
                label: '收藏夹',
                route: 'favorite ',
                icon: 'el-icon-star-off'
            }, {
                label: '与我共享',
                route: 'shared',
                icon: 'el-icon-share'
            }]
        }, {
            label: '我的数据',
            catalog: 'ONEDATA',
            route: 'service',
            query: {
                catalog: 'defaultTeam',
                type: 0
            }
        }, {
            label: '应用商超',
            catalog: 'ONESTORE',
            route: 'store',
            listMenus: [{
                label: '我的商品',
                route: 'overview',
                icon: 'el-icon-collection'
            }, {
                label: '我的订单',
                route: 'operation',
                icon: 'el-icon-menu'
            }, {
                label: '我的收藏',
                route: 'recently',
                icon: 'el-icon-time'
            }, {
                label: '我的账号',
                route: 'favorite ',
                icon: 'el-icon-star-off'
            }]
        }, {
            label: '系统管理',
            catalog: 'ONECONFIG',
            route: 'config',
            listMenus: [{
                label: '组织管理',
                route: 'organization',
                icon: 'el-icon-school'
            }, {
                label: '角色管理',
                route: 'role',
                icon: 'el-icon-s-check'
            }, {
                label: '用户管理',
                route: 'users',
                icon: 'el-icon-user'
            }, {
                label: '字典管理',
                route: 'dict',
                icon: 'el-icon-postcard'
            }]
        }
    ],
    sysFuncs: [],
    headerIndex: -1,
    menuIndex: -1,
    openNavi: false
}

const actions = {
    getsysFuncs: ({ commit }) => {
        var params = {
            condition: {
                name: 'Main'
            },
            options: {
                isSerchSubItem: true,
                sort: {
                    sort: 1
                }
            }
        }
        queryRecord('sysMenu', params)
            .then(resp => {
                commit('sysFuncs', resp)
            })
            .catch(err => {
                console.log(err)
            })
    }
}

const mutations = {
    sysFuncs (state, data) {
        state.sysFuncs = data
    },
    headerIndex (state, data) {
        state.headerIndex = data
    },
    menuIndex (state, data) {
        state.menuIndex = data
    },
    openNavi (state, data) {
        state.openNavi = data
    }
}

const getters = {
    getServiceName: function (state) {
        return function (type) {
            var result = state.sysFuncs.map(a => (a.children))
            var funList = [].concat.apply([], result)
            funList=JSON.parse(JSON.stringify(funList.filter(i=>i!=undefined)))
            var service = funList.filter(a => (a.type === type))
            if (service && service.length === 1) {
                return service[0].name
            }
            return '' + type
        }
    },
    sysFuncs (state) {
        return state.sysFuncs
    },
    openNavi (state) {
        return state.openNavi
    },
    menuItems (state) {
        return state.menuItems
    },
    headerIndex (state) {
        return state.headerIndex
    },
    menuIndex (state) {
        return state.menuIndex
    }
}

export {
    state,
    mutations,
    actions,
    getters
}

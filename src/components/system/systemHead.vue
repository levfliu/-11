<template>
    <el-row class="bzk-head">
        <div class="console-button" @mouseenter="openNavi()">
            <img class="bzk-head-navigation-icon" height="20px" width="20px" src="/static/images/menu.png" title="功能导航" >
            <system-navi></system-navi>
        </div>
        <div class="row bzk-logo" @click="clickLogo()">
            <img height="40" width="95" src="/static/images/console-logo.png" title="百展云 — 低代码开发平台">
            <div>百展客云展平台</div>
        </div>
        <div class="bzk-head-menu">
            <el-button type="primary" v-for="(item, menuIndex) of menuItems" :key="item.catalog" @click="click(menuIndex)"
                v-bind:class="{
                    'button-active': menuIndex === headerIndex
                }" class="bzk-head-menu-button">
                {{item.label}}
            </el-button>
        </div>
        <div v-if="isLogin">
            <user-info></user-info>
        </div>
        <div v-else>
            <to-login></to-login>
        </div>
    </el-row>
</template>

<script>
import toLogin from '../user/toLogin'
import userInfo from '../user/userInfo'
import systemNavi from '../system/systemNavi'

export default {
    name: 'Top',
    data () {
        return {
        }
    },
    components: {
        'to-login': toLogin,
        'user-info': userInfo,
        'system-navi': systemNavi
    },
    computed: {
        isLogin () {
            return this.$store.getters.isLogin
        },
        menuItems () {
            return this.$store.getters.menuItems
        },
        headerIndex () {
            return this.$store.getters.headerIndex
        }
    },
    mounted () {
        var routeName = this.$router.history.current.name
        for (var fmIndex in this.$store.getters.menuItems) {
            for (var smIndex in this.$store.getters.menuItems[fmIndex].listMenus) {
                if (this.$store.getters.menuItems[fmIndex].listMenus[smIndex].route === routeName) {
                    this.$store.commit('headerIndex', parseInt(fmIndex))
                    this.$store.commit('menuIndex', parseInt(smIndex))
                    return
                }
            }
            if (this.$store.getters.menuItems[fmIndex].route === routeName && !this.$store.getters.menuItems[fmIndex].listMenus) {
                this.$store.commit('headerIndex', parseInt(fmIndex))
                return
            }
        }
        this.$store.commit('headerIndex', -1)
        this.$store.commit('menuIndex', -1)
    },
    methods: {
      clickLogo() {
        this.$router.push({name: 'intraduce'})
      },
        openNavi () {
            this.$store.commit('openNavi', true)
        },
        click (index) {
            this.$store.commit('headerIndex', index)
            var menuIndex = this.$store.getters.menuIndex
            if (menuIndex < 0) {
                this.$store.commit('menuIndex', 0)
                menuIndex = 0
            }
            if (!this.$store.getters.menuItems[index].listMenus) {
                var query = {}
                if (this.$store.getters.serviceCatalog) {
                    query.catalog = this.$store.getters.serviceCatalog
                }
                if (this.$store.getters.serviceType >= 0) {
                    query.type = this.$store.getters.serviceType
                }
                this.$router.push(
                    {
                        name: this.$store.getters.menuItems[index].route,
                        query: query
                    })
            } else {
                this.$router.push({name: this.$store.getters.menuItems[index].listMenus[menuIndex].route})
            }
        }
    }
}
</script>

<style lang="scss">
    .bzk-head {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #1e2940;
        .bzk-logo {
            margin: 5px 30px;
            cursor: pointer;
        }
        .bzk-head-menu {
            flex: 1;
            padding-left: 20px;
            align-items: center;
            justify-items: center;
            img {
                margin-right: 50px;
            }
        }
        .bzk-head-menu-button {
            color: #CCCCCC;
            background: #1e2940;
            border-color: #1e2940;
            font-size: 16px;
            :hover {
                color: #FFFFFF;
            }
        }
        .console-button {
            width: 80px;
            height: 100%;
            position: relative;
            background-color: #081e49;
            .bzk-head-navigation-icon {
                top: 34%;
                left: 34%;
                position: absolute;
            }
        }
    }
    .el-header {
        background: #1e2940;
        color: #CCCCCC;
        padding-right: 20px !important;
        padding-left: 0px !important;
    }
</style>

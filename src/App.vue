<template>
    <el-container class="console-container">
        <el-header height="80px" v-if="isLogin&&headerShow"><system-head></system-head></el-header>
        <el-container>
            <el-aside v-if="menuComponent">
                <component :is="menuComponent"></component>
            </el-aside>
            <el-container>
                <el-main>
                    <router-view></router-view>
                </el-main>
                <el-footer v-if="false">Footer</el-footer>
                <el-aside v-if="configComponent">
                    <component :is="configComponent"></component>
                </el-aside>
            </el-container>
        </el-container>
    </el-container>
</template>

<script>
import systemHead from './components/system/systemHead.vue'
import systemMenu from './components/system/systemMenu.vue'
import serviceMenu from './components/service/serviceMenu.vue'
import formMenu from './components/form/formMenu.vue'
import formConfig from './components/form/formConfig.vue'
import triggerMenu from './components/trigger/triggerMenu.vue'
import viewMenu from './components/view/viewMenu.vue'

export default {
    name: 'App',
    components: {
        'system-head': systemHead,
        'system-menu': systemMenu,
        'service-menu': serviceMenu,
        'form-menu': formMenu,
        'form-item-config': formConfig,
        'trigger-menu': triggerMenu,
        'view-menu': viewMenu
    },
    data () {
        return {
            menuComponent: 'system-menu',
            configComponent: 'form-item-config',
            headerShow:true
        }
    },
    computed: {
        isLogin () {
            if (this.$store.getters.headerIndex > -1) {
            }
            return this.$store.getters.isLogin
        }
    },
    methods: {
        updateUI (name) {
            this.menuComponent = false
            this.configComponent = false
            // this.headerShow = true
            if (name === 'service') {
                this.menuComponent = 'service-menu'
            } else if (name === 'formAdd' || name === 'formEdit') {
                this.menuComponent = 'form-menu'
                this.configComponent = 'form-item-config'
            } else if (name === 'form') {
                this.menuComponent = false
            } else if (name === 'trigger') {
                this.menuComponent = 'trigger-menu'
            } else if (name === 'view') {
                this.menuComponent = 'view-menu'
            } else if (name === 'viewShow') {
                this.menuComponent = false        
            } else if (name === 'createApp') {
                this.menuComponent = false        
                this.headerShow=false        
            } else {
                this.menuComponent = 'system-menu'
            }

            if (name === 'intraduce' || name === 'login') {
                this.menuComponent = false
            }
        }
    },
    watch: {
        $route (to) {
            this.updateUI(to.name)
        }
    },
    mounted () {
        this.updateUI(this.$router.history.current.name)
        if (!this.isLogin) {
            this.$router.push({name: 'login'})
        }
    }
}
</script>

<style lang="scss">
    .console-container {
        height: 100vh;
        overflow: hidden;
        display: flex;
        flex-direction: column !important;
        .el-container {
            overflow: hidden;
        }
        .el-main {
            background: rgb(245, 246, 250);
            display: flex;
            justify-content: center;
            padding: 0px;
        }
        .el-aside {
            border-right: solid 1px #e6e6e6;
            box-shadow: rgb(223, 222, 222) 0px 0px 4px 0px;
            padding-top: 10px;
        }
    }
</style>

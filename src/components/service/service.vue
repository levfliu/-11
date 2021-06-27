<template>
    <el-tabs v-model="activeName" @tab-click="handleClick" addable @tab-add="handleAdd"
        class="service">
        <el-tab-pane v-for="service of serviceList" :key="service.type"
            :label="service.name" :name="'' + service.type">
            <el-scrollbar style="height:100%;width:100%;">
                <service-list :service="service"></service-list>
            </el-scrollbar>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
import serviceList from './serviceList.vue'
import { guid } from '../../util/func.js'

export default {
    data () {
        return {
        }
    },
    components: {
        'service-list': serviceList
    },
    computed: {
        activeName: {
            get () {
                return '' + this.$store.getters.serviceType
            },
            set (value) {
                this.$store.commit('serviceType', parseInt(value))
            }
        },
        serviceList () {
            var services = this.$store.getters.serviceList
            return services
        }
    },
    mounted () {
        if (this.$route.query.type) {
            this.$store.commit('serviceType', parseInt(this.$route.query.type))
            this.$store.commit('addService', {
                type: parseInt(this.$route.query.type),
                name: this.$store.getters.getServiceName(parseInt(this.$route.query.type))
            })
            this.$store.dispatch('getCatalogs', {type: parseInt(this.$route.query.type)})
        } else {
            this.$store.commit('serviceType', 0)
        }
        if (this.$route.query.catalog) {
            this.$store.commit('serviceCatalog', this.$route.query.catalog)
        } else {
            this.$store.commit('serviceCatalog', 'defaultTeam')
        }
    },
    methods: {
        handleClick () {
            this.$store.commit('serviceType', parseInt(this.activeName))
            let query = Object.assign({}, this.$route.query, {type: parseInt(this.activeName)})
            this.$router.push({query: query})

            this.$store.dispatch('getCatalogs', {type: parseInt(this.activeName)})
            if (this.$store.getters.serviceType === 18) {
                this.$store.dispatch('getForms', this.$store.getters.serviceCatalog)
            }
            if (this.$store.getters.serviceType === 22) {
                this.$store.dispatch('getApps', "all")
            }
        },
        handleAdd () {
            if (this.$store.getters.serviceType === 0) {
                this.$store.commit('openNavi', true)
            }

            if (this.$store.getters.serviceType === 18) {
                var formId = guid()
                this.$router.push({
                    name: 'formAdd',
                    params: {
                        formId: formId
                    }
                })
            }
            if(this.$store.getters.serviceType == 22){
                var appId = guid()
                this.$router.push({
                    name:"createApp",
                    query:{
                        type:"create",
                        appId:appId
                    }
                })
            }
        }
    }
}
</script>

<style lang="scss">
    .service {
        margin-top: -10px;
        width: 100%;
        background-color: white;
        display: flex;
        flex-direction: column;
        .el-tabs__new-tab {
            position: relative;
        }
        .el-tab-pane {
            display: flex;
        }
        .el-tabs__new-tab::before {
            content: "";
            position: absolute;
            top: 50%;
            left: 50%;
            width: 50px;
            height: 50px;
            transform: translate(-50%, -50%);
            border-radius: 50%;
            animation: sun 3s infinite;
        }
        @keyframes sun {
            0% {
                transform: translate(-50%, -50%) scale(0.5);
                box-shadow: 0px 0px 5px rgba(255,255,255,0.7);
                background: rgb(4, 84, 242);
            }
            90% {
                transform: translate(-50%, -50%) scale(1);
                box-shadow: 0px 0px 30px rgba(255,255,255,0.7);
                background: white;
            }
            100% {
                transform: translate(-50%, -50%) scale(1);
                box-shadow: 0px 0px 30px rgba(255,255,255,0.7);
                background: white;
            }
        }
        .el-tabs__nav-wrap::after {
            background: transparent !important;
        }

        .el-tabs__header {
            border-bottom: 2px solid #e9e9e9;
            height: 60px;
            margin: 0px 0 3px;
        }
        .el-tabs__item {
            height: 100%;
            line-height: 60px;
        }
        .el-tabs__nav-scroll {
            height: 100%;
        }
        .el-tabs__nav-wrap {
            height: 100%;
        }
        .el-tabs__nav {
            height: 100%;
            margin-left: 20px;
        }
        .el-tabs__new-tab {
            margin: 20px;
        }
        .el-tabs__content {
            flex: 1
        }
        .el-tab-pane {
            height: 100%;
        }
        .el-tabs__item {
            font-size: 18px;
        }
        .el-tabs__active-bar {
            margin-top: 10px;
        }
    }
</style>

<template>
    <el-menu class="el-menu-vertical-demo el-menu-bzk animate__animated animate__slideInUp">
        <el-menu-item v-for="(item, menuIndex) of menuItem" :index="item.icon" :key="menuIndex" @click="click(menuIndex)"
            v-bind:class="{
                'button-active': menuIndex === $store.getters.menuIndex
            }">
            <i :class="item.icon"></i>
            <span slot="title">{{item.label}}</span>
        </el-menu-item>
    </el-menu>
</template>

<script>

export default {
    name: 'Top',
    data () {
        return {
        }
    },
    components: {
    },
    computed: {
        menuItem () {
            var index = this.$store.getters.headerIndex
            if (index > -1 && index < this.$store.getters.menuItems.length) {
                return this.$store.getters.menuItems[index].listMenus
            } else {
                return []
            }
        }
    },
    methods: {
        click (index) {
            this.$store.commit('menuIndex', index)
            this.$router.push({
                name: this.menuItem[index].route,
                params: this.menuItem[index].params
            })
        }
    }
}
</script>

<style lang="scss">
    .el-menu-bzk {
        border-right: solid 0px #e6e6e6 !important;
        margin: 20px !important;
        .el-menu-item {
            color: #0c0d0e;
            font-size: 16px;
            font-weight: 400;
            font-family: PingFangSC-Regular,PingFang SC;
            border-radius: 5px !important;
            margin: 20px 0 !important;
        }
    }
</style>

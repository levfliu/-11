<template>
    <div class="user-info">
        <div class="user-circle"><i class="el-icon-bell" style="font-size: 25px"></i></div>
        <div class="user-circle"><i class="el-icon-magic-stick" style="font-size: 25px"></i></div>
        <el-dropdown @command="handleCommand">
            <el-avatar size="medium" :src="circleUrl"></el-avatar>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-s-custom">个人中心</el-dropdown-item>
                <el-dropdown-item icon="el-icon-s-home">返回首页</el-dropdown-item>
                <el-dropdown-item icon="el-icon-refresh-left" command="exit">退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <div>{{userName}}</div>
    </div>
</template>
<script>

export default {
    name: 'toLogin',
    data () {
        return {
            circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
            userName: this.$store.getters.userName
        }
    },
    components: {
    },
    created () {
    },
    methods: {
        userExit () {
            this.$store.dispatch('logout')
        },
        handleCommand (command) {
            if (command === 'exit') {
                this.userExit()
            }
        }
    }
}
</script>
<style lang="scss" scoped>
    .user-info {
        display: flex;
        align-items: center;
        font-size: 14px;
        .el-dropdown {
            display: flex;
            flex-direction: row;
        }
        .user-circle {
            width: 40px;
            height: 40px;
            line-height: 40px;
            border-radius: 20px;
            margin: 0 10px;
            background-color: #293349;
            i {
                margin-top: 7px;
                margin-left: 7px;
            }
        }
        .user-circle:hover {
            background-color: rgb(4, 84, 242);
        }
        .el-avatar {
            margin: 0 10px;
        }
    }
</style>

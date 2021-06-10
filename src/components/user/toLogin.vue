<template>
    <div class="login" id="login">
        <el-button size="mini" @click="toLogin()">登录</el-button>
        <el-button size="mini" type="primary">注册</el-button>
    </div>
</template>
<script>

export default {
    name: 'toLogin',
    data () {
        return {

        }
    },
    components: {
    },
    created () {
        if (sessionStorage.getItem('token') && sessionStorage.getItem('token').length > 10) {
            this.$store.commit('isLogin', true)
        }
    },
    methods: {
        toLogin () {
            this.$router.push('/login')
        }
    }
}
</script>
<style lang="scss" scoped>

</style>

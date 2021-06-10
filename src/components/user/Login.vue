<template>
  <div class="login" id="login">
    <login-input
      ref="username"
      class="login-input"
      v-model="user.UserName"
      :validators="validators.username"
      :outer-errors="usernameErrors"
      @login="login"
      placeholder="请输入手机号/邮箱"
    ></login-input>
    <login-input
      type="password"
      ref="password"
      class="login-input"
      v-model="user.UserPassword"
      :outer-errors="passwordErrors"
      @login="login"
      placeholder="请输入密码"
    >
      <el-button type="text" @click="toForgotPassword">忘记密码</el-button>
    </login-input>
    <login-button class="login-btn" :name="btnName" @btn-click="login" :disabled="btnDisabled"></login-button>
    <div class="prompt-info">没有帐号？免费
      <el-button type="text" @click="toRegister">注册</el-button>
    </div>
  </div>
</template>
<script>
import LoginInput from './LoginInput'
import LoginButton from './LoginButton'

const phoneOrEmailRE = /^(?:13\d|15[89])-?\d{5}(\d{3}|\*{3})|(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/
export default {
    name: 'Login',
    data () {
        return {
            btnName: '登录',
            btnDisabled: false,
            user: {
                UserName: '',
                UserPassword: ''
            },
            usernameErrors: [],
            passwordErrors: [],
            validators: {
                username: [
                    {
                        name: '手机号或邮箱',
                        pattern: phoneOrEmailRE,
                        msg: '用户名须为手机号或邮箱'
                    }
                ]
            }
        }
    },
    methods: {
        login () {
            this.$store.dispatch('login', this.user)
        },
        toForgotPassword () {
            this.$router.push({ name: 'forgot-password' })
        },
        toRegister () {
            this.$router.push({ name: 'register-step1' })
        }
    },
    created () {
        document.title = '登录-百展客配置服务开发云'
        if (this.$store.getters.isLogin) {
            this.$router.push('/intraduce')
        }
    },
    components: {
        'login-input': LoginInput,
        'login-button': LoginButton
    }
}
</script>
<style lang="scss" scoped>
.login {
    width: 30%;
    align-self: center;
    .login-input,
    .login-btn {
        margin-top: 15px;
    }

    .el-button {
        font-size: 17px;
    }
    .prompt-info {
        margin-top: 20px;
        color: #8fa1b2;
    }
}
</style>

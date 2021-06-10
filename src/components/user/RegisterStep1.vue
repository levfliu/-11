<template>
  <div class="register-step1" id="register-step1">
    <header>
      <h1>欢迎注册腾宣威</h1>
      <div class="flow"></div>
    </header>
    <login-input class="login-input" :validators="validators.username" v-model="user.username" placeholder="请输入手机号/邮箱">
    </login-input>
    <login-input class="login-input" v-model="user.captcha" placeholder="请输入验证码">
            <span class="captcha">
                <img :src="src">
            </span>
    </login-input>
    <div class="">您是否同意接受
      <el-button type="text" @click="showTermsOfUse">《腾宣威使用条款》</el-button>
    </div>
    <login-button class="login-btn" name="同意,下一步" @btn-click="nextStep"></login-button>
    <div class="prompt-info">
      已有帐号？直接
      <el-button type="text" @click="toLogin">登录</el-button>
    </div>
  </div>
</template>
<script>
import LoginInput from './LoginInput'
import LoginButton from './LoginButton'

const phoneOrEmailRE = /^(?:13\d|15[89])-?\d{5}(\d{3}|\*{3})|(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/
export default {
    name: 'Register',
    data () {
        return {
            user: {
                username: '',
                captcha: ''
            },
            src: '',
            validators: {
                username: [{
                    name: '手机号或邮箱',
                    pattern: phoneOrEmailRE,
                    msg: '用户名须为手机号或邮箱'
                }]
            }
        }
    },
    methods: {
        nextStep () {
            this.$router.push({name: 'register-step2'})
        },
        toLogin () {
            this.$router.push({name: 'login'})
        },
        showTermsOfUse () {
            window.location.href = 'https://wwww.google.com'
        }
    },
    created () {
        document.title = '注册第一步'
    },
    components: {
        'login-input': LoginInput,
        'login-button': LoginButton
    }
}
</script>
<style lang="scss" scoped>
  .register-step1 {

    .flow {
      height: 43px;
      margin: 30px 0;
      background: url(./assets/images/re1.png) center no-repeat
    }

    .login-input,
    .login-btn {
      margin-top: 5px;
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

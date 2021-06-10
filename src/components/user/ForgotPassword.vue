<template>
  <div class="forgot-password" id="forgot-password">
    <header>
      <h1>找回密码</h1>
    </header>
    <login-input
      class="login-input"
      :validators="validators.username"
      v-model="user.username"
      placeholder="请输入您的帐号(手机号/邮箱)"
    >
      <el-button type="text" @click="getCaptcha">获取验证码</el-button>
    </login-input>
    <login-input class="login-input" v-model="user.captcha" placeholder="请输入您收到的验证码"></login-input>
    <div class="helper">如果长时间没有收到验证码, 请
      <el-button type="text" @click="showHelp">查看帮助</el-button>
    </div>
    <login-button class="login-btn" name="验证身份" @btn-click="checkUser"></login-button>
    <div class="prompt-info">想起密码
      <el-button type="text" @click="toLogin">直接登录</el-button>没有帐号?
      <el-button type="text" @click="toRegister">免费注册</el-button>
    </div>
  </div>
</template>
<script>
import LoginInput from './LoginInput'
import LoginButton from './LoginButton'
import { getLogger } from '@/util/logger'
const logger = getLogger('ForgotPassword.vue')

const phoneOrEmailRE = /^(?:13\d|15[89])-?\d{5}(\d{3}|\*{3})|(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/
export default {
    name: 'ForgotPassword',
    data () {
        return {
            user: {
                username: '',
                captcha: ''
            },
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
        toLogin () {
            this.$router.push({ name: 'login' })
        },
        toRegister () {
            this.$router.push({ name: 'register-step1' })
        },
        getCaptcha () {
            logger.debug('获取验证码')
        },
        checkUser () {
            logger.debug('验证身份')
        },
        showHelp () {
            window.location.href = 'https://wwww.google.com'
        }
    },
    created () {
        document.title = '忘记密码-百展客配置服务开发云'
    },
    components: {
        'login-input': LoginInput,
        'login-button': LoginButton
    }
}
</script>
<style lang="scss" scoped>
.forgot-password {
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

  .helper {
    color: #8fa1b2;
  }
}
</style>

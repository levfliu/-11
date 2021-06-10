<template>
  <div class="register-step2" id="register-step2">
    <header>
      <h1>欢迎注册腾宣威</h1>
      <div class="flow"></div>
    </header>
    <div>我们已向您的手机
      <span class="phonenumber">{{phoneName}}</span>发送了一条验证短信
    </div>
    <login-input class="login-input" v-model="user.captcha" placeholder="请输入您收到的验证码">
      <el-button type="text" @click="reObtain">重新获取验证码</el-button>
    </login-input>
    <div class="helper">如果长时间没有收到验证码, 请
      <el-button type="text" @click="showHelp">查看帮助</el-button>
    </div>
    <login-button class="login-btn" name="下一步" @btn-click="nextStep"></login-button>
    <div class="prompt-info">
      <el-button type="text" @click="toPrevStep">回到上一步</el-button>已有帐号？直接
      <el-button type="text" @click="toLogin">登录</el-button>
    </div>
  </div>
</template>
<script>
import LoginInput from './LoginInput'
import LoginButton from './LoginButton'

export default {
    name: 'RegisterStep2',
    data () {
        return {
            phoneName: 13721080281,
            user: {
                captcha: ''
            }
        }
    },
    methods: {
        toLogin () {
            this.$router.push({ name: 'login' })
        },
        toPrevStep () {
            this.$router.push({ name: 'register-step1' })
        },
        nextStep () {
            this.$router.push({ name: 'register-step3' })
            this.$router.push({ name: 'account-exisit' })
        },
        reObtain () {

        },
        showHelp () {
            window.location.href = 'https://wwww.google.com'
        }
    },
    created () {
        document.title = '注册第二步-百展客配置服务开发云'
    },
    components: {
        'login-input': LoginInput,
        'login-button': LoginButton
    }
}
</script>
<style lang="scss" scoped>
.register-step2 {
  .flow {
    height: 43px;
    margin: 30px 0;
    background: url(./assets/images/re2.png) center no-repeat;
  }

  .login-input,
  .login-btn {
    margin-top: 5px;
  }

  .phonenumber {
    color: #228fc5;
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

<template>
  <div class="account-exisit" id="account-exisit">
    <header>
      <h1>帐号已存在</h1>
    </header>
    <div class="account-info">
      <h3>{{user.name}}</h3>
      <p>已经是腾宣威用户并属于以下公司, 是否要直接登录?</p>
      <h3>{{user.company}}</h3>
    </div>
    <login-button class="login-btn" name="直接登录" @btn-click="toLogin"></login-button>
    <div class="prompt-info">不, 我要
      <el-button type="text" @click="toCreateCompany">创建新公司</el-button>
    </div>
  </div>
</template>
<script>
import LoginButton from './LoginButton.vue'
import { getLogger } from '@/util/logger'
const logger = getLogger('ForgotPassword.vue')

export default {
    name: 'AccountExisit',
    data () {
        return {
            user: {
                name: 'gj',
                company: 'tenswin'
            }
        }
    },
    methods: {
        toLogin () {
            this.$router.push({ name: 'login' })
        },
        toCreateCompany () {
            logger.debug('toCreateCompany...')
        }
    },
    created () {
        document.title = '帐号已存在-百展客配置服务开发云'
    },
    components: {
        'login-button': LoginButton
    }
}
</script>
<style lang="scss" scoped>
.account-exisit {
  .account-info {
    margin-top: 10px;
    h3 {
      color: #00aaef;
    }
  }

  .login-btn {
    margin-top: 10px;
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

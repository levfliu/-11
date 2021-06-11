// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './util/router'
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'
import ElementUI from 'element-ui'
import store from './util/store'
import '../static/css/element-variables.scss'
import VueClipboard from 'vue-clipboard2'
import 'ant-design-vue/dist/antd.css'
import Antd from 'ant-design-vue'

import "animate.css";

// 设置语言
locale.use(lang)

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueClipboard)
Vue.use(Antd)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})

import Login from './Login.vue'
import RegisterStep1 from './RegisterStep1.vue'
import RegisterStep2 from './RegisterStep2.vue'
import RegisterStep3 from './RegisterStep3.vue'
import ForgotPassword from './ForgotPassword.vue'
import AccountExisit from './AccountExisit.vue'

const router = [
    {
        name: 'login',
        path: '/login',
        component: Login
    }, {
        name: 'register-step1',
        path: '/register-step1',
        component: RegisterStep1
    }, {
        name: 'register-step2',
        path: '/register-step2',
        component: RegisterStep2
    }, {
        name: 'register-step3',
        path: '/register-step3',
        component: RegisterStep3
    }, {
        name: 'forgot-password',
        path: '/forgot-password',
        component: ForgotPassword
    }, {
        name: 'account-exisit',
        path: '/account-exisit',
        component: AccountExisit
    }, {
        path: '',
        redirect: 'login'
    }]
export { router }

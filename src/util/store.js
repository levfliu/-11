import vue from 'vue'
import vuex from 'vuex'
import * as userStore from '../components/user/store'
import * as systemStore from '../components/system/store'
import * as serviceStore from '../components/service/store'
import * as formStore from '../components/form/store'
import * as triggerStore from '../components/trigger/store'
import * as viewStore from '../components/view/store'
import * as appStore from '../components/application/store'

vue.use(vuex)

export default new vuex.Store({
    modules: {
        user: userStore,
        system: systemStore,
        service: serviceStore,
        form: formStore,
        trigger: triggerStore,
        view: viewStore,
        app: appStore
    }
})

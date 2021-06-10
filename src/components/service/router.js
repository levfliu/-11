import intraduce from './intraduce.vue'
import overview from './overview.vue'
import service from './service.vue'

const router = [
    {
        name: 'intraduce',
        path: '/intraduce',
        component: intraduce
    }, {
        name: 'overview',
        path: '/console/overview',
        component: overview
    }, {
        name: 'service',
        path: '/service',
        component: service
    }]
export { router }

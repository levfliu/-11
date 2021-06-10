import view from './view.vue'
import viewShow from "./viewShow.vue"

const router = [
    {
        name: 'view',
        path: '/view/:id',
        component: view
    },
    {
        name: "viewShow",
        path:"/viewShow",
        component: viewShow
    }
]
export { router }

import formEdit from './formEdit.vue'

const router = [
    {
        name: 'formEdit',
        path: '/form/:formId/edit',
        component: formEdit
    }, {
        name: 'formAdd',
        path: '/form/:formId/add',
        component: formEdit
    }, {
        name: 'form',
        path: '/form/:formId/',
        component: formEdit
    }]
export { router }

import Vue from 'vue'
import Router from 'vue-router'
import mainView from '@/views/index'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'mainView',
        component: mainView
    }]
})
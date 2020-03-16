import Vue from 'vue'
import vuex from 'vuex'

/* 引入各部分组件 */
// import home from '@/store/modules/home'
import auth from '@/store/modules/auth'
/* End 引入各部分组件 */

Vue.use(vuex)

export default new vuex.Store({
  modules: {
    auth
  }
})

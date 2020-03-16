import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
//import ElementUI from 'element-ui'
//import 'element-ui/lib/theme-chalk/index.css'

import './icons';

import AMap from 'vue-amap';
Vue.use(AMap);

// 初始化vue-amap
AMap.initAMapApiLoader({
    // 高德key
    key: '6c942c4e3366e9ae67cab8658dc98bcf',
    // 插件集合 （插件按需引入）
    plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor', 'AMap.Geolocation']
});

// 注册全局组件
import registerComponents from './utils/registerComponents';

//Vue.use(ElementUI)

Vue.use(registerComponents);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
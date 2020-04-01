import Vue from "vue";
import App from "./App";
import router from "@/router";
import store from "@/store";

import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
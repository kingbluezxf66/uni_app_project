import App from './App'
import Vue from 'vue'
import store from './store'
Vue.config.productionTip = false
App.mpType = 'app'

import uView from '@/uni_modules/uview-ui'
Vue.use(uView)

Vue.prototype.$store = store

const app = new Vue({
	store,
	...App
})

// 引入请求封装，将app参数传递到配置中
require('config/request.js')(app);


app.$mount()

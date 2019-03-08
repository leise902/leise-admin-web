// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'

import IView from 'iview'
import config from '@/config'
import { router } from './router/index'
// import { accessRouters } from './router/router'
import store from './store/index'
import './index.less'

require('@/mock/mock')

Vue.use(IView)
Vue.config.productionTip = false

/**
 * @description 全局注册应用配置
 */
Vue.prototype.$config = config

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  store: store,
  render: h => h(App)
})

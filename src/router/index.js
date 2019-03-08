import Vue from 'vue'
import VueRouter from 'vue-router'
import { accessRouters } from './router'
import util from '@/libs/util'
import IView from 'iview'
import store from '@/store/index'

Vue.use(VueRouter)

const routersConfig = {
  mode: 'history',
  routes: accessRouters
}

export const router = new VueRouter(routersConfig)

router.beforeEach((to, from, next) => {
  // iview的进度条效果开始
  IView.LoadingBar.start()
  // 设置页面标签的标题
  util.title(to.meta.title)

  // 不重定向列表
  let notRedirectRouterList = ['login']

  // 判断是否有token, 意味着已经登录过
  if (store.getters.token) {
    // 判断跳转路径是否是登录页面
    if (to.name === 'login') {
      next({ name: 'home_index' })
    } else {
      if (store.getters.permissionRouters.length === 0) {
        let userId = store.getters.userId
        store
          .dispatch('GenPermissionRouters', userId)
          .then(() => {
            router.addRoutes(store.getters.permissionRouters) // 动态添加可访问路由表
            next({ ...to, replace: true }) // hack方法 确保addRoutes已完成
          })
          .catch(error => {
            console.log(error)
            console.log('加载菜单失败')
            store.dispatch('clearLoginInfo').then(() => {
              next({ name: 'login' })
            })
          })
      } else {
        next()
      }
    }
  } else {
    if (notRedirectRouterList.indexOf(to.name) !== -1) {
      next()
    } else {
      next({ name: 'login' })
    }
  }
})

router.afterEach(to => {
  util.openNewPage(router.app, to.name, to.params, to.query)
  // iview的进度条效果结束
  IView.LoadingBar.finish()
  // 回到顶部
  window.scrollTo(0, 0)
})

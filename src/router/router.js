import main from '@/views/main/main.vue'

// 不作为main组件的子页面展示的页面单独写，如下
export const loginRoute = {
  path: '/login',
  name: 'login',
  meta: {
    title: 'login-登录'
  },
  component: () => import('@/views/login/login.vue')
}

export const error403Route = {
  path: '/403',
  name: '403',
  meta: {
    title: '403-出错啦'
  },
  component: () => import('@/views/error/403.vue')
}

export const navigationRouter = {
  path: '/',
  name: 'navigationRouter',
  redirect: '/home',
  component: main,
  children: [
    { path: 'home', title: '首页', name: 'home_index', component: () => import('@/views/home/Home.vue') },
    { path: '/flow/viewFlowBizlogic/:flowInfoId', title: '查看流程图', name: 'viewFlowBizlogic_index', component: () => import('@/views/flow/ViewFlowBizlogic.vue') },
    { path: '/flow/designFlowBizlogic/:flowInfoId', title: '设计流程图', name: 'designFlowBizlogic_index', component: () => import('@/views/flow/DesignFlowBizlogic.vue') },
    { path: '/flow/viewFlowVersionBizlogic/:version', title: '查看历史版本流程图', name: 'viewFlowVersionBizlogic_index', component: () => import('@/views/flow/ViewFlowVersionBizlogic.vue') }
    // { path: 'ownspace', title: '个人中心', name: 'ownspace_index', component: () => import('@/views/own-space/own-space.vue') },
    // { path: 'order/:order_id', title: '订单详情', name: 'order-info', component: () => import('@/views/advanced-router/component/order-info.vue') }, // 用于展示动态路由
    // { path: 'shopping', title: '购物详情', name: 'shopping', component: () => import('@/views/advanced-router/component/shopping-info.vue') }, // 用于展示带参路由
    // { path: 'message', title: '消息中心', name: 'message_index', component: () => import('@/views/message/message.vue') }
  ]
}

// 作为main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const appRouter = [
  {
    path: '/access',
    icon: 'key',
    name: 'access',
    title: '权限管理',
    component: main,
    children: [
      { path: 'index', title: '权限管理', name: 'access_index', component: () => import('@/views/home/Home.vue')
      }]
  },
  {
    path: '/access-test',
    icon: 'lock-combination',
    title: '权限测试页',
    name: 'accesstest',
    access: 1,
    component: main,
    children: [
      { path: 'index', title: '权限测试页', name: 'accesstest_index', access: 1, component: () => import('@/views/home/Home.vue')
      }]
  }
]

export const accessRouters = [
  loginRoute,
  error403Route,
  navigationRouter
]

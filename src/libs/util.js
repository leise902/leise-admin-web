let util = {}

util.title = function(title) {
  title = title || 'leise admin'
  window.document.title = title
}

util.oneOf = function(ele, targetArr) {
  if (targetArr.indexOf(ele) >= 0) {
    return true
  } else {
    return false
  }
}

util.showThisRoute = function(itAccess, currentAccess) {
  if (typeof itAccess === 'object' && Array.isArray(itAccess)) {
    return util.oneOf(currentAccess, itAccess)
  } else {
    return itAccess === currentAccess
  }
}

util.setCurrentPath = function(vm, name) {
  let title = ''
  let isNavigationRouter = false
  vm.$store.getters.permissionRouters.forEach(item => {
    if (item.children.length === 1) {
      if (item.children[0].name === name) {
        title = util.handleTitle(vm, item)
        if (item.name === 'navigationRouter') {
          isNavigationRouter = true
        }
      }
    } else {
      item.children.forEach(child => {
        if (child.name === name) {
          title = util.handleTitle(vm, child)
          if (item.name === 'navigationRouter') {
            isNavigationRouter = true
          }
        }
      })
    }
  })
  let currentPathArr = []
  if (name === 'home_index') {
    currentPathArr = [
      {
        title: '首页',
        path: '',
        name: 'home_index'
      }
    ]
  } else if (
    (name.indexOf('_index') >= 0 || isNavigationRouter) &&
    name !== 'home_index'
  ) {
    currentPathArr = [
      {
        title: '首页',
        path: '/home',
        name: 'home_index'
      },
      {
        title: title,
        path: '',
        name: name
      }
    ]
  } else {
    let currentPathObj = vm.$store.getters.permissionRouters.filter(item => {
      if (item.children.length <= 1) {
        return item.children[0].name === name
      } else {
        let i = 0
        let childArr = item.children
        let len = childArr.length
        while (i < len) {
          if (childArr[i].name === name) {
            return true
          }
          i++
        }
        return false
      }
    })[0]
    if (currentPathObj.children.length <= 1 && currentPathObj.name === 'home') {
      currentPathArr = [
        {
          title: '首页',
          path: '',
          name: 'home_index'
        }
      ]
    } else if (
      currentPathObj.children.length <= 1 &&
      currentPathObj.name !== 'home'
    ) {
      currentPathArr = [
        {
          title: '首页',
          path: '/home',
          name: 'home_index'
        },
        {
          title: currentPathObj.title,
          path: '',
          name: name
        }
      ]
    } else {
      let childObj = currentPathObj.children.filter(child => {
        return child.name === name
      })[0]
      currentPathArr = [
        {
          title: '首页',
          path: '/home',
          name: 'home_index'
        },
        {
          title: currentPathObj.title,
          path: '',
          name: currentPathObj.name
        },
        {
          title: childObj.title,
          path: currentPathObj.path + '/' + childObj.path,
          name: name
        }
      ]
    }
  }
  vm.$store.commit('SET_CURRENT_PATH', currentPathArr)

  return currentPathArr
}

util.getRouterObjByName = function(routers, name) {
  if (!name || !routers || !routers.length) {
    return null
  }
  // debugger;
  let routerObj = null
  for (let item of routers) {
    if (item.name === name) {
      return item
    }
    routerObj = util.getRouterObjByName(item.children, name)
    if (routerObj) {
      return routerObj
    }
  }
  return null
}

util.handleTitle = function(vm, item) {
  return item.title
}

util.formatRouters = function(routers) {
  let formatRoutes = []
  routers.forEach(router => {
    let { path, component, name, icon, title, meta, children } = router
    if (children && children instanceof Array) {
      children = this.formatRouters(children)
    }
    let formatRoute = {
      path: path,
      component(resolve) {
        require(['../views' + component + '.vue'], resolve)
      },
      name: name,
      icon: icon,
      title: title,
      meta: meta,
      children: children
    }

    formatRoutes.push(formatRoute)
  })
  return formatRoutes
}

util.openNewPage = function(vm, name, argu, query) {
  let pageOpenedList = vm.$store.getters.pageOpenedList
  let openedPageLen = pageOpenedList.length
  let i = 0
  let tagHasOpened = false
  while (i < openedPageLen) {
    if (name === pageOpenedList[i].name) {
      // 页面已经打开
      vm.$store.commit('PAGED_OPEN_LIST', {
        index: i,
        argu: argu,
        query: query
      })
      tagHasOpened = true
      break
    }
    i++
  }
  if (!tagHasOpened) {
    let tag = vm.$store.getters.tagsList.filter(item => {
      if (item.children && item.children.length > 0) {
        return name === item.children[0].name
      } else {
        return name === item.name
      }
    })
    tag = tag[0]
    if (tag) {
      tag = tag.children ? tag.children[0] : tag
      if (argu) {
        tag.argu = argu
      }
      if (query) {
        tag.query = query
      }
      vm.$store.commit('CREATE_TAG', tag)
    }
  }
  vm.$store.commit('SET_CURRENT_PAGENAME', name)
}

/**
 * 权鉴
 * @param {*} name 即将跳转的路由name
 * @param {*} access 用户权限数组
 * @param {*} routes 路由列表
 * @description 用户是否可跳转到该页
 */
util.canTurnTo = (name, access, routes) => {
  const routePermissionJudge = list => {
    return list.some(item => {
      if (item.children && item.children.length) {
        return routePermissionJudge(item.children)
      } else if (item.name === name) {
        return hasAccess(access, item)
      }
    })
  }

  return routePermissionJudge(routes)
}

export default util

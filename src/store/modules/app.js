import util from '@/libs/util'
import { accessRouters, navigationRouter } from '@/router/router'
import { getMenuList } from '@/api/sysmanage'

const app = {
  state: {
    cachePage: [],
    lang: '',
    isFullScreen: false,
    openedSubmenuArr: [], // 要展开的菜单数组
    menuTheme: 'dark', // 主题
    themeColor: '',
    pageOpenedList: [
      {
        title: '首页',
        path: '',
        name: 'home_index'
      }
    ],
    currentPageName: '',
    currentPath: [
      {
        title: '首页',
        path: '',
        name: 'home_index'
      }
    ], // 面包屑数组
    menuList: [],
    routers: [accessRouters],
    permissionRouters: [],
    tagsList: [...navigationRouter.children],
    messageCount: 0,
    dontCache: ['text-editor', 'artical-publish'] // 在这里定义你不想要缓存的页面的name属性值(参见路由配置router.js)
  },
  mutations: {
    // TODO
    SET_PERMISSION_ROUTERS: (state, permissionRouters) => {
      state.permissionRouters = permissionRouters
    },

    SET_MENU_LIST (state) {
      let accessCode = 1
      let menuList = []
      state.permissionRouters.forEach((item, index) => {
        if (item.access !== undefined) {
          if (util.showThisRoute(item.access, accessCode)) {
            if (item.children.length === 1) {
              menuList.push(item)
            } else {
              let len = menuList.push(item)
              let childrenArr = []
              childrenArr = item.children.filter(child => {
                if (child.access !== undefined) {
                  if (child.access === accessCode) {
                    return child
                  }
                } else {
                  return child
                }
              })
              menuList[len - 1].children = childrenArr
            }
          }
        } else {
          if (item.children.length === 1) {
            menuList.push(item)
          } else {
            let len = menuList.push(item)
            let childrenArr = []
            childrenArr = item.children.filter(child => {
              if (child.access !== undefined) {
                if (util.showThisRoute(child.access, accessCode)) {
                  return child
                }
              } else {
                return child
              }
            })
            if (childrenArr === undefined || childrenArr.length === 0) {
              menuList.splice(len - 1, 1)
            } else {
              let handledItem = JSON.parse(JSON.stringify(menuList[len - 1]))
              handledItem.children = childrenArr
              menuList.splice(len - 1, 1, handledItem)
            }
          }
        }
      })
      state.menuList = menuList
    },

    SET_CURRENT_PATH (state, pathArr) {
      state.currentPath = pathArr
    },

    SET_CURRENT_PAGENAME (state, name) {
      state.currentPageName = name
    },

    ADD_OPEN_SUBMENU (state, name) {
      let hasThisName = false
      let isEmpty = false
      if (name.length === 0) {
        isEmpty = true
      }
      if (state.openedSubmenuArr.indexOf(name) > -1) {
        hasThisName = true
      }
      if (!hasThisName && !isEmpty) {
        state.openedSubmenuArr.push(name)
      }
    },

    PAGED_OPEN_LIST (state, get) {
      let openedPage = state.pageOpenedList[get.index]
      if (get.argu) {
        openedPage.argu = get.argu
      }
      if (get.query) {
        openedPage.query = get.query
      }
      state.pageOpenedList.splice(get.index, 1, openedPage)
      window.sessionStorage.pageOpenedList = JSON.stringify(state.pageOpenedList)
    },

    CREATE_TAG (state, tagObj) {
      if (!util.oneOf(tagObj.name, state.dontCache)) {
        state.cachePage.push(tagObj)
        window.sessionStorage.cachePage = JSON.stringify(state.cachePage)
      }
      state.pageOpenedList.push(tagObj)
      window.sessionStorage.pageOpenedList = JSON.stringify(state.pageOpenedList)
    },

    SET_TAGS_LIST (state, routers) {
      let tagsList = []
      routers.map(item => {
        if (item.children.length <= 1) {
          tagsList.push(item.children[0])
        } else {
          tagsList.push(...item.children)
        }
      })
      state.tagsList.push(...tagsList)
    },

    REMOVE_TAG (state, name) {
      state.pageOpenedList.map((item, index) => {
        if (item.name === name) {
          state.pageOpenedList.splice(index, 1)
        }
      })
    },

    CLOSE_PAGE (state, name) {
      state.cachePage.forEach((item, index) => {
        if (item === name) {
          state.cachePage.splice(index, 1)
        }
      })
    },

    CLEAR_ALL_TAGS (state) {
      state.pageOpenedList.splice(1)
      state.cachePage.length = 0
      sessionStorage.pageOpenedList = JSON.stringify(state.pageOpenedList)
    },

    CLEAR_OTHER_TAGS (state, vm) {
      let currentName = vm.$route.name
      let currentIndex = 0
      state.pageOpenedList.forEach((item, index) => {
        if (item.name === currentName) {
          currentIndex = index
        }
      })
      if (currentIndex === 0) {
        state.pageOpenedList.splice(1)
      } else {
        state.pageOpenedList.splice(currentIndex + 1)
        state.pageOpenedList.splice(1, currentIndex - 1)
      }
      let newCachepage = state.cachePage.filter(item => {
        return item === currentName
      })
      state.cachePage = newCachepage
      sessionStorage.pageOpenedList = JSON.stringify(state.pageOpenedList)
    }
  },

  actions: {
    GenPermissionRouters ({ commit }, userId) {
      return new Promise((resolve, reject) => {
        getMenuList(userId)
          .then(response => {
            console.log('动态加载菜单开始...')
            let responseData = response.data
            const formatRouters = util.formatRouters(responseData.list)
            commit('SET_PERMISSION_ROUTERS', formatRouters)
            commit('SET_TAGS_LIST', formatRouters)
            console.log('动态加载菜单结束...')
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  }
}

export default app

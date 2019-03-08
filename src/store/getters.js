const getters = {
  // user
  token: state => state.user.token,
  userId: state => state.user.userId,
  userName: state => state.user.userName,
  roles: state => state.user.roles,

  // app
  routers: state => state.app.routers,
  permissionRouters: state => state.app.permissionRouters,
  menuList: state => state.app.menuList,
  currentPath: state => state.app.currentPath,
  pageOpenedList: state => state.app.pageOpenedList,
  tagsList: state => state.app.tagsList,
  currentPageName: state => state.app.currentPageName,
  openedSubmenuArr: state => state.app.openedSubmenuArr

  // sidebar: state => state.app.sidebar,
  // language: state => state.app.language,
  // visitedViews: state => state.tagsView.visitedViews,
  // cachedViews: state => state.tagsView.cachedViews,
  // avatar: state => state.user.avatar,
  // name: state => state.user.name,
  // introduction: state => state.user.introduction,
  // status: state => state.user.status,
  // roles: state => state.user.roles,
  // setting: state => state.user.setting,
  // permission_routers: state => state.permission.routers,
  // addRouters: state => state.permission.addRouters,
  // errorLogs: state => state.errorLog.logs
}
export default getters

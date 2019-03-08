// import cookies from 'js-cookie'
import { loginByUserId } from '@/api/login'

const user = {
  state: {
    userId: sessionStorage.getItem('UserId'),
    userName: sessionStorage.getItem('UserName'),
    token: sessionStorage.getItem('Token'),
    roles: sessionStorage.getItem('Roles')
  },
  mutations: {
    SET_USERID: (state, userId) => {
      state.userId = userId
      sessionStorage.setItem('UserId', userId)
    },

    SET_USERNAME: (state, userName) => {
      state.userName = userName
      sessionStorage.setItem('UserName', userName)
    },

    SET_TOKEN: (state, token) => {
      state.token = token
      sessionStorage.setItem('Token', token)
    },

    SET_ROLES: (state, roles) => {
      state.roles = roles
      sessionStorage.setItem('Roles', roles)
    },

    CLEAR_LOGIN_INFO: (state, data) => {
      sessionStorage.clear()
      state.userId = ''
      state.userName = ''
      state.token = ''
      state.roles = []
    }

    // logout(state, vm) {
    //     cookies.remove('user')
    //     cookies.remove('password')
    //     cookies.remove('access')
    //     // 恢复默认样式
    //     let themeLink = document.querySelector('link[name="theme"]')
    //     themeLink.setAttribute('href', '')
    //     // 清空打开的页面等数据，但是保存主题数据
    //     let theme = ''
    //     if (localStorage.theme) {
    //         theme = localStorage.theme
    //     }
    //     localStorage.clear()
    //     if (theme) {
    //         localStorage.theme = theme
    //     }
    // }
  },
  actions: {
    handleLogin ({ commit }, { userId, password }) {
      return new Promise((resolve, reject) => {
        loginByUserId(userId, password)
          .then(response => {
            const responseData = response.data
            commit('SET_USERID', responseData.userId)
            commit('SET_USERNAME', responseData.userName)
            commit('SET_TOKEN', responseData.token)
            commit('SET_ROLES', responseData.roles)
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    clearLoginInfo ({ commit }) {
      commit('SET_USERID', '')
      commit('SET_USERNAME', '')
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      window.sessionStorage.clear()
    }
  }
}

export default user

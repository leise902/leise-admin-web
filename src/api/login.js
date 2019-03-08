import http from '@/libs/http'

export function loginByUserId (userId, password) {
  const data = {
    data: {
      userId: userId,
      password: password
    }
  }

  return http({
    url: '/login/1.0.0',
    method: 'post',
    data
  })
}

export function getMenuList(userId) {
  const data = {
    data: {
      userId: userId
    }
  }

  return http({
    url: '/queryMenuList/1.0.0',
    method: 'post',
    data
  })
}

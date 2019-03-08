import http from '@/libs/http'

export function getMenuList (userId) {
  const data = {
    data: {
      'userId': userId
    }
  }

  return http({
    url: '/queryMenuList/1.0.0',
    method: 'post',
    data
  })
}

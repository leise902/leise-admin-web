import http from '@/libs/http'

export function queryRoleList (data) {

  return http({
    url: '/queryRoleList',
    method: 'post',
    data
  })
}

export function queryRoleDetail (data) {

  return http({
    url: '/queryRoleDetail',
    method: 'post',
    data
  })
}

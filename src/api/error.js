import http from '@/libs/http'

export function queryErrorList (data) {
  return http({
    url: '/queryErrorList',
    method: 'post',
    data
  })
}

export function queryErrorDetail (data) {
  return http({
    url: '/queryErrorDetail',
    method: 'post',
    data
  })
}

import http from '@/libs/http'

export function queryDictList(data) {

  return http({
    url: '/queryDictList',
    method: 'post',
    data
  })
}

export function queryDictDetail(data) {

  return http({
    url: '/queryDictDetail',
    method: 'post',
    data
  })
}

import http from '@/libs/http'

export function queryArgsList (queryData) {
  const data = {
    data: queryData
  }

  return http({
    url: '/queryRuleArgsList/1.0.0',
    method: 'post',
    data
  })
}

export function queryArgsDetail (data) {
  return http({
    url: '/queryArgsDetail',
    method: 'post',
    data
  })
}

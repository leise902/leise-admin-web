import http from '@/libs/http'

export function queryRuleList(queryData) {
  let data = {
    data: queryData
  }
  return http({
    url: '/queryRuleInfoList/1.0.0',
    method: 'post',
    data
  })
}

export function queryRuleDetail(data) {

  return http({
    url: '/queryRuleDetail',
    method: 'post',
    data
  })
}

export function addRule(operData) {

  let data = {
    data: operData
  }

  return http({
    url: '/addRuleInfo/1.0.0',
    method: 'post',
    data
  })
}

export function compileRule(operData) {

  let data = {
    data: operData
  }

  return http({
    url: '/compileRule/1.0.0',
    method: 'post',
    data
  })
}

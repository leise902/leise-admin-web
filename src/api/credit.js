import http from '@/libs/http'

export function queryCreditList(data) {

  return http({
    url: '/queryCreditList',
    method: 'post',
    data
  })
}

export function addCredit(data) {

  return http({
    url: '/addCredit',
    method: 'post',
    data
  })
}

export function editCredit(data) {

  return http({
    url: '/editCredit',
    method: 'post',
    data
  })
}

export function queryCreditDetail(data) {

  return http({
    url: '/queryCreditDetail',
    method: 'post',
    data
  })
}

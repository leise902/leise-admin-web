import http from '@/libs/http'

export function queryBranchList () {
  const data = {

  }

  return http({
    url: '/queryBranchList',
    method: 'post',
    data
  })
}

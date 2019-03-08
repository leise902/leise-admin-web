import http from '@/libs/http'

export function queryCorpList(queryData) {

  const data = {
    data: queryData
  }

  return http({
    url: '/queryCorpInfoList/1.0.0',
    method: 'post',
    data
  })
}

export function queryCorpInfo(queryData) {

  const data = {
    data: queryData
  }

  return http({
    url: '/queryCorpInfo/1.0.0',
    method: 'post',
    data
  })
}

export function addCorp(data) {

  return http({
    url: '/addCorp',
    method: 'post',
    data
  })
}

export function editCorp(data) {

  return http({
    url: '/editCorp',
    method: 'post',
    data
  })
}

export function queryCorpDetail(queryData) {

  const data = {
    data: queryData
  }

  return http({
    url: '/queryCorpDetail/1.0.0',
    method: 'post',
    data
  })
}

export function queryCorpInvestors(querytData) {
  const data = {
    data: querytData
  }

  return http({
    url: '/queryCorpInvestorList/1.0.0',
    method: 'post',
    data
  })
}

export function exportCorps(querytData) {
  const data = {
    data: querytData
  }

  return http({
    url: '/export/exportFileService/1.0.0',
    method: 'post',
    data,
    responseType: 'blob'
  })
}

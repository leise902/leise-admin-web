import http from '@/libs/http'

const API_URL = '/flow/designer'

export function getActions (params) {
  const data = params

  return http({
    url: `${API_URL}/getActions/`,
    method: 'post',
    data
  })
}

export function searchFlowInfoList (params) {
  const data = params
  return http({
    url: `${API_URL}/searchFlowInfoList/`,
    method: 'post',
    data
  })
}

export function addFlowInfo (params) {
  const data = params

  return http({
    url: `${API_URL}/addFlowInfo/`,
    method: 'post',
    data
  })
}

export function updateFlowModel (params) {
  const data = params

  return http({
    url: `${API_URL}/updateFlowModel/`,
    method: 'post',
    data
  })
}

export function findFlowModel (params) {
  const data = params

  return http({
    url: `${API_URL}/findFlowModel/`,
    method: 'post',
    data
  })
}

export function findFlowInfo (params) {
  const data = params
  return http({
    url: `${API_URL}/findFlowInfo/`,
    method: 'post',
    data
  })
}

export function queryFlowDataPage (params) {
  const data = params
  return http({
    url: `${API_URL}/queryFlowDataPage/`,
    method: 'post',
    data
  })
}

export function addFlowData (params) {
  const data = params
  return http({
    url: `${API_URL}/addFlowData/`,
    method: 'post',
    data
  })
}

export function modifyFlowData (params) {
  const data = params
  return http({
    url: `${API_URL}/modifyFlowData/`,
    method: 'post',
    data
  })
}

export function deleteFlowData (params) {
  const data = params
  return http({
    url: `${API_URL}/deleteFlowData/`,
    method: 'post',
    data
  })
}

export function clearFlowCache (params) {
  const data = params
  return http({
    url: `${API_URL}/clearFlowCache/`,
    method: 'post',
    data
  })
}

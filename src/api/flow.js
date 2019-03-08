import http from '@/libs/http'

const API_URL_PREFIX = '/flow/design'

export function queryFlowPage (params) {
  const data = params

  return http({
    url: `${API_URL_PREFIX}/queryFlowPage/1.0.0`,
    method: 'post',
    data
  })
}

export function queryFlowBaseInfo (params) {
  const data = params

  return http({
    url: `${API_URL_PREFIX}/queryFlowBaseInfo/1.0.0`,
    method: 'post',
    data
  })
}

export function queryFlowDataPage (params) {
  const data = params
  return http({
    url: `${API_URL_PREFIX}/queryFlowDataPage/1.0.0`,
    method: 'post',
    data
  })
}

export function queryFlowBizlogic (params) {
  const data = params
  return http({
    url: `${API_URL_PREFIX}/queryFlowBizlogic/1.0.0`,
    method: 'post',
    data
  })
}

export function addFlowInfo (params) {
  const data = params
  return http({
    url: `${API_URL_PREFIX}/addFlowInfo/1.0.0`,
    method: 'post',
    data
  })
}

export function modifyFlowBaseInfo (params) {
  const data = params
  return http({
    url: `${API_URL_PREFIX}/modifyFlowBaseInfo/1.0.0`,
    method: 'post',
    data
  })
}

export function deleteFlowInfo (params) {
  const data = params
  return http({
    url: `${API_URL_PREFIX}/deleteFlowInfo/1.0.0`,
    method: 'post',
    data
  })
}

export function deleteFlowData (params) {
  const data = params
  return http({
    url: `${API_URL_PREFIX}/deleteFlowData/1.0.0`,
    method: 'post',
    data
  })
}

export function saveFlowBizlogic (params) {
  const data = params
  return http({
    url: `${API_URL_PREFIX}/saveFlowBizlogic/1.0.0`,
    method: 'post',
    data
  })
}

export function saveFlowVersion (params) {
  const data = params
  return http({
    url: `${API_URL_PREFIX}/saveFlowVersion/1.0.0`,
    method: 'post',
    data
  })
}

export function cleanFlowCache (params) {
  const data = params
  return http({
    url: `${API_URL_PREFIX}/cleanFlowCache/1.0.0`,
    method: 'post',
    data
  })
}

export function queryFlowVersionPage (params) {
  const data = params
  return http({
    url: `${API_URL_PREFIX}/queryFlowVersionPage/1.0.0`,
    method: 'post',
    data
  })
}

export function batchSaveFlowVersion (params) {
  const data = params
  return http({
    url: `${API_URL_PREFIX}/batchSaveFlowVersion/1.0.0`,
    method: 'post',
    data
  })
}

export function queryFlowVersionDataList (params) {
  const data = params
  return http({
    url: `${API_URL_PREFIX}/queryFlowVersionDataList/1.0.0`,
    method: 'post',
    data
  })
}

export function queryFlowVersionBaseInfo (params) {
  const data = params

  return http({
    url: `${API_URL_PREFIX}/queryFlowVersionBaseInfo/1.0.0`,
    method: 'post',
    data
  })
}

export function queryFlowVersionBizlogic (params) {
  const data = params
  return http({
    url: `${API_URL_PREFIX}/queryFlowVersionBizlogic/1.0.0`,
    method: 'post',
    data
  })
}

export function batchSavePublishFlows (params) {
  const data = params
  return http({
    url: `${API_URL_PREFIX}/batchSavePublishFlows/1.0.0`,
    method: 'post',
    data
  })
}

export function queryPublishFlowPage (params) {
  const data = params
  return http({
    url: `${API_URL_PREFIX}/queryPublishFlowPage/1.0.0`,
    method: 'post',
    data
  })
}

export function queryFlowPublishEnvList (params) {
  const data = params
  return http({
    url: `${API_URL_PREFIX}/queryFlowPublishEnvList/1.0.0`,
    method: 'post',
    data
  })
}

export function addFlowPublishInfo (params) {
  const data = params
  return http({
    url: `${API_URL_PREFIX}/addFlowPublishInfo/1.0.0`,
    method: 'post',
    data
  })
}

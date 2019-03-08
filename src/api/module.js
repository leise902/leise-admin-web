import http from '@/libs/http'

export function queryModulePage (params) {
  const data = params
  return http({
    url: '/flow/design/queryModulePage/1.0.0',
    method: 'post',
    data
  })
}

export function addModuleInfo (params) {
  const data = params
  return http({
    url: '/flow/design/addModuleInfo/1.0.0',
    method: 'post',
    data
  })
}

export function queryModuleInfo (params) {
  const data = params
  return http({
    url: '/flow/design/queryModuleInfo/1.0.0',
    method: 'post',
    data
  })
}

export function deleteModuleInfo (params) {
  const data = params
  return http({
    url: '/flow/design/deleteModuleInfo/1.0.0',
    method: 'post',
    data
  })
}

export function queryModuleEnvPage (params) {
  const data = params
  return http({
    url: '/flow/design/queryModuleEnvPage/1.0.0',
    method: 'post',
    data
  })
}

export function addModuleEnv (params) {
  const data = params
  return http({
    url: '/flow/design/addModuleEnv/1.0.0',
    method: 'post',
    data
  })
}

export function modifyModuleEnv (params) {
  const data = params
  return http({
    url: '/flow/design/modifyModuleEnv/1.0.0',
    method: 'post',
    data
  })
}

export function deleteModuleEnv (params) {
  const data = params
  return http({
    url: '/flow/design/deleteModuleEnv/1.0.0',
    method: 'post',
    data
  })
}

export function queryModuleInfoList (params) {
  const data = params
  return http({
    url: '/flow/design/queryModuleInfoList/1.0.0',
    method: 'post',
    data
  })
}

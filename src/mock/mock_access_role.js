import Mock from 'mockjs'

var Random = Mock.Random

Mock.mock('/api/queryRoleList', {
  'consumer': 'litou-admin',
  'provider': 'litou-service',
  'requestId': '@guid',
  'serviceId': 'getMenuList',
  'requestTime': Random.datetime(),
  'responseTime': Random.datetime(),
  'cost': '123ms',
  'retCode': '0000',
  'retMsg': '交易成功',
  'data': {
    'page': {
      'totalCount': 21,
      'currentPage': 1,
      'pageSize': 10
    },
    'list': [{
      'roleId|999001-999999': 999002,
      'roleName': '@name',
      'createTime': Random.datetime(),
      'modifyTime': Random.datetime()
    }, {
      'roleId|999001-999999': 999002,
      'roleName': '@name',
      'createTime': Random.datetime(),
      'modifyTime': Random.datetime()
    }, {
      'roleId|999001-999999': 999002,
      'roleName': '@name',
      'createTime': Random.datetime(),
      'modifyTime': Random.datetime()
    }, {
      'roleId|999001-999999': 999002,
      'roleName': '@name',
      'createTime': Random.datetime(),
      'modifyTime': Random.datetime()
    }, {
      'roleId|999001-999999': 999002,
      'roleName': '@name',
      'createTime': Random.datetime(),
      'modifyTime': Random.datetime()
    }, {
      'roleId|999001-999999': 999002,
      'roleName': '@name',
      'createTime': Random.datetime(),
      'modifyTime': Random.datetime()
    }, {
      'roleId|999001-999999': 999002,
      'roleName': '@name',
      'createTime': Random.datetime(),
      'modifyTime': Random.datetime()
    }]
  }
})

Mock.mock('/api/queryRoleDetail', {
  'consumer': 'litou-admin',
  'provider': 'litou-service',
  'requestId': '@guid',
  'serviceId': 'queryRoleDetail',
  'requestTime': Random.datetime(),
  'responseTime': Random.datetime(),
  'cost': '123ms',
  'retCode': '0000',
  'retMsg': '交易成功',
  'data': {
    'roleId|999001-999999': 100002,
    'roleName': '@name',
    'description': '测试数据'
  }
})

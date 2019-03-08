import Mock from 'mockjs'

var Random = Mock.Random

// login
Mock.mock('/login/1.0.0', {
  consumer: 'litou-admin',
  provider: 'litou-service',
  requestId: '@guid',
  serviceId: 'login',
  requestTime: Random.datetime(),
  responseTime: Random.datetime(),
  cost: '123ms',
  retCode: '0000',
  retMsg: '交易成功',
  data: {
    'userId|100001-199999': 100002,
    userName: '@name',
    token: '@guid',
    'roles|+1': ['admin', 'oper', 'query', 'manager']
  }
})

Mock.mock('/api/queryUserList', {
  consumer: 'litou-admin',
  provider: 'litou-service',
  requestId: '@guid',
  serviceId: 'getMenuList',
  requestTime: Random.datetime(),
  responseTime: Random.datetime(),
  cost: '123ms',
  retCode: '0000',
  retMsg: '交易成功',
  data: {
    page: {
      totalCount: 21,
      currentPage: 1,
      pageSize: 10
    },
    list: [
      {
        'userId|100001-199999': 100002,
        userName: '@name',
        'roles|+1': ['admin', 'oper', 'query', 'manager'],
        'mobile|1811110000-18699999999': 1811110001
      },
      {
        'userId|100001-199999': 100002,
        userName: '@name',
        'roles|+1': ['admin', 'oper', 'query', 'manager'],
        'mobile|1811110000-18699999999': 1811110001
      },
      {
        'userId|100001-199999': 100002,
        userName: '@name',
        'roles|+1': ['admin', 'oper', 'query', 'manager'],
        'mobile|1811110000-18699999999': 1811110001
      },
      {
        'userId|100001-199999': 100002,
        userName: '@name',
        'roles|+1': ['admin', 'oper', 'query', 'manager'],
        'mobile|1811110000-18699999999': 1811110001
      },
      {
        'userId|100001-199999': 100002,
        userName: '@name',
        'roles|+1': ['admin', 'oper', 'query', 'manager'],
        'mobile|1811110000-18699999999': 1811110001
      },
      {
        'userId|100001-199999': 100002,
        userName: '@name',
        'roles|+1': ['admin', 'oper', 'query', 'manager'],
        'mobile|1811110000-18699999999': 1811110001
      },
      {
        'userId|100001-199999': 100002,
        userName: '@name',
        'roles|+1': ['admin', 'oper', 'query', 'manager'],
        'mobile|1811110000-18699999999': 1811110001
      },
      {
        'userId|100001-199999': 100002,
        userName: '@name',
        'roles|+1': ['admin', 'oper', 'query', 'manager'],
        'mobile|1811110000-18699999999': 1811110001
      },
      {
        'userId|100001-199999': 100002,
        userName: '@name',
        'roles|+1': ['admin', 'oper', 'query', 'manager'],
        'mobile|1811110000-18699999999': 1811110001
      },
      {
        'userId|100001-199999': 100002,
        userName: '@name',
        'roles|+1': ['admin', 'oper', 'query', 'manager'],
        'mobile|1811110000-18699999999': 1811110001
      }
    ]
  }
})

Mock.mock('/api/addUser', {
  consumer: 'litou-admin',
  provider: 'litou-service',
  requestId: '@guid',
  serviceId: 'addUser',
  requestTime: Random.datetime(),
  responseTime: Random.datetime(),
  cost: '123ms',
  retCode: '0000',
  retMsg: '交易成功',
  data: {
    'userId|100001-199999': 100002,
    userName: '@name',
    'roles|+1': ['admin', 'oper', 'query', 'manager']
  }
})

Mock.mock('/api/queryUserDetail', {
  consumer: 'litou-admin',
  provider: 'litou-service',
  requestId: '@guid',
  serviceId: 'queryUserDetail',
  requestTime: Random.datetime(),
  responseTime: Random.datetime(),
  cost: '123ms',
  retCode: '0000',
  retMsg: '交易成功',
  data: {
    'userId|100001-199999': 100002,
    userName: '@name',
    'roles|+1': ['admin', 'oper', 'query', 'manager']
  }
})

import Mock from 'mockjs'

var Random = Mock.Random

Mock.mock('/api/queryDictList', {
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
        'dictId|999001-999999': 999002,
        dictName: '@name',
        createTime: Random.datetime(),
        modifyTime: Random.datetime()
      },
      {
        'dictId|999001-999999': 999002,
        dictName: '@name',
        createTime: Random.datetime(),
        modifyTime: Random.datetime()
      },
      {
        'dictId|999001-999999': 999002,
        dictName: '@name',
        createTime: Random.datetime(),
        modifyTime: Random.datetime()
      },
      {
        'dictId|999001-999999': 999002,
        dictName: '@name',
        createTime: Random.datetime(),
        modifyTime: Random.datetime()
      },
      {
        'dictId|999001-999999': 999002,
        dictName: '@name',
        createTime: Random.datetime(),
        modifyTime: Random.datetime()
      },
      {
        'dictId|999001-999999': 999002,
        dictName: '@name',
        createTime: Random.datetime(),
        modifyTime: Random.datetime()
      },
      {
        'dictId|999001-999999': 999002,
        dictName: '@name',
        createTime: Random.datetime(),
        modifyTime: Random.datetime()
      }
    ]
  }
})

Mock.mock('/api/queryDictDetail', {
  consumer: 'litou-admin',
  provider: 'litou-service',
  requestId: '@guid',
  serviceId: 'queryDictDetail',
  requestTime: Random.datetime(),
  responseTime: Random.datetime(),
  cost: '123ms',
  retCode: '0000',
  retMsg: '交易成功',
  data: {
    'dictId|999001-999999': 100002,
    dictName: '@name',
    description: '测试数据'
  }
})

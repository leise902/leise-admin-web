import Mock from 'mockjs'

var Random = Mock.Random

Mock.mock('/api/queryBranchList', {
  'consumer': 'litou-admin',
  'provider': 'litou-service',
  'requestId': '@guid',
  'serviceId': 'queryBranchList',
  'requestTime': Random.datetime(),
  'responseTime': Random.datetime(),
  'cost': '123ms',
  'retCode': '0000',
  'retMsg': '交易成功',
  'data': {
    'list': [{
      'branchId||100001-199999': 100002,
      'branchName': '立透集团总部',
      'branchAddress': '北京市北三环球贸易中心',
      'telephone': '',
      'description': '栉风沐雨,砥砺前行',
      'level': 1,
      'parentBranchId||100001-199999': 100002,
      'children': [{
          'level': 2,
          'branchId||100001-199999': 100003,
          'branchName': '立透集团北京分部',
          'branchAddress': Random.city(),
          'telephone||10000100-99999999': 10000100,
          'description': '测试数据',
          'parentBranchId||100001-199999': 100002,
          'children': [{
            'level': 3,
            'branchId||100001-199999': 100003,
            'branchName': '立透集团河北分部',
            'branchAddress': Random.city(),
            'telephone||10000100-99999999': 10000100,
            'description': '测试数据',
            'parentBranchId||100001-199999': 100002
          }, {
            'level': 3,
            'branchId||100001-199999': 100003,
            'branchName': '立透集团天津分部',
            'branchAddress': Random.city(),
            'telephone||10000100-99999999': 10000100,
            'description': '测试数据',
            'parentBranchId||100001-199999': 100002
          }, {
            'level': 3,
            'branchId||100001-199999': 100003,
            'branchName': '立透集团山西分部',
            'branchAddress': Random.city(),
            'telephone||10000100-99999999': 10000100,
            'description': '测试数据',
            'parentBranchId||100001-199999': 100002
          }]
        },
        {
          'level': 2,
          'branchId||100001-199999': 100003,
          'branchName': '立透集团华北分部',
          'branchAddress': Random.city(),
          'telephone||10000100-99999999': 10000100,
          'description': '测试数据',
          'parentBranchId||100001-199999': 100002
        },
        {
          'level': 2,
          'branchId||100001-199999': 100003,
          'branchName': '立透集团华东分部',
          'branchAddress': Random.city(),
          'telephone||10000100-99999999': 10000100,
          'description': '测试数据',
          'parentBranchId||100001-199999': 100002
        },
        {
          'level': 2,
          'branchId||100001-199999': 100003,
          'branchName': '立透集团华南分部',
          'branchAddress': Random.city(),
          'telephone||10000100-99999999': 10000100,
          'description': '测试数据',
          'parentBranchId||100001-199999': 100002
        },
        {
          'level': 2,
          'branchId||100001-199999': 100003,
          'branchName': '立透集团华西分部',
          'branchAddress': Random.city(),
          'telephone||10000100-99999999': 10000100,
          'description': '测试数据',
          'parentBranchId||100001-199999': 100002
        },
        {
          'level': 2,
          'branchId||100001-199999': 100003,
          'branchName': '立透集团财务分部',
          'branchAddress': Random.city(),
          'telephone||10000100-99999999': 10000100,
          'description': '测试数据',
          'parentBranchId||100001-199999': 100002
        },
        {
          'level': 2,
          'branchId||100001-199999': 100003,
          'branchName': '立透集团信息分部',
          'branchAddress': Random.city(),
          'telephone||10000100-99999999': 10000100,
          'description': '测试数据',
          'parentBranchId||100001-199999': 100002
        },
        {
            'level': 2,
            'branchId||100001-199999': 100003,
            'branchName': '立透集团电子分部',
            'branchAddress': Random.city(),
            'telephone||10000100-99999999': 10000100,
            'description': '测试数据',
            'parentBranchId||100001-199999': 100002
        }
      ]
    }]
  }
})

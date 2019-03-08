import Mock from 'mockjs';

var Random = Mock.Random

Mock.mock('/api/queryErrorList', {
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
        'list': [
            {
                'errorId|999001-999999': 999002,  
                'errorName': '@name',             
                'createTime': Random.datetime(),
                'modifyTime': Random.datetime()
            },{
                'errorId|999001-999999': 999002,  
                'errorName': '@name',             
                'createTime': Random.datetime(),
                'modifyTime': Random.datetime()
            },{
                'errorId|999001-999999': 999002,  
                'errorName': '@name',             
                'createTime': Random.datetime(),
                'modifyTime': Random.datetime()
            },{
                'errorId|999001-999999': 999002,  
                'errorName': '@name',             
                'createTime': Random.datetime(),
                'modifyTime': Random.datetime()
            },{
                'errorId|999001-999999': 999002,  
                'errorName': '@name',             
                'createTime': Random.datetime(),
                'modifyTime': Random.datetime()
            },{
                'errorId|999001-999999': 999002,  
                'errorName': '@name',             
                'createTime': Random.datetime(),
                'modifyTime': Random.datetime()
            },{
                'errorId|999001-999999': 999002,  
                'errorName': '@name',             
                'createTime': Random.datetime(),
                'modifyTime': Random.datetime()
            }
        ]
    }
}); 

Mock.mock('/api/queryErrorDetail', {
    'consumer': 'litou-admin',
    'provider': 'litou-service',
    'requestId': '@guid',
    'serviceId': 'queryErrorDetail',
    'requestTime': Random.datetime(),
    'responseTime': Random.datetime(),
    'cost': '123ms',
    'retCode': '0000',
    'retMsg': '交易成功',
    'data': {
        'errorId|999001-999999': 100002,  
        'errorName': '@name',  
        'description': '测试数据'
    }
}); 
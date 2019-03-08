import Mock from 'mockjs';

var Random = Mock.Random

Mock.mock('/api/queryServiceList', {
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
                'serviceId|999001-999999': 999002,  
                'serviceName': '@name',             
                'createTime': Random.datetime(),
                'modifyTime': Random.datetime()
            },{
                'serviceId|999001-999999': 999002,  
                'serviceName': '@name',             
                'createTime': Random.datetime(),
                'modifyTime': Random.datetime()
            },{
                'serviceId|999001-999999': 999002,  
                'serviceName': '@name',             
                'createTime': Random.datetime(),
                'modifyTime': Random.datetime()
            },{
                'serviceId|999001-999999': 999002,  
                'serviceName': '@name',             
                'createTime': Random.datetime(),
                'modifyTime': Random.datetime()
            },{
                'serviceId|999001-999999': 999002,  
                'serviceName': '@name',             
                'createTime': Random.datetime(),
                'modifyTime': Random.datetime()
            },{
                'serviceId|999001-999999': 999002,  
                'serviceName': '@name',             
                'createTime': Random.datetime(),
                'modifyTime': Random.datetime()
            },{
                'serviceId|999001-999999': 999002,  
                'serviceName': '@name',             
                'createTime': Random.datetime(),
                'modifyTime': Random.datetime()
            }
        ]
    }
}); 

Mock.mock('/api/queryServiceDetail', {
    'consumer': 'litou-admin',
    'provider': 'litou-service',
    'requestId': '@guid',
    'serviceId': 'queryServiceDetail',
    'requestTime': Random.datetime(),
    'responseTime': Random.datetime(),
    'cost': '123ms',
    'retCode': '0000',
    'retMsg': '交易成功',
    'data': {
        'serviceId|999001-999999': 100002,  
        'serviceName': '@name',  
        'description': '测试数据'
    }
}); 
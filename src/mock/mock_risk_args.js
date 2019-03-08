import Mock from 'mockjs';

var Random = Mock.Random

Mock.mock('/api/queryArgsList', {
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
                'argsId|1-999999': 2,  
                'argsCode': 'age',
                'argsName': '年龄', 
                'enable': true,         
                'createTime': Random.datetime(),
                'modifyTime': Random.datetime()
            },{
                'argsId|1-999999': 2,  
                'argsCode': 'name',
                'argsName': '姓名', 
                'enable': true,         
                'createTime': Random.datetime(),
                'modifyTime': Random.datetime()
            },{
                'argsId|1-999999': 2,  
                'argsCode': 'sex',
                'argsName': '性别', 
                'enable': true,         
                'createTime': Random.datetime(),
                'modifyTime': Random.datetime()
            },{
                'argsId|1-999999': 2,  
                'argsCode': 'registCapital',
                'argsName': '注册资金', 
                'enable': true,         
                'createTime': Random.datetime(),
                'modifyTime': Random.datetime()
            },{
                'argsId|1-999999': 2,  
                'argsCode': '@name',
                'argsName': '@name', 
                'enable': true,         
                'createTime': Random.datetime(),
                'modifyTime': Random.datetime()
            },{
                'argsId|1-999999': 2,  
                'argsCode': '@name',
                'argsName': '@name', 
                'enable': true,         
                'createTime': Random.datetime(),
                'modifyTime': Random.datetime()
            },{
                'argsId|1-999999': 2,  
                'argsCode': '@name',
                'argsName': '@name', 
                'enable': true,         
                'createTime': Random.datetime(),
                'modifyTime': Random.datetime()
            },{
                'argsId|1-999999': 2,  
                'argsCode': '@name',
                'argsName': '@name', 
                'enable': true,         
                'createTime': Random.datetime(),
                'modifyTime': Random.datetime()
            },{
                'argsId|1-999999': 2,  
                'argsCode': '@name',
                'argsName': '@name', 
                'enable': true,         
                'createTime': Random.datetime(),
                'modifyTime': Random.datetime()
            },{
                'argsId|1-999999': 2,  
                'argsCode': '@name',
                'argsName': '@name', 
                'enable': true,         
                'createTime': Random.datetime(),
                'modifyTime': Random.datetime()
            },{
                'argsId|1-999999': 2,  
                'argsCode': '@name',
                'argsName': '@name', 
                'enable': true,         
                'createTime': Random.datetime(),
                'modifyTime': Random.datetime()
            },{
                'argsId|1-999999': 2,  
                'argsCode': '@name',
                'argsName': '@name', 
                'enable': true,         
                'createTime': Random.datetime(),
                'modifyTime': Random.datetime()
            }
        ]
    }
}); 

Mock.mock('/api/queryArgsDetail', {
    'consumer': 'litou-admin',
    'provider': 'litou-service',
    'requestId': '@guid',
    'serviceId': 'queryArgsDetail',
    'requestTime': Random.datetime(),
    'responseTime': Random.datetime(),
    'cost': '123ms',
    'retCode': '0000',
    'retMsg': '交易成功',
    'data': {
        'argsId|1-999999': 2,  
        'argsCode': '@name',  
        'argsName': '@name',
        'enable': true,
        'description': '测试数据'
    }
}); 
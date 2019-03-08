import Mock from 'mockjs';

var Random = Mock.Random

Mock.mock('/api/queryRuleList', {
    'consumer': 'litou-admin',
    'provider': 'litou-service',
    'requestId': '@guid',
    'serviceId': 'queryRuleList',
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
                'ruleId|1-999999': 2,  
                'ruleName': '@name', 
                'enable': true,         
                'createTime': Random.datetime(),
                'modifyTime': Random.datetime()
            },{
                'ruleId|1-999999': 2,  
                'ruleName': '@name', 
                'enable': true,         
                'createTime': Random.datetime(),
                'modifyTime': Random.datetime()
            },{
                'ruleId|1-999999': 2,  
                'ruleName': '@name', 
                'enable': true,         
                'createTime': Random.datetime(),
                'modifyTime': Random.datetime()
            },{
                'ruleId|1-999999': 2,  
                'ruleName': '@name', 
                'enable': true,         
                'createTime': Random.datetime(),
                'modifyTime': Random.datetime()
            },{
                'ruleId|1-999999': 2,  
                'ruleName': '@name', 
                'enable': true,         
                'createTime': Random.datetime(),
                'modifyTime': Random.datetime()
            },{
                'ruleId|1-999999': 2,  
                'ruleName': '@name', 
                'enable': true,         
                'createTime': Random.datetime(),
                'modifyTime': Random.datetime()
            },{
                'ruleId|1-999999': 2,  
                'ruleName': '@name', 
                'enable': true,         
                'createTime': Random.datetime(),
                'modifyTime': Random.datetime()
            },{
                'ruleId|1-999999': 2,  
                'ruleName': '@name', 
                'enable': true,         
                'createTime': Random.datetime(),
                'modifyTime': Random.datetime()
            },{
                'ruleId|1-999999': 2,  
                'ruleName': '@name', 
                'enable': true,         
                'createTime': Random.datetime(),
                'modifyTime': Random.datetime()
            },{
                'ruleId|1-999999': 2,  
                'ruleName': '@name', 
                'enable': true,         
                'createTime': Random.datetime(),
                'modifyTime': Random.datetime()
            },{
                'ruleId|1-999999': 2,  
                'ruleName': '@name', 
                'enable': true,         
                'createTime': Random.datetime(),
                'modifyTime': Random.datetime()
            }
        ]
    }
}); 

Mock.mock('/api/queryRuleDetail', {
    'consumer': 'litou-admin',
    'provider': 'litou-service',
    'requestId': '@guid',
    'serviceId': 'queryRuleDetail',
    'requestTime': Random.datetime(),
    'responseTime': Random.datetime(),
    'cost': '123ms',
    'retCode': '0000',
    'retMsg': '交易成功',
    'data': {
        'ruleId|1-999999': 2,   
        'ruleName': '@name',
        'enable': false,
        'description': '测试数据'
    }
}); 
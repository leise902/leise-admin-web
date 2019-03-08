import Mock from 'mockjs';

var Random = Mock.Random

Mock.mock('/api/queryTemplateList', {
    'consumer': 'litou-admin',
    'provider': 'litou-service',
    'requestId': '@guid',
    'serviceId': 'queryTemplateList',
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
                'templateId|1-999999': 2,  
                'templateName': '@name', 
                'enable': true,         
                'createTime': Random.datetime(),
                'modifyTime': Random.datetime()
            },{
                'templateId|1-999999': 2,  
                'templateName': '@name', 
                'enable': true,         
                'createTime': Random.datetime(),
                'modifyTime': Random.datetime()
            },{
                'templateId|1-999999': 2,  
                'templateName': '@name', 
                'enable': true,         
                'createTime': Random.datetime(),
                'modifyTime': Random.datetime()
            },{
                'templateId|1-999999': 2,  
                'templateName': '@name', 
                'enable': true,         
                'createTime': Random.datetime(),
                'modifyTime': Random.datetime()
            },{
                'templateId|1-999999': 2,  
                'templateName': '@name', 
                'enable': true,         
                'createTime': Random.datetime(),
                'modifyTime': Random.datetime()
            },{
                'templateId|1-999999': 2,  
                'templateName': '@name', 
                'enable': true,         
                'createTime': Random.datetime(),
                'modifyTime': Random.datetime()
            },{
                'templateId|1-999999': 2,  
                'templateName': '@name', 
                'enable': true,         
                'createTime': Random.datetime(),
                'modifyTime': Random.datetime()
            },{
                'templateId|1-999999': 2,  
                'templateName': '@name', 
                'enable': true,         
                'createTime': Random.datetime(),
                'modifyTime': Random.datetime()
            },{
                'templateId|1-999999': 2,  
                'templateName': '@name', 
                'enable': true,         
                'createTime': Random.datetime(),
                'modifyTime': Random.datetime()
            },{
                'templateId|1-999999': 2,  
                'templateName': '@name', 
                'enable': true,         
                'createTime': Random.datetime(),
                'modifyTime': Random.datetime()
            },{
                'templateId|1-999999': 2,  
                'templateName': '@name', 
                'enable': true,         
                'createTime': Random.datetime(),
                'modifyTime': Random.datetime()
            }
        ]
    }
}); 

Mock.mock('/api/queryTemplateDetail', {
    'consumer': 'litou-admin',
    'provider': 'litou-service',
    'requestId': '@guid',
    'serviceId': 'queryTemplateDetail',
    'requestTime': Random.datetime(),
    'responseTime': Random.datetime(),
    'cost': '123ms',
    'retCode': '0000',
    'retMsg': '交易成功',
    'data': {
        'templateId|1-999999': 2,  
        'templateName': '@name',
        'enable': true,
        'description': '测试数据'
    }
}); 
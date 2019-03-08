import Mock from 'mockjs';

var Random = Mock.Random

Mock.mock('/api/queryProductList', {
    'consumer': 'litou-admin',
    'provider': 'litou-service',
    'requestId': '@guid',
    'serviceId': 'queryProductList',
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
                'productId|1-999999': 2,  
                'productName': '@name', 
                'enable': true,         
                'createTime': Random.datetime(),
                'modifyTime': Random.datetime()
            },{
                'productId|1-999999': 2,  
                'productName': '@name', 
                'enable': true,         
                'createTime': Random.datetime(),
                'modifyTime': Random.datetime()
            },{
                'productId|1-999999': 2,  
                'productName': '@name', 
                'enable': true,         
                'createTime': Random.datetime(),
                'modifyTime': Random.datetime()
            },{
                'productId|1-999999': 2,  
                'productName': '@name', 
                'enable': true,         
                'createTime': Random.datetime(),
                'modifyTime': Random.datetime()
            },{
                'productId|1-999999': 2,  
                'productName': '@name', 
                'enable': true,         
                'createTime': Random.datetime(),
                'modifyTime': Random.datetime()
            },{
                'productId|1-999999': 2,  
                'productName': '@name', 
                'enable': true,         
                'createTime': Random.datetime(),
                'modifyTime': Random.datetime()
            },{
                'productId|1-999999': 2,  
                'productName': '@name', 
                'enable': true,         
                'createTime': Random.datetime(),
                'modifyTime': Random.datetime()
            },{
                'productId|1-999999': 2,  
                'productName': '@name', 
                'enable': true,         
                'createTime': Random.datetime(),
                'modifyTime': Random.datetime()
            },{
                'productId|1-999999': 2,  
                'productName': '@name', 
                'enable': true,         
                'createTime': Random.datetime(),
                'modifyTime': Random.datetime()
            },{
                'productId|1-999999': 2,  
                'productName': '@name', 
                'enable': true,         
                'createTime': Random.datetime(),
                'modifyTime': Random.datetime()
            },{
                'productId|1-999999': 2,  
                'productName': '@name', 
                'enable': true,         
                'createTime': Random.datetime(),
                'modifyTime': Random.datetime()
            }
        ]
    }
}); 

Mock.mock('/api/queryProductDetail', {
    'consumer': 'litou-admin',
    'provider': 'litou-service',
    'requestId': '@guid',
    'serviceId': 'queryProductDetail',
    'requestTime': Random.datetime(),
    'responseTime': Random.datetime(),
    'cost': '123ms',
    'retCode': '0000',
    'retMsg': '交易成功',
    'data': {
        'productId|1-999999': 2,  
        'productName': '@name',
        'enable': true,
        'description': '测试数据'
    }
}); 
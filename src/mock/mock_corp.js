import Mock from 'mockjs';

var Random = Mock.Random

Mock.mock('/api/queryCorpList', {
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
                'corpId|100001-199999': 100002,  
                'corpName': '@name',             
                'roles|+1': ['admin', 'oper', 'query', 'manager'],
                'mobile|1811110000-18699999999': 1811110001
            },{
                'corpId|100001-199999': 100002,  
                'corpName': '@name',  
                'roles|+1': ['admin', 'oper', 'query', 'manager'],
                'mobile|1811110000-18699999999': 1811110001
            },{
                'corpId|100001-199999': 100002,  
                'corpName': '@name',  
                'roles|+1': ['admin', 'oper', 'query', 'manager'],
                'mobile|1811110000-18699999999': 1811110001
            },{
                'corpId|100001-199999': 100002,  
                'corpName': '@name',  
                'roles|+1': ['admin', 'oper', 'query', 'manager'],
                'mobile|1811110000-18699999999': 1811110001
            },{
                'corpId|100001-199999': 100002,  
                'corpName': '@name',  
                'roles|+1': ['admin', 'oper', 'query', 'manager'],
                'mobile|1811110000-18699999999': 1811110001
            },{
                'corpId|100001-199999': 100002,  
                'corpName': '@name',  
                'roles|+1': ['admin', 'oper', 'query', 'manager'],
                'mobile|1811110000-18699999999': 1811110001
            },{
                'corpId|100001-199999': 100002,  
                'corpName': '@name',  
                'roles|+1': ['admin', 'oper', 'query', 'manager'],
                'mobile|1811110000-18699999999': 1811110001
            },{
                'corpId|100001-199999': 100002,  
                'corpName': '@name',  
                'roles|+1': ['admin', 'oper', 'query', 'manager'],
                'mobile|1811110000-18699999999': 1811110001
            },{
                'corpId|100001-199999': 100002,  
                'corpName': '@name',  
                'roles|+1': ['admin', 'oper', 'query', 'manager'],
                'mobile|1811110000-18699999999': 1811110001
            },{
                'corpId|100001-199999': 100002,  
                'corpName': '@name',  
                'roles|+1': ['admin', 'oper', 'query', 'manager'],
                'mobile|1811110000-18699999999': 1811110001
            }
        ]
    }
}); 


Mock.mock('/api/addCorp', {
    'consumer': 'litou-admin',
    'provider': 'litou-service',
    'requestId': '@guid',
    'serviceId': 'addCorp',
    'requestTime': Random.datetime(),
    'responseTime': Random.datetime(),
    'cost': '123ms',
    'retCode': '0000',
    'retMsg': '交易成功',
    'data': {
        'corpId|100001-199999': 100002,  
        'corpName': '@name',  
        'roles|+1': ['admin', 'oper', 'query', 'manager']
    }
}); 

Mock.mock('/api/queryCorpDetail', {
    'consumer': 'litou-admin',
    'provider': 'litou-service',
    'requestId': '@guid',
    'serviceId': 'queryCorpDetail',
    'requestTime': Random.datetime(),
    'responseTime': Random.datetime(),
    'cost': '123ms',
    'retCode': '0000',
    'retMsg': '交易成功',
    'data': {
        'corpId|100001-199999': 100002,  
        'corpName': '@name',  
        'roles|+1': ['admin', 'oper', 'query', 'manager']
    }
}); 
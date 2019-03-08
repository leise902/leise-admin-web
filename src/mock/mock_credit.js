import Mock from 'mockjs';

var Random = Mock.Random

Mock.mock('/api/queryCreditList', {
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
                'creditId|100001-199999': 100002,  
                'creditName': '@name',             
                'roles|+1': ['admin', 'oper', 'query', 'manager'],
                'mobile|1811110000-18699999999': 1811110001
            },{
                'creditId|100001-199999': 100002,  
                'creditName': '@name',  
                'roles|+1': ['admin', 'oper', 'query', 'manager'],
                'mobile|1811110000-18699999999': 1811110001
            },{
                'creditId|100001-199999': 100002,  
                'creditName': '@name',  
                'roles|+1': ['admin', 'oper', 'query', 'manager'],
                'mobile|1811110000-18699999999': 1811110001
            },{
                'creditId|100001-199999': 100002,  
                'creditName': '@name',  
                'roles|+1': ['admin', 'oper', 'query', 'manager'],
                'mobile|1811110000-18699999999': 1811110001
            },{
                'creditId|100001-199999': 100002,  
                'creditName': '@name',  
                'roles|+1': ['admin', 'oper', 'query', 'manager'],
                'mobile|1811110000-18699999999': 1811110001
            },{
                'creditId|100001-199999': 100002,  
                'creditName': '@name',  
                'roles|+1': ['admin', 'oper', 'query', 'manager'],
                'mobile|1811110000-18699999999': 1811110001
            },{
                'creditId|100001-199999': 100002,  
                'creditName': '@name',  
                'roles|+1': ['admin', 'oper', 'query', 'manager'],
                'mobile|1811110000-18699999999': 1811110001
            },{
                'creditId|100001-199999': 100002,  
                'creditName': '@name',  
                'roles|+1': ['admin', 'oper', 'query', 'manager'],
                'mobile|1811110000-18699999999': 1811110001
            },{
                'creditId|100001-199999': 100002,  
                'creditName': '@name',  
                'roles|+1': ['admin', 'oper', 'query', 'manager'],
                'mobile|1811110000-18699999999': 1811110001
            },{
                'creditId|100001-199999': 100002,  
                'creditName': '@name',  
                'roles|+1': ['admin', 'oper', 'query', 'manager'],
                'mobile|1811110000-18699999999': 1811110001
            }
        ]
    }
}); 


Mock.mock('/api/addCredit', {
    'consumer': 'litou-admin',
    'provider': 'litou-service',
    'requestId': '@guid',
    'serviceId': 'addCredit',
    'requestTime': Random.datetime(),
    'responseTime': Random.datetime(),
    'cost': '123ms',
    'retCode': '0000',
    'retMsg': '交易成功',
    'data': {
        'creditId|100001-199999': 100002,  
        'creditName': '@name',  
        'roles|+1': ['admin', 'oper', 'query', 'manager']
    }
}); 

Mock.mock('/api/queryCreditDetail', {
    'consumer': 'litou-admin',
    'provider': 'litou-service',
    'requestId': '@guid',
    'serviceId': 'queryCreditDetail',
    'requestTime': Random.datetime(),
    'responseTime': Random.datetime(),
    'cost': '123ms',
    'retCode': '0000',
    'retMsg': '交易成功',
    'data': {
        'creditId|100001-199999': 100002,  
        'creditName': '@name',  
        'roles|+1': ['admin', 'oper', 'query', 'manager']
    }
}); 
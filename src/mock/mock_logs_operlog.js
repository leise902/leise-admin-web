import Mock from 'mockjs';

var Random = Mock.Random

Mock.mock('/api/queryOperlogList', {
    'consumer': 'litou-admin',
    'provider': 'litou-service',
    'requestId': '@guid',
    'serviceId': 'queryOperlogList',
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
                'logId|999001-999999': 999002,  
                'operType|1': ['登录', '添加用户', '修改机构', '导出信用报告'],
                'bizKeyName|1': ['手机号', '身份证号', '用户编号', '企业编号', '机构编号', '数据字典编号'],
                'bizKeyValue|1': ['18611110000', '220302197106278111', 787766, 'C100232', '321213', '109203'],
                'operName': Random.cword('赵钱孙李周吴郑王冯陈褚卫蒋沈韩杨', 1) + Random.cword('辰逸瑾瑜皓轩擎苍致远文博志泽睿渊弘文', 1, 2),             
                'operResult|1': ['操作成功', '操作失败', '操作结果未知'],
                'operTime': Random.datetime()
            },
            {
                'logId|999001-999999': 999002,  
                'operType|1': ['登录', '添加用户', '修改机构', '导出信用报告'],
                'bizKeyName|1': ['手机号', '身份证号', '用户编号', '企业编号', '机构编号', '数据字典编号'],
                'bizKeyValue|1': ['18611110000', '220302197106278111', 787766, 'C100232', '321213', '109203'],
                'operName': Random.cword('赵钱孙李周吴郑王冯陈褚卫蒋沈韩杨', 1) + Random.cword('辰逸瑾瑜皓轩擎苍致远文博志泽睿渊弘文', 1, 2),             
                'operResult|1': ['操作成功', '操作失败', '操作结果未知'],
                'operTime': Random.datetime()
            },
            {
                'logId|999001-999999': 999002,  
                'operType|1': ['登录', '添加用户', '修改机构', '导出信用报告'],
                'bizKeyName|1': ['手机号', '身份证号', '用户编号', '企业编号', '机构编号', '数据字典编号'],
                'bizKeyValue|1': ['18611110000', '220302197106278111', 787766, 'C100232', '321213', '109203'],
                'operName': Random.cword('赵钱孙李周吴郑王冯陈褚卫蒋沈韩杨', 1) + Random.cword('辰逸瑾瑜皓轩擎苍致远文博志泽睿渊弘文', 1, 2),             
                'operResult|1': ['操作成功', '操作失败', '操作结果未知'],
                'operTime': Random.datetime()
            },
            {
                'logId|999001-999999': 999002,  
                'operType|1': ['登录', '添加用户', '修改机构', '导出信用报告'],
                'bizKeyName|1': ['手机号', '身份证号', '用户编号', '企业编号', '机构编号', '数据字典编号'],
                'bizKeyValue|1': ['18611110000', '220302197106278111', 787766, 'C100232', '321213', '109203'],
                'operName': Random.cword('赵钱孙李周吴郑王冯陈褚卫蒋沈韩杨', 1) + Random.cword('辰逸瑾瑜皓轩擎苍致远文博志泽睿渊弘文', 1, 2),             
                'operResult|1': ['操作成功', '操作失败', '操作结果未知'],
                'operTime': Random.datetime()
            },
            {
                'logId|999001-999999': 999002,  
                'operType|1': ['登录', '添加用户', '修改机构', '导出信用报告'],
                'bizKeyName|1': ['手机号', '身份证号', '用户编号', '企业编号', '机构编号', '数据字典编号'],
                'bizKeyValue|1': ['18611110000', '220302197106278111', 787766, 'C100232', '321213', '109203'],
                'operName': Random.cword('赵钱孙李周吴郑王冯陈褚卫蒋沈韩杨', 1) + Random.cword('辰逸瑾瑜皓轩擎苍致远文博志泽睿渊弘文', 1, 2),             
                'operResult|1': ['操作成功', '操作失败', '操作结果未知'],
                'operTime': Random.datetime()
            },
            {
                'logId|999001-999999': 999002,  
                'operType|1': ['登录', '添加用户', '修改机构', '导出信用报告'],
                'bizKeyName|1': ['手机号', '身份证号', '用户编号', '企业编号', '机构编号', '数据字典编号'],
                'bizKeyValue|1': ['18611110000', '220302197106278111', 787766, 'C100232', '321213', '109203'],
                'operName': Random.cword('赵钱孙李周吴郑王冯陈褚卫蒋沈韩杨', 1) + Random.cword('辰逸瑾瑜皓轩擎苍致远文博志泽睿渊弘文', 1, 2),             
                'operResult|1': ['操作成功', '操作失败', '操作结果未知'],
                'operTime': Random.datetime()
            },
            {
                'logId|999001-999999': 999002,  
                'operType|1': ['登录', '添加用户', '修改机构', '导出信用报告'],
                'bizKeyName|1': ['手机号', '身份证号', '用户编号', '企业编号', '机构编号', '数据字典编号'],
                'bizKeyValue|1': ['18611110000', '220302197106278111', 787766, 'C100232', '321213', '109203'],
                'operName': Random.cword('赵钱孙李周吴郑王冯陈褚卫蒋沈韩杨', 1) + Random.cword('辰逸瑾瑜皓轩擎苍致远文博志泽睿渊弘文', 1, 2),             
                'operResult|1': ['操作成功', '操作失败', '操作结果未知'],
                'operTime': Random.datetime()
            },
            {
                'logId|999001-999999': 999002,  
                'operType|1': ['登录', '添加用户', '修改机构', '导出信用报告'],
                'bizKeyName|1': ['手机号', '身份证号', '用户编号', '企业编号', '机构编号', '数据字典编号'],
                'bizKeyValue|1': ['18611110000', '220302197106278111', 787766, 'C100232', '321213', '109203'],
                'operName': Random.cword('赵钱孙李周吴郑王冯陈褚卫蒋沈韩杨', 1) + Random.cword('辰逸瑾瑜皓轩擎苍致远文博志泽睿渊弘文', 1, 2),             
                'operResult|1': ['操作成功', '操作失败', '操作结果未知'],
                'operTime': Random.datetime()
            },
            {
                'logId|999001-999999': 999002,  
                'operType|1': ['登录', '添加用户', '修改机构', '导出信用报告'],
                'bizKeyName|1': ['手机号', '身份证号', '用户编号', '企业编号', '机构编号', '数据字典编号'],
                'bizKeyValue|1': ['18611110000', '220302197106278111', 787766, 'C100232', '321213', '109203'],
                'operName': Random.cword('赵钱孙李周吴郑王冯陈褚卫蒋沈韩杨', 1) + Random.cword('辰逸瑾瑜皓轩擎苍致远文博志泽睿渊弘文', 1, 2),             
                'operResult|1': ['操作成功', '操作失败', '操作结果未知'],
                'operTime': Random.datetime()
            },
            {
                'logId|999001-999999': 999002,  
                'operType|1': ['登录', '添加用户', '修改机构', '导出信用报告'],
                'bizKeyName|1': ['手机号', '身份证号', '用户编号', '企业编号', '机构编号', '数据字典编号'],
                'bizKeyValue|1': ['18611110000', '220302197106278111', 787766, 'C100232', '321213', '109203'],
                'operName': Random.cword('赵钱孙李周吴郑王冯陈褚卫蒋沈韩杨', 1) + Random.cword('辰逸瑾瑜皓轩擎苍致远文博志泽睿渊弘文', 1, 2),             
                'operResult|1': ['操作成功', '操作失败', '操作结果未知'],
                'operTime': Random.datetime()
            }
        ]
    }
}); 

Mock.mock('/api/queryOperlogDetail', {
    'consumer': 'litou-admin',
    'provider': 'litou-service',
    'requestId': '@guid',
    'serviceId': 'queryOperlogDetail',
    'requestTime': Random.datetime(),
    'responseTime': Random.datetime(),
    'cost': '123ms',
    'retCode': '0000',
    'retMsg': '交易成功',
    'data': {
        'logId|999001-999999': 999002,  
        'operType|1': ['登录', '添加用户', '修改机构', '导出信用报告'],
        'bizKeyName|1': ['手机号', '身份证号', '用户编号', '企业编号', '机构编号', '数据字典编号'],
        'bizKeyValue|1': ['18611110000', '220302197106278111', 787766, 'C100232', '321213', '109203'],
        'operName': Random.cword('赵钱孙李周吴郑王冯陈褚卫蒋沈韩杨', 1) + Random.cword('辰逸瑾瑜皓轩擎苍致远文博志泽睿渊弘文', 1, 2),             
        'operResult|1': ['操作成功', '操作失败', '操作结果未知'],
        'operTime': Random.datetime(),
        'description|1': [
            '操作员编号:1000001,用户姓名:赵辰,于2018-02-18 14:30:29进行了登录操作',
            '机构编号:999001,进行了数据变更,变更项：地址, 由"北京xxx"变更为"上海xxx"',
            '企业编号:C000002,进行了数据导出, 导出数据范围：2018-03至2018-04，xxx数据，共计1000条'
        ]
    }
}); 
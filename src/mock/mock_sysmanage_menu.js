import Mock from 'mockjs'

var Random = Mock.Random

Mock.mock('/queryMenuList/1.0.0', {
  consumer: 'litou-admin',
  provider: 'litou-service',
  requestId: '@guid',
  serviceId: 'getMenuList',
  requestTime: Random.datetime(),
  responseTime: Random.datetime(),
  cost: '123ms',
  retCode: '0000',
  retMsg: '交易成功',
  data: {
    list: [
      {
        path: '/sysmanage',
        icon: 'gear-b',
        title: '系统管理',
        name: 'sysmanage',
        component: '/main/main',
        level: 1,
        children: [
          {
            level: 2,
            path: 'manageDictDatas',
            title: '数据字典管理',
            icon: 'edit',
            name: 'manageDictDatas',
            component: '/sysmanage/dict/ManageDicts'
          },
          {
            level: 2,
            path: 'manageErrorInfos',
            title: '错误信息管理',
            icon: 'edit',
            name: 'manageErrorInfos',
            component: '/sysmanage/error/ManageErrors'
          },
          {
            level: 2,
            path: 'manageCaches',
            title: '缓存数据管理',
            icon: 'edit',
            name: 'manageCaches',
            component: '/home/Permission'
          },
          {
            level: 2,
            path: 'manageSyncDatas',
            title: '数据同步管理',
            icon: 'edit',
            name: 'manageSyncDatas',
            component: '/home/Permission'
          },
          {
            level: 2,
            path: 'manageSysFlag',
            title: '系统标识管理',
            icon: 'edit',
            name: 'manageSysFlag',
            component: '/home/Permission'
          },
          {
            level: 2,
            path: 'manageMenus',
            title: '菜单信息管理',
            icon: 'edit',
            name: 'manageMenus',
            component: '/sysmanage/menu/ManageMenus'
          },
          {
            level: 2,
            path: 'manageServices',
            title: '系统服务管理',
            icon: 'edit',
            name: 'manageServices',
            component: '/sysmanage/service/ManageServices'
          }
        ]
      },
      {
        path: '/flow',
        icon: 'gear-b',
        title: '流程中心',
        name: 'flow',
        component: '/main/main',
        level: 1,
        children: [
          {
            level: 2,
            path: 'designer',
            title: '流程设计器',
            icon: 'edit',
            name: 'designer',
            component: '/flow/designer/flow-designer'
          },
          {
            level: 2,
            path: 'queryFlows',
            title: '流程设计查询',
            icon: 'edit',
            name: 'queryFlows',
            component: '/flow/QueryFlows'
          },
          {
            level: 2,
            path: 'manageFlows',
            title: '流程设计管理',
            icon: 'edit',
            name: 'manageFlows',
            component: '/flow/ManageFlows'
          },
          {
            level: 2,
            path: 'manageFlowVersions',
            title: '流程版本管理',
            icon: 'edit',
            name: 'manageFlowVersions',
            component: '/flow/ManageFlowVersions'
          },
          {
            level: 2,
            path: 'manageFlowPublish',
            title: '流程发布管理',
            icon: 'edit',
            name: 'manageFlowPublish',
            component: '/flow/ManageFlowPublish'
          }
        ]
      },
      {
        path: '/module',
        icon: 'gear-b',
        title: '模块管理',
        name: 'module',
        component: '/main/main',
        level: 1,
        children: [
          {
            level: 2,
            path: 'manageModules',
            title: '模块信息管理',
            icon: 'edit',
            name: 'manageModules',
            component: '/module/ManageModules'
          },
          {
            level: 2,
            path: 'manageModuleEnvs',
            title: '模块环境管理',
            icon: 'edit',
            name: 'manageModuleEnvs',
            component: '/module/ManageModuleEnvs'
          }
        ]
      },
      {
        path: '/access',
        icon: 'locked',
        name: 'access',
        title: '权限管理',
        component: '/main/main',
        level: 1,
        children: [
          {
            level: 2,
            path: 'manageRoles',
            title: '角色信息管理',
            icon: 'edit',
            name: 'manageRoles',
            component: '/access/role/ManageRoles'
          },
          {
            level: 2,
            path: 'queryRolePermission',
            title: '角色权限查询',
            icon: 'search',
            name: 'queryRolePermission',
            component: '/home/Access'
          },
          {
            level: 2,
            path: 'manageRolePermission',
            title: '角色权限管理',
            icon: 'edit',
            name: 'manageRolePermission',
            component: '/home/Access'
          }
        ]
      },
      {
        path: '/branch',
        icon: 'university',
        title: '机构管理',
        name: 'branch',
        component: '/main/main',
        level: 1,
        children: [
          {
            level: 2,
            path: 'queryBranches',
            title: '机构信息查询',
            icon: 'search',
            name: 'queryBranches',
            component: '/branch/QueryBranches'
          },
          {
            level: 2,
            path: 'manageBranches',
            title: '机构信息管理',
            icon: 'edit',
            name: 'manageBranches',
            component: '/branch/ManageBranches'
          }
        ]
      },
      {
        path: '/user',
        icon: 'person-stalker',
        name: 'user',
        title: '用户管理',
        component: '/main/main',
        level: 1,
        children: [
          {
            level: 2,
            path: 'queryUsers',
            title: '用户信息查询',
            icon: 'search',
            name: 'queryUsers',
            component: '/user/QueryUsers'
          },
          {
            level: 2,
            path: 'manageUsers',
            title: '用户信息管理',
            icon: 'edit',
            name: 'manageUsers',
            component: '/user/ManageUsers'
          }
        ]
      },
      {
        path: '/corp',
        icon: 'cube',
        name: 'corp',
        title: '企业管理',
        component: '/main/main',
        level: 1,
        children: [
          {
            level: 2,
            path: 'queryCorps',
            title: '企业信息查询',
            icon: 'search',
            name: 'queryCorps',
            component: '/corp/QueryCorps'
          },
          {
            level: 2,
            path: 'manageCorps',
            title: '企业信息管理',
            icon: 'edit',
            name: 'manageCorps',
            component: '/corp/ManageCorps'
          }
        ]
      },
      {
        path: '/credit',
        icon: 'card',
        name: 'credit',
        title: '信用管理',
        component: '/main/main',
        level: 1,
        children: [
          {
            level: 2,
            path: 'queryCredits',
            title: '企业信用查询',
            icon: 'search',
            name: 'queryCredits',
            component: '/credit/QueryCredits'
          },
          {
            level: 2,
            path: 'manageCredits',
            title: '企业信用管理',
            icon: 'edit',
            name: 'manageCredits',
            component: '/credit/ManageCredits'
          }
        ]
      },
      {
        path: '/risk',
        icon: 'flash',
        name: 'risk',
        title: '风控管理',
        component: '/main/main',
        level: 1,
        children: [
          {
            level: 2,
            path: 'manageRiskArgs',
            title: '风控参数管理',
            icon: 'edit',
            name: 'manageRiskRuleArgs',
            component: '/risk/args/ManageArgs'
          },
          {
            level: 2,
            path: 'manageRiskRuleTemplates',
            title: '规则模板管理',
            icon: 'edit',
            name: 'manageRiskRuleTemplates',
            component: '/risk/template/ManageTemplates'
          },
          {
            level: 2,
            path: 'manageRiskRules',
            title: '风控规则管理',
            icon: 'edit',
            name: 'manageRiskRules',
            component: '/risk/rules/ManageRules'
          },
          {
            level: 2,
            path: 'manageRiskProducts',
            title: '风控产品管理',
            icon: 'edit',
            name: 'manageRiskProducts',
            component: '/risk/product/ManageProducts'
          },
          {
            level: 2,
            path: 'manageRiskScores',
            title: '风控评分管理',
            icon: 'edit',
            name: 'manageRiskScores',
            component: '/home/Permission'
          },
          {
            level: 2,
            path: 'manageRiskServices',
            title: '风控服务管理',
            icon: 'edit',
            name: 'manageRiskServices',
            component: '/home/Permission'
          }
        ]
      },
      {
        path: '/fee',
        icon: 'pricetags',
        name: 'fee',
        title: '计费管理',
        component: '/main/main',
        level: 1,
        children: [
          {
            level: 2,
            path: 'queryProductFees',
            title: '产品计费查询',
            icon: 'search',
            name: 'queryProductFees',
            component: '/home/Permission'
          },
          {
            level: 2,
            path: 'manageProductFees',
            title: '产品计费管理',
            icon: 'edit',
            name: 'manageProductFees',
            component: '/home/Permission'
          },
          {
            level: 2,
            path: 'manageCorpFees',
            title: '企业计费管理',
            icon: 'edit',
            name: 'manageCorpFees',
            component: '/home/Permission'
          },
          {
            level: 2,
            path: 'queryCorpFeeRecords',
            title: '企业消费查询',
            icon: 'search',
            name: 'queryCorpFeeRecords',
            component: '/home/Permission'
          }
        ]
      },
      {
        path: '/notice',
        icon: 'at',
        name: 'notice',
        title: '公告管理',
        component: '/main/main',
        level: 1,
        children: [
          {
            level: 2,
            path: 'queryNotices',
            title: '公告信息查询',
            icon: 'search',
            name: 'queryNotices',
            component: '/home/Permission'
          },
          {
            level: 2,
            path: 'manageNotices',
            title: '公告信息管理',
            icon: 'edit',
            name: 'manageNotices',
            component: '/home/Permission'
          },
          {
            level: 2,
            path: 'manageNoticeTemplate',
            title: '公告模板管理',
            icon: 'edit',
            name: 'manageNoticeTemplate',
            component: '/home/Permission'
          }
        ]
      },
      {
        path: '/logs',
        icon: 'eye',
        name: 'logs',
        title: '日志管理',
        component: '/main/main',
        level: 1,
        children: [
          {
            level: 2,
            path: 'queryOperlogs',
            title: '操作日志查询',
            icon: 'search',
            name: 'queryOperlogs',
            component: '/logs/operlog/QueryOperlogs'
          },
          {
            level: 2,
            path: 'queryServiceLogs',
            title: '服务日志查询',
            icon: 'edit',
            name: 'queryServiceLogs',
            component: '/home/Permission'
          },
          {
            level: 2,
            path: 'queryRegistLogs',
            title: '注册日志查询',
            icon: 'edit',
            name: 'queryRegistLogs',
            component: '/home/Permission'
          },
          {
            level: 2,
            path: 'queryFeeLogs',
            title: '计费日志查询',
            icon: 'edit',
            name: 'queryFeeLogs',
            component: '/home/Permission'
          },
          {
            level: 2,
            path: 'queryRiskLogs',
            title: '风控日志查询',
            icon: 'edit',
            name: 'queryRiskLogs',
            component: '/home/Permission'
          }
        ]
      }
    ]
  }
})

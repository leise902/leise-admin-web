<template>
  <div>
    <Card v-if="searchFormItems.length > 0">
      <p slot="title">
        <Icon type="md-search"></Icon>
        {{title}}
      </p>
      <search-form @on-search="handleSearch" :items="searchFormItems" />
    </Card>
    <!-- <Card v-if="toolbarItems.length > 0">
      <tool-bar :actionItems="toolbarItems" :context="this" />
    </Card> -->
    <Card>
      <Row class="margin-top-10">
        <Table size="small" :loading="searchLoading" :columns="columns" :data="queryData"></Table>
      </Row>
      <Row><br></Row>
      <Row>
        <Page size="small" :total="total" :current="pageNum" :page-size="pageSize" show-sizer show-total @on-change="handleChangePage" @on-page-size-change="handleChangePagesize"></Page>
      </Row>
    </Card>
  </div>
</template>

<script>
import { queryFlowPage } from '@/api/flow.js'
import { searchFlowInfoList } from '@/api/designer.js'
import flowRender from './render/render.js'
import util from '@/libs/util'
import formatter from '@/libs/formatter'
import SearchForm from '_c/search-form'
import ToolBar from '_c/toolbar'

export default {
  name: 'queryFlows',
  components: {
    SearchForm,
    ToolBar
  },
  data() {
    return {
      title: '查询流程列表',
      searchFormItems: [
        {
          type: 'Select',
          label: '模块编号',
          code: 'moduleId',
          props: {
            placeholder: '请选择模块'
          },
          remote: {
            api: searchFlowInfoList,
            params: {},
            option: {
              value: 'flowInfoId',
              label: 'flowName'
            }
          },
          options: []
        },
        {
          type: 'Select',
          label: '模块版本',
          code: 'moduleVersion',
          props: {
            placeholder: '请选择模块'
          },
          options: []
        },
        {
          type: 'Input',
          label: '流程编号',
          code: 'flowId',
          props: {
            placeholder: '请输入流程编号',
            type: 'text'
          }
        },
        {
          type: 'Input',
          label: '流程名称',
          code: 'flowName',
          props: {
            placeholder: '请输入流程名称',
            type: 'text'
          }
        },
        {
          type: 'Input',
          label: '流程版本号',
          code: 'flowVersion',
          props: {
            placeholder: '请输入流程版本号',
            type: 'text'
          }
        },
        {
          type: 'Input',
          label: '请求地址',
          code: 'requestUrl',
          props: {
            placeholder: '请输入请求地址',
            type: 'text'
          }
        },
        {
          type: 'Input',
          label: '查询日期',
          code: 'date',
          props: {
            placeholder: '请输入查询日期',
            type: 'text'
          }
        }
      ],
      // toolbarItems: [
      //   {
      //     code: 'add',
      //     type: 'primary',
      //     text: '添加',
      //     event: 'handleAdd'
      //   },
      //   {
      //     code: 'modify',
      //     type: 'primary',
      //     text: '修改',
      //     event: 'handleModify'
      //   },
      //   {
      //     code: 'delete',
      //     type: 'primary',
      //     text: '删除',
      //     event: 'handleDelete'
      //   }
      // ],
      columns: [
        {
          type: 'index',
          title: '序号',
          width: 60,
          align: 'center',
          fixed: 'left'
        },
        {
          key: 'flowInfoId',
          title: '流程Id',
          width: 100,
          align: 'center',
          fixed: 'left'
        },
        {
          key: 'flowName',
          title: '流程名称',
          width: 150,
          fixed: 'left'
        },
        {
          key: 'flowId',
          title: '流程编号',
          width: 150,
          fixed: 'left'
        },
        {
          key: 'flowVersion',
          title: '流程版本号',
          width: 100,
          fixed: 'left'
        },
        {
          key: 'moduleId',
          title: '模块编号',
          width: 150
        },
        {
          key: 'moduleName',
          title: '模块名称',
          width: 120
        },
        {
          key: 'requestUrl',
          title: '请求地址',
          width: 200
        },
        {
          key: 'status',
          title: '流程状态',
          width: 100
        },
        {
          key: 'createTime',
          title: '创建时间',
          width: 160,
          render: (h, params) => {
            return formatter.dateTimeFormat(params.row.createTime)
          }
        },
        {
          key: 'modifyTime',
          title: '修改时间',
          width: 160,
          render: (h, params) => {
            return formatter.dateTimeFormat(params.row.modifyTime)
          }
        },
        {
          key: 'operation',
          title: '操作',
          width: 180,
          fixed: 'right',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.handleRenderView(params.row.flowInfoId)
                    }
                  }
                },
                '详情'
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      util.openNewPage(this, 'viewFlowBizlogic_index')
                      this.$router.push({
                        name: 'viewFlowBizlogic_index',
                        params: { flowInfoId: params.row.flowInfoId }
                      })
                    }
                  }
                },
                '流程图'
              )
            ])
          }
        }
      ],
      searchLoading: false,
      total: 0,
      pageNum: 1,
      pageSize: 10,
      queryData: []
    }
  },
  computed: {},

  methods: {
    handleSearch(formValues = {}) {
      let params = formValues
      params.pageNum = this.pageNum
      params.pageSize = this.pageSize
      this.searchLoading = true
      queryFlowPage(params)
        .then(response => {
          let result = response.result
          this.total = result.total
          if (result.flowPage) {
            this.queryData = result.flowPage
          } else {
            this.queryData = []
          }
          this.searchLoading = false
        })
        .catch(error => {
          this.searchLoading = false
        })
    },

    handleChangePage(pageNum) {
      this.pageNum = pageNum
      this.handleSearch()
    },

    handleChangePagesize(pageSize) {
      this.pageSize = pageSize
      this.handleSearch()
    },

    handleRenderView(data) {
      let vm = this
      flowRender.viewFlowInfo(vm, data)
    },

    handleSelectFormItem(formItems = []) {
      for (let i = 0; i < formItems.length; i++) {
        let item = formItems[i]
        if (item.type === 'Select' && item.remote) {
          let remoteConfig = item.remote
          let params = remoteConfig.params || {}
          let api = remoteConfig.api
          let option = remoteConfig.option
          api(params).then(response => {
            let list = response.result.list
            let selectList = formatter.formatSelectList(
              list,
              option.value,
              option.label
            )
            item.options = selectList
          })
        }
      }
    }
  },

  created() {
    this.handleSelectFormItem(this.searchFormItems)
  }
}
</script>

<style lang="less" scoped>
@import '../../styles/common.less';
@import '../../styles/table.less';
</style>

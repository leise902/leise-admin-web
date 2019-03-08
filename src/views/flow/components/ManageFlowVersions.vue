<template>
  <Card>
    <Card>
      <p slot="title" style="color:#f60;text-align:left">
        <Icon type="information-circled"></Icon>
        流程基本信息
      </p>
      <Form ref="formItem" :model="formItem" :label-width="100" inline>
        <FormItem label="模块编号">
          <Input v-model="formItem.moduleId" readonly></Input>
        </FormItem>
        <FormItem label="模块名称">
          <Input v-model="formItem.moduleName" readonly></Input>
        </FormItem>
        <FormItem label="流程编号">
          <Input v-model="formItem.flowId" readonly></Input>
        </FormItem>
        <FormItem label="流程名称">
          <Input v-model="formItem.flowName" readonly></Input>
        </FormItem>
        <FormItem label="流程版本号">
          <Input v-model="formItem.flowVersion" readonly></Input>
        </FormItem>
        <FormItem label="请求地址">
          <Input v-model="formItem.requestUrl" readonly></Input>
        </FormItem>
      </Form>
    </Card>
    <Card>
      <p slot="title" style="color:#f60;text-align:left">
        <Icon type="information-circled"></Icon>
        流程历史版本列表
      </p>
      <Row class="margin-top-10 searchable-table-con1">
        <Table size="small" :columns="flflowVersionColumns" :data="flowVersionPage"></Table>
      </Row><br>
      <Row>
        <Page :total="total" :current="pageNum" :page-size="pageSize" show-sizer show-total @on-change="handleChangePage" @on-page-size-change="handleChangePagesize"></Page>
      </Row>
    </Card>
  </Card>
</template>
<script>
import { queryFlowBaseInfo, queryFlowVersionPage } from '@/api/flow.js'
import formatter from '@/libs/formatter'

export default {
  name: 'manageFlowVersions',
  data() {
    return {
      formItem: {
        moduleId: '',
        moduleName: '',
        flowId: '',
        flowName: '',
        flowVersion: '',
        requestUrl: ''
      },
      flowVersionPage: [],
      flflowVersionColumns: [
        {
          type: 'index',
          title: '序号',
          width: 80,
          fixed: 'left'
        },
        {
          key: 'version',
          title: '历史版本号',
          width: 150,
          fixed: 'left'
        },
        {
          key: 'createTime',
          title: '提交时间',
          width: 160,
          fixed: 'left',
          render: (h, params) => {
            return formatter.dateTimeFormat(params.row.createTime)
          }
        },
        {
          key: 'moduleId',
          title: '模块编号',
          width: 150
        },
        {
          key: 'flowId',
          title: '流程编号',
          width: 150
        },
        {
          key: 'flowName',
          title: '流程名称',
          width: 160
        },
        {
          key: 'flowVersion',
          title: '流程版本号',
          width: 160
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
                      this.handleFlowDataDelete(params.row.id)
                    }
                  }
                },
                '查看'
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
                      this.handleFlowDataDelete(params.row.id)
                    }
                  }
                },
                '恢复'
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'warning',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.handleFlowDataDelete(params.row.id)
                    }
                  }
                },
                '删除'
              )
            ])
          }
        }
      ],
      pageNum: 1,
      pageSize: 10,
      total: 0
    }
  },
  props: ['flowInfoId'],
  methods: {
    init() {
      if (!this.flowInfoId) {
        this.$Message.warning('请输入流程ID')
        return
      }
      this.handleQueryFlowBaseInfo()
      this.handleQueryFlowVersionPage()
    },

    handleQueryFlowBaseInfo() {
      let params = {
        flowInfoId: this.flowInfoId
      }
      queryFlowBaseInfo(params).then(response => {
        let result = response.result
        if (result) {
          this.formItem = result
        }
      })
    },

    handleQueryFlowVersionPage() {
      let params = {
        flowInfoId: this.flowInfoId,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }
      queryFlowVersionPage(params).then(response => {
        let result = response.result
        if (result) {
          this.flowVersionPage = result.flowVersionPage
          this.total = result.total
        }
      })
    },

    handleFlowDataDelete(data) {
      let params = {
        flowDataId: data
      }
      deleteFlowData(params)
        .then(response => {
          this.$Message.success('操作成功')
          this.handleQueryFlowVersionPage()
        })
        .catch(error => {
          this.$Message.success('操作失败')
        })
    },

    handleChangePage(pageNum) {
      this.pageNum = pageNum
      this.handleQueryFlowVersionPage()
    },

    handleChangePagesize(pageSize) {
      this.pageSize = pageSize
      this.handleQueryFlowVersionPage()
    }
  },

  created() {
    this.init()
  }
}
</script>
<style lang="less" scoped>
@import '../../../styles/common.less';
@import '../../../styles/table.less';
</style>

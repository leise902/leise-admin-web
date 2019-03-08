<template>
  <div>
    <Card>
      <p slot="title">
        <Icon type="mouse"></Icon>
        点击搜索进行查询
      </p>
      <Form ref="searchFormItem" :model="searchFormItem" :rules="ruleValidate" inline>
        <FormItem prop="moduleId">
          <Input v-model="searchFormItem.moduleId" icon="search" placeholder="请输入模块编号搜搜..." />
        </FormItem>
        <FormItem prop="flowInfoId">
          <Input v-model="searchFormItem.flowInfoId" icon="search" placeholder="请输入流程ID搜搜..." />
        </FormItem>
        <FormItem prop="flowId">
          <Input v-model="searchFormItem.flowId" icon="search" placeholder="请输入流程编号搜搜..." />
        </FormItem>
        <FormItem prop="flowName">
          <Input v-model="searchFormItem.flowName" icon="search" placeholder="请输入流程名称搜搜..." />
        </FormItem>
        <FormItem prop="version">
          <Input v-model="searchFormItem.version" icon="search" placeholder="请输入版本号搜搜..." />
        </FormItem>
        <FormItem>
          <span @click="handleSearch" style="margin: 0px 10px;">
            <Button type="primary" icon="search">搜索</Button>
          </span>
          <Button @click="handleCancel" type="ghost">取消</Button>
        </FormItem>
      </Form>
    </Card>
    <br>
    <Card>
      <span @click="handleAddPublishList" style="margin: 0px 10px;">
        <Button type="primary" icon="plus">添加到发布列表</Button>
      </span>
      <Row class="margin-top-10">
        <Table ref="flowVersions" size="small" :loading="searchLoading" :columns="columns" :data="queryData" @on-selection-change="handleOnSelectionChange"></Table>
      </Row>
      <Row><br></Row>
      <Row>
        <Page size="small" :total="total" :current="pageNum" :page-size="pageSize" show-sizer show-total @on-change="handleChangePage" @on-page-size-change="handleChangePagesize"></Page>
      </Row>
    </Card>
  </div>
</template>

<script>
import { queryFlowVersionPage, batchSavePublishFlows } from '@/api/flow.js'
import flowRender from './render/render.js'
import util from '@/libs/util'
import formatter from '@/libs/formatter'

export default {
  name: 'queryFlows',
  data() {
    return {
      searchLoading: false,
      selectionData: [],
      tag: '',
      total: 0,
      pageNum: 1,
      pageSize: 10,
      searchFormItem: {
        moduleId: '',
        flowId: '',
        flowName: '',
        version: '',
        flowInfoId: ''
      },
      flowInfoId: '',
      moduleId: '',
      flowId: '',
      columns: [
        {
          type: 'selection',
          title: '选择',
          width: 40,
          align: 'center',
          fixed: 'left'
        },
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
          width: 160
        },
        {
          key: 'version',
          title: '版本号',
          width: 300
        },
        {
          key: 'status',
          title: '版本状态',
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
                      this.handleRenderView(params.row.version)
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
                      util.openNewPage(this, 'viewFlowVersionBizlogic_index')
                      this.$router.push({
                        name: 'viewFlowVersionBizlogic_index',
                        params: { version: params.row.version }
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
      queryData: [],
      ruleValidate: {
        moduleId: [
          { required: false, message: '模块编号不能为空', trigger: 'blur' }
        ],
        flowId: [
          { required: false, message: '流程编号不能为空', trigger: 'blur' }
        ],
        flowName: [
          { required: false, message: '流程名称不能为空', trigger: 'blur' }
        ],
        version: [
          { required: false, message: '模块名称不能为空', trigger: 'blur' }
        ]
      }
    }
  },

  methods: {
    init() {
      this.handleSearch()
    },
    handleSearch() {
      let params = this.searchFormItem
      params.pageNum = this.pageNum
      params.pageSize = this.pageSize

      this.searchLoading = true
      queryFlowVersionPage(params)
        .then(response => {
          let result = response.result
          this.total = result.total
          if (result.flowVersionPage) {
            this.queryData = result.flowVersionPage
          } else {
            this.queryData = []
          }
          this.searchLoading = false
        })
        .catch(error => {
          this.searchLoading = false
        })
    },

    handleCancel() {},

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
      flowRender.viewFlowVersionInfo(vm, data)
    },

    handleAddPublishList() {
      if (this.selectionData.length === 0) {
        this.$Message.warning('请选择需要发布列表的流程列表')
        return
      }
      let selectionVersions = []
      for (let i = 0; i < this.selectionData.length; i++) {
        selectionVersions[i] = this.selectionData[i].version
      }
      let vm = this
      vm.$Modal.confirm({
        title: '添加到发布列表',
        okText: '确定',
        cancelText: '取消',
        render: h => {
          return h('Input', {
            props: {
              value: this.tag,
              autofocus: true,
              placeholder: '请输入版本标签'
            },
            on: {
              input: val => {
                this.tag = val
              }
            }
          })
        },
        loading: true,
        onOk: () => {
          setTimeout(() => {
            let params = {
              versions: selectionVersions,
              tag: this.tag
            }
            batchSavePublishFlows(params)
              .then(response => {
                this.$Message.success('操作成功')
                this.$Modal.remove()
                this.$refs.flowVersions.selectAll(false)
              })
              .catch(error => {
                console.log(error)
                this.$Message.error('操作失败')
              })
          }, 2000)
        }
      })
    },

    handleOnSelectionChange(data) {
      this.selectionData = data
      console.log(data)
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../styles/common.less';
@import '../../styles/table.less';
</style>

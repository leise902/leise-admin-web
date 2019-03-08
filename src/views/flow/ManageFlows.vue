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
        <FormItem prop="moduleName">
          <Input v-model="searchFormItem.moduleName" icon="search" placeholder="请输入模块名称搜搜..." />
        </FormItem>
        <FormItem prop="flowId">
          <Input v-model="searchFormItem.flowId" icon="search" placeholder="请输入流程编号搜搜..." />
        </FormItem>
        <FormItem prop="flowName">
          <Input v-model="searchFormItem.flowName" icon="search" placeholder="请输入流程名称搜搜..." />
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
      <span @click="handleRenderAdd" style="margin: 0px 10px;">
        <Button type="primary" icon="plus">新建流程</Button>
      </span>
      <span @click="handleFlowVersionBatchSave" style="margin: 0px 10px;">
        <Button type="primary" icon="filing">批量保存版本</Button>
      </span>
      <span style="margin: 0px 10px;float:right">自动保存版本
        <i-switch size="large" v-model="autoSaveStatus" @on-change="handleChangeAutoSaveStatus">
          <span slot="open">开启</span>
          <span slot="close">关闭</span>
        </i-switch>
      </span>
      <Row class="margin-top-10">
        <Table ref="flow" size="small" stripe :loading="searchLoading" :columns="columns" :data="queryData" @on-selection-change="handleOnSelectionChange"></Table>
      </Row>
      <Row><br></Row>
      <Row>
        <Page size="small" :total="total" :current="pageNum" :page-size="pageSize" show-sizer show-total @on-change="handleChangePage" @on-page-size-change="handleChangePagesize"></Page>
      </Row>
    </Card>
  </div>
</template>

<script>
import { queryFlowPage, batchSaveFlowVersion } from '@/api/flow.js'
import flowRender from './render/render.js'
import formatter from '@/libs/formatter'
import ExpandFlowTools from './components/ExpandFlowTools.vue'

export default {
  name: 'manageFlows',
  components: { ExpandFlowTools },
  data() {
    return {
      versionRemark: '',
      autoSaveStatus: sessionStorage.getItem('autoSave') !== 'false',
      searchLoading: false,
      selectionData: [],
      total: 0,
      pageNum: 1,
      pageSize: 10,
      searchFormItem: {
        moduleId: '',
        moduleName: '',
        flowId: '',
        flowName: ''
      },
      searchByModuleId: '',
      searchByModuleName: '',
      searchByFlowId: '',
      searchByFlowName: '',
      id: '',
      moduleId: '',
      flowId: '',
      checked: false,
      currentRow: {},
      columns: [
        {
          type: 'selection',
          title: '选择',
          width: 40,
          align: 'center'
        },
        {
          type: 'expand',
          title: '操作',
          width: 80,
          align: 'center',
          render: (h, params) => {
            return h(ExpandFlowTools, {
              props: {
                row: params.row
              }
            })
          }
        },
        {
          type: 'index',
          title: '序号',
          width: 60,
          align: 'center'
        },
        {
          key: 'flowInfoId',
          title: '流程ID',
          width: 100,
          align: 'center'
        },
        {
          key: 'flowName',
          title: '流程名称',
          width: 180
        },
        {
          key: 'flowId',
          title: '流程编号',
          width: 150
        },
        {
          key: 'flowVersion',
          title: '流程版本号',
          width: 100
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
        }
      ],
      queryData: [],
      ruleValidate: {
        moduleId: [
          { required: false, message: '模块编号不能为空', trigger: 'blur' }
        ],
        moduleName: [
          { required: false, message: '模块名称不能为空', trigger: 'blur' }
        ],
        flowId: [
          { required: false, message: '流程编号不能为空', trigger: 'blur' }
        ],
        flowName: [
          { required: false, message: '流程名称不能为空', trigger: 'blur' }
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
      queryFlowPage(params)
        .then(response => {
          let responseData = response.result
          this.total = responseData.total
          if (responseData.flowPage) {
            this.queryData = responseData.flowPage
          } else {
            this.queryData = []
          }
          this.searchLoading = false
        })
        .catch(error => {
          this.searchLoading = false
        })
    },

    handleChangeAutoSaveStatus(status) {
      sessionStorage.setItem('autoSave', status)
      console.log(sessionStorage.getItem('autoSave'))
    },

    handleOnSelectionChange(data) {
      this.selectionData = data
      console.log(data)
    },

    handleFlowVersionBatchSave() {
      if (this.selectionData.length === 0) {
        this.$Message.warning('请选择流程列表')
        return
      }
      let selectionFlowInfoIds = []
      for (let i = 0; i < this.selectionData.length; i++) {
        selectionFlowInfoIds[i] = this.selectionData[i].flowInfoId
      }
      let vm = this
      vm.$Modal.confirm({
        title: '一键打版',
        okText: '确定',
        cancelText: '取消',
        render: h => {
          return h('Input', {
            props: {
              value: this.versionRemark,
              autofocus: true,
              placeholder: '请输入版本备注'
            },
            on: {
              input: val => {
                this.versionRemark = val
              }
            }
          })
        },
        loading: true,
        onOk: () => {
          setTimeout(() => {
            let params = {
              flowInfoIds: selectionFlowInfoIds,
              remark: this.versionRemark
            }
            batchSaveFlowVersion(params)
              .then(response => {
                this.$Message.success('操作成功')
                this.$Modal.remove()
                this.$refs.flow.selectAll(false)
              })
              .catch(error => {
                console.log(error)
                this.$Message.error('操作失败')
              })
          }, 2000)
        }
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

    handleRenderAdd() {
      let vm = this
      flowRender.addFlowModel(vm)
    }
  }
}
</script>
<style lang="less">
@import '../../styles/common.less';
@import '../../styles/table.less';
</style>

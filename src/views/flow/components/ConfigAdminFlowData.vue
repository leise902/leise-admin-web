<template>
  <Card>
    <Card>
      <p slot="title" style="color:#f60;text-align:left">
        <Icon type="information-circled"></Icon>
        流程基本信息
      </p>
      <Form ref="flowInfoFormItem" :model="flowInfoFormItem" :label-width="100" inline>
        <FormItem label="模块编号">
          <Input v-model="flowInfoFormItem.moduleId" readonly></Input>
        </FormItem>
        <FormItem label="模块名称">
          <Input v-model="flowInfoFormItem.moduleName" readonly></Input>
        </FormItem>
        <FormItem label="流程编号">
          <Input v-model="flowInfoFormItem.flowId" readonly></Input>
        </FormItem>
        <FormItem label="流程名称">
          <Input v-model="flowInfoFormItem.flowName" readonly></Input>
        </FormItem>
        <FormItem label="流程版本号">
          <Input v-model="flowInfoFormItem.flowVersion" readonly></Input>
        </FormItem>
        <FormItem label="请求地址">
          <Input v-model="flowInfoFormItem.requestUrl" readonly></Input>
        </FormItem>
      </Form>
    </Card>
    <Card>
      <p slot="title" style="color:#f60;text-align:left">
        <Icon type="gear-b"></Icon>
        配置数据
      </p>
      <Form ref="formItem" :model="formItem" :rules="ruleValidate" :label-width="100" inline>
        <FormItem label="数据代码" prop='dataCode'>
          <Input v-model="formItem.dataCode" placeholder="请输入数据代码"></Input>
        </FormItem>
        <FormItem label="数据名称" prop='dataName'>
          <Input v-model="formItem.dataName" placeholder="请输入数据名称"></Input>
        </FormItem>
        <br>
        <FormItem label="是否输入项">
          <i-switch v-model="formItem.inputFlag">
            <span slot="open">是</span>
            <span slot="close">否</span>
          </i-switch>
        </FormItem>
        <FormItem label="是否输出项">
          <i-switch v-model="formItem.outputFlag">
            <span slot="open">是</span>
            <span slot="close">否</span>
          </i-switch>
        </FormItem>
        <FormItem label="是否集合列表">
          <i-switch v-model="formItem.collectFlag">
            <span slot="open">是</span>
            <span slot="close">否</span>
          </i-switch>
        </FormItem>
      </Form>
      <br>
      <span @click="handleFlowDataAdd" style="margin: 0px 10px;">
        <Button size="small" type="primary" icon="plus">添加</Button>
      </span>
      <span @click="handleFlowDataModfiy" style="margin: 0px 10px;">
        <Button size="small" type="primary" icon="edit">修改</Button>
      </span>
    </Card>
    <Card>
      <p slot="title" style="color:#f60;text-align:left">
        <Icon type="information-circled"></Icon>
        配置数据列表
      </p>
      <Row class="margin-top-10 searchable-table-con1">
        <Table highlight-row size="small" :columns="flowDataColumns" :data="flowDataPage" @on-row-click="handleSelectRow"></Table>
      </Row><br>
      <Row>
        <Page :total="total" :current="pageNum" :page-size="pageSize" show-sizer show-total @on-change="handleChangePage" @on-page-size-change="handleChangePagesize"></Page>
      </Row>
    </Card>
  </Card>
</template>
<script>
import {
  findFlowInfo,
  queryFlowDataPage,
  addFlowData,
  modifyFlowData,
  deleteFlowData
} from '@/api/designer.js'

// import { deleteFlowData } from '@/api/flow.js'
export default {
  name: 'configFlow',
  data() {
    return {
      flowDataId: '',
      formItem: {
        flowInfoId: this.flowInfoId,
        dataCode: '',
        dataName: '',
        inputFlag: false,
        outputFlag: false,
        collectFlag: false,
        collectDataCodes: ''
      },
      flowInfoFormItem: {
        moduleId: '',
        moduleName: '',
        flowId: '',
        flowName: '',
        flowVersion: '',
        requestUrl: ''
      },
      flowDataPage: [],
      flowDataColumns: [
        {
          type: 'index',
          title: '序号',
          width: 80
        },
        {
          key: 'dataCode',
          title: '数据代码'
        },
        {
          key: 'dataName',
          title: '数据名称'
        },
        {
          key: 'inputFlag',
          title: '是否输入参数'
        },
        {
          key: 'outputFlag',
          title: '是否输出参数'
        },
        {
          key: 'operation',
          title: '操作',
          width: 150,
          fixed: 'right',
          align: 'center',
          render: (h, params) => {
            return h('div', [
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
                      this.handleDeleteFlowData(params.row.id)
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
      total: 0,
      ruleValidate: {
        dataCode: [
          { required: true, message: '数据代码不能为空', trigger: 'blur' }
        ],
        dataName: [
          { required: true, message: '数据名称不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  props: ['flowInfoId'],
  methods: {
    init() {
      if (!this.flowInfoId) {
        this.$Message.warning('请输入流程ID')
        return
      }
      this.handleFindFlowInfo()
      this.handleQueryFlowDataPage()
    },

    handleFindFlowInfo() {
      let params = {
        flowInfoId: this.flowInfoId
      }
      findFlowInfo(params).then(response => {
        let responseData = response.result
        if (responseData) {
          this.flowInfoFormItem = responseData
        }
      })
    },

    handleQueryFlowDataPage() {
      let params = {
        flowInfoId: this.flowInfoId,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }
      queryFlowDataPage(params).then(response => {
        let responseData = response.result
        if (responseData) {
          this.flowDataPage = responseData.flowDataPage
          this.total = responseData.total
        }
      })
    },

    handleFlowDataAdd() {
      let params = this.formItem
      addFlowData(params)
        .then(response => {
          this.$Message.success('操作成功')
          this.handleReset()
          this.handleQueryFlowDataPage()
        })
        .catch(error => {
          this.$Message.success('操作失败')
        })
    },

    handleFlowDataModfiy() {
      let params = this.formItem
      params.flowDataId = this.flowDataId
      modifyFlowData(params)
        .then(response => {
          this.$Message.success('操作成功')
          this.handleReset()
          this.handleQueryFlowDataPage()
        })
        .catch(error => {
          this.$Message.success('操作失败')
        })
    },

    handleDeleteFlowData(data) {
      let params = {
        flowDataId: data
      }
      deleteFlowData(params)
        .then(response => {
          this.$Message.success('操作成功')
          this.handleReset()
          this.handleQueryFlowDataPage()
        })
        .catch(error => {
          this.$Message.success('操作失败')
        })
    },

    handleChangePage(pageNum) {
      this.pageNum = pageNum
      this.handleQueryFlowDataPage()
    },

    handleChangePagesize(pageSize) {
      this.pageSize = pageSize
      this.handleQueryFlowDataPage()
    },

    handleSelectRow(currentRow) {
      this.formItem = currentRow
      this.flowDataId = currentRow.id
    },

    handleReset() {
      this.$refs.formItem.resetFields()
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

<template>
  <Card>
    <Card>
      <p slot="title" style="color:#2D8CF0">
        <Icon type="information-circled"></Icon>
        模块信息
      </p>
      <Form ref="moduleInfoFormItem" :model="moduleInfoFormItem" :label-width="80" inline>
        <FormItem label="模块编号">
          <Input v-model="moduleInfoFormItem.moduleId" disabled></Input>
        </FormItem>
        <FormItem label="模块名称">
          <Input v-model="moduleInfoFormItem.moduleName" disabled></Input>
        </FormItem>
      </Form>
    </Card>
    <Card>
      <p slot="title" style="color:#2D8CF0">
        <Icon type="gear-a"></Icon>
        环境配置
      </p>
      <Form ref="formItem" :model="formItem" :rules="ruleValidate" :label-width="80" inline>
        <FormItem label="环境编号" prop='envId'>
          <Input v-model="formItem.envId" placeholder="请输入环境编号"></Input>
        </FormItem>
        <FormItem label="环境名称" prop='envName'>
          <Input v-model="formItem.envName" placeholder="请输入环境名称"></Input>
        </FormItem>
        <FormItem label="环境地址" prop='envAddress'>
          <Input v-model="formItem.envAddress" placeholder="请输入环境地址"></Input>
        </FormItem>
        <br>
        <FormItem>
          <span @click="handleModuleEnvAdd" style="margin: 0px 10px;">
            <Button size="small" type="primary" icon="plus">添加</Button>
          </span>
          <span @click="handleModuleEnvModfiy" style="margin: 0px 10px;">
            <Button size="small" type="primary" icon="edit">修改</Button>
          </span>
          <span @click="handleReset" style="margin: 0px 10px;">
            <Button size="small" type="primary" icon="edit">重置</Button>
          </span>
        </FormItem>
      </Form>
    </Card>
    <Card>
      <p slot="title" style="color:#2D8CF0">
        <Icon type="information-circled"></Icon>
        环境信息
      </p>
      <Row class="margin-top-10 searchable-table-con1">
        <Table highlight-row size="small" :columns="ModuleEnvColumns" :data="ModuleEnvPage" @on-row-click="handleSelectRow"></Table>
      </Row><br>
      <Row>
        <Page :total="total" :current="pageNum" :page-size="pageSize" show-sizer show-total @on-change="handleChangePage" @on-page-size-change="handleChangePagesize"></Page>
      </Row>
    </Card>
  </Card>
</template>
<script>
import {
  queryModuleInfo,
  queryModuleEnvPage,
  addModuleEnv,
  modifyModuleEnv,
  deleteModuleEnv
} from '@/api/module.js'
export default {
  name: 'configModuleEnv',
  data() {
    return {
      moduelEnvId: '',
      formItem: {
        envId: '',
        envName: '',
        envAddress: ''
      },
      moduleInfoFormItem: {
        moduleId: '',
        moduleName: ''
      },
      ModuleEnvPage: [],
      ModuleEnvColumns: [
        {
          type: 'index',
          title: '序号',
          width: 80
        },
        {
          key: 'moduleEnvId',
          title: '环境ID'
        },
        {
          key: 'envId',
          title: '环境编号'
        },
        {
          key: 'envName',
          title: '环境名称'
        },
        {
          key: 'envAddress',
          title: '环境地址'
        },
        {
          key: 'accessKey',
          title: '标识'
        },
        {
          key: 'operation',
          title: '操作',
          width: 80,
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
                      this.handleModuleEnvDelete(params.row.moduleEnvId)
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
        envId: [
          { required: true, message: '环境编号不能为空', trigger: 'blur' }
        ],
        envName: [
          { required: true, message: '环境名称不能为空', trigger: 'blur' }
        ],
        envAddress: [
          { required: true, message: '环境地址不能为空', trigger: 'blur' }
        ],
        flowSatus: [
          { required: true, message: '流程状态不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  props: ['moduleInfoId'],
  methods: {
    init() {
      this.handleQueryModuleInfo()
      this.handleQueryModuleEnvPage()
    },

    handleQueryModuleInfo() {
      if (!this.moduleInfoId) {
        return
      }
      let params = {
        moduleInfoId: this.moduleInfoId
      }
      queryModuleInfo(params).then(response => {
        let result = response.result
        if (result) {
          this.moduleInfoFormItem = result
        }
      })
    },

    handleQueryModuleEnvPage() {
      if (!this.moduleInfoId) {
        return
      }
      let params = {
        moduleInfoId: this.moduleInfoId,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }
      queryModuleEnvPage(params).then(response => {
        let result = response.result
        if (result) {
          this.ModuleEnvPage = result.moduleEnvPage
          this.total = result.total
        }
      })
    },

    handleModuleEnvAdd() {
      let params = this.formItem
      params.moduleInfoId = this.moduleInfoId
      addModuleEnv(params)
        .then(response => {
          this.$Message.success('操作成功')
          this.handleReset()
          this.handleQueryModuleEnvPage()
        })
        .catch(error => {
          this.$Message.success('操作失败')
        })
    },

    handleModuleEnvModfiy() {
      let params = this.formItem
      params.moduelEnvId = this.moduelEnvId
      modifyModuleEnv(params)
        .then(response => {
          this.$Message.success('操作成功')
          this.handleReset()
          this.handleQueryModuleEnvPage()
        })
        .catch(error => {
          this.$Message.success('操作失败')
        })
    },

    handleModuleEnvDelete(data) {
      let params = {
        moduleEnvId: data
      }
      deleteModuleEnv(params)
        .then(response => {
          this.$Message.success('操作成功')
          this.handleReset()
          this.handleQueryModuleEnvPage()
        })
        .catch(error => {
          this.$Message.success('操作失败')
        })
    },

    handleChangePage(pageNum) {
      this.pageNum = pageNum
      this.handleQueryModuleEnvPage()
    },

    handleChangePagesize(pageSize) {
      this.pageSize = pageSize
      this.handleQueryModuleEnvPage()
    },

    handleSelectRow(currentRow) {
      this.formItem = currentRow
      this.moduelEnvId = currentRow.moduleEnvId
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

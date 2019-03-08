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
        <FormItem>
          <span @click="handleSearch" style="margin: 0px 10px;">
            <Button type="primary" icon="search">搜索</Button>
          </span>
          <Button @click="handleReset" type="ghost">重置</Button>
        </FormItem>
      </Form>
    </Card>
    <br>
    <Card>
      <span @click="handleRenderAdd" style="margin: 0px 10px;">
        <Button type="primary" icon="plus">添加模块</Button>
      </span>
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
import { queryModulePage, deleteModuleInfo } from '@/api/module.js'
import moduleRender from './render/render.js'
import formatter from '@/libs/formatter'

export default {
  name: 'queryFlows',
  data() {
    return {
      searchLoading: false,
      total: 0,
      pageNum: 1,
      pageSize: 10,
      searchFormItem: {
        moduleId: '',
        moduleName: ''
      },
      id: '',
      moduleId: '',
      flowId: '',
      columns: [
        {
          type: 'index',
          title: '序号',
          width: 60
        },
        {
          key: 'moduleInfoId',
          title: '模块ID',
          width: 100
        },
        {
          key: 'moduleId',
          title: '模块编号',
          width: 160
        },
        {
          key: 'moduleName',
          title: '模块名称',
          width: 160
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
          align: 'center',
          render: (h, params) => {
            if (params.row.moduleId.indexOf('leise-provider-flow') === -1) {
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
                        this.handleRenderView(params.row.moduleInfoId)
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
                        this.handleRenderEdit(params.row.moduleInfoId)
                      }
                    }
                  },
                  '编辑'
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
                        this.handleDelete(params.row.moduleInfoId)
                      }
                    }
                  },
                  '删除'
                )
              ])
            }
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
      queryModulePage(params)
        .then(response => {
          let result = response.result
          this.total = result.total
          if (result.modulePage) {
            this.queryData = result.modulePage
          } else {
            this.queryData = []
          }
          this.searchLoading = false
        })
        .catch(error => {
          this.searchLoading = false
          console.log(error)
        })
    },

    handleRenderAdd() {
      let vm = this
      moduleRender.addModuleInfo(vm)
    },

    handleReset() {
      this.$refs.searchFormItem.resetFields()
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
      moduleRender.viewModuleInfo(vm, data)
    },

    handleRenderEdit(data) {
      let vm = this
      moduleRender.editModuleInfo(vm, data)
    },

    handleDelete(data) {
      let vm = this
      vm.$Modal.confirm({
        title: '删除流程',
        okText: '确定',
        cancelText: '取消',
        content: '<p>警告!删除此数据可能导致无法恢复!!!</p>',
        loading: true,
        onOk: () => {
          setTimeout(() => {
            let moduleInfoId = data
            let params = {
              moduleInfoId: moduleInfoId
            }
            deleteModuleInfo(params)
              .then(response => {
                this.$Message.success('操作成功')
                this.$Modal.remove()
              })
              .catch(error => {
                console.log(error)
                this.$Message.error('操作失败')
              })
          }, 2000)
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../styles/common.less';
@import '../../styles/table.less';
</style>

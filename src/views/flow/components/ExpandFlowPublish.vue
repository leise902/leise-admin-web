<template>
  <div>
    <Row class="expand-row">
      <p slot="title" style="color:#2D8CF0">
        <Icon type="information-circled"></Icon>
        环境信息
      </p>
      <Row class="margin-top-10 searchable-table-con1">
        <Table size="small" :columns="moduleEnvColumns" :data="moduleEnvList"></Table>
      </Row>
    </Row>
  </div>
</template>

<script>
import {
  queryFlowPublishEnvList,
  addFlowPublishInfo
} from '@/api/flow.js'
import flowRender from '../render/render.js'
import util from '@/libs/util'
import formatter from '@/libs/formatter'

export default {
  name: 'expandFlowPublish',
  data() {
    return {
      moduleEnvList: [],
      moduleEnvColumns: [
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
          title: 'accessKey'
        },
        {
          key: 'operation',
          title: '操作',
          align: 'center',
          render: (h, params) => {
            if (params.row.count === 0) {
              return h('div', [
                h(
                  'Button',
                  {
                    props: {
                      type: 'success',
                      size: 'small'
                    },
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      click: () => {
                        this.handleAddFlowPublishInfo(params.row.accessKey)
                      }
                    }
                  },
                  '发布'
                )
              ])
            }
          }
        }
      ],
      pageNum: 1,
      pageSize: 10,
      total: 0
    }
  },

  props: {
    row: {
      type: Object,
      required: true
    }
  },
  methods: {
    init() {
      this.handleSearch()
    },
    handleSearch() {
      let params = {
        moduleId: this.row.moduleId,
        version: this.row.version
      }
      this.searchLoading = true
      queryFlowPublishEnvList(params)
        .then(response => {
          let responseData = response.result
          if (responseData.moduleEnvList) {
            this.moduleEnvList = responseData.moduleEnvList
          } else {
            this.moduleEnvList = []
          }
          this.searchLoading = false
        })
        .catch(error => {
          this.searchLoading = false
        })
    },

    handleAddFlowPublishInfo(data) {
      let vm = this
      vm.$Modal.confirm({
        title: '发布流程确认',
        okText: '确定',
        cancelText: '取消',
        content: '<p>您将要进行的操作是：发布流程</p>',
        loading: true,
        onOk: () => {
          setTimeout(() => {
            let version = this.row.version
            let accessKey = data
            let params = {
              version: version,
              accessKey: accessKey
            }
            addFlowPublishInfo(params)
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
  },

  created() {
    this.init()
  }
}
</script>

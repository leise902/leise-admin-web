<template>
  <Card>
    <Row class="margin-top-10 searchable-table-con1">
      <Table highlight-row size="small" :columns="flowDataColumns" :data="flowDataPage"></Table>
    </Row><br>
    <Row>
      <Page :total="total" :current="pageNum" :page-size="pageSize" show-sizer show-total @on-change="handleChangePage" @on-page-size-change="handleChangePagesize"></Page>
    </Row>
  </Card>
</template>
<script>
import { queryFlowDataPage } from '@/api/flow.js'
import message from '@/libs/message.js'
export default {
  name: 'viewFlowData',
  data() {
    return {
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
        }
      ],
      pageNum: 1,
      pageSize: 10,
      total: 0
    }
  },

  props: {
    flowInfoId: {
      type: Number,
      required: true
    }
  },

  methods: {
    handleQueryFlowDataPage() {
      let params = {
        flowInfoId: this.flowInfoId,
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }
      queryFlowDataPage(params)
        .then(response => {
          let result = response.result
          this.flowDataPage = result.flowDataPage
          this.total = result.total
        })
        .catch(error => {
          this.$Message.error(message.system_error)
        })
    },

    handleChangePage(pageNum) {
      this.pageNum = pageNum
      this.handleQueryFlowDataPage()
    },

    handleChangePagesize(pageSize) {
      this.pageSize = pageSize
      this.handleQueryFlowDataPage()
    }
  },

  created() {
    this.handleQueryFlowDataPage()
  }
}
</script>

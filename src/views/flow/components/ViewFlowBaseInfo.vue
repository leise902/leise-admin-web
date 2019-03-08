<template>
    <Form :model="formItem" :label-width="100">
        <Row>
            <Col span="12">
            <FormItem label="模块编号">
                <Input v-model="formItem.moduleId" readonly />
            </FormItem>
            </Col>
            <Col span="12">
            <FormItem label="模块名称">
                <Input v-model="formItem.moduleName" readonly />
            </FormItem>
            </Col>
        </Row>
        <Row>
            <Col span="12">
            <FormItem label="流程编号">
                <Input v-model="formItem.flowId" readonly />
            </FormItem>
            </Col>
            <Col span="12">
            <FormItem label="流程名称">
                <Input v-model="formItem.flowName" readonly />
            </FormItem>
            </Col>
        </Row>
        <Row>
            <Col span="12">
            <FormItem label="流程版本号">
                <Input v-model="formItem.flowVersion" readonly />
            </FormItem>
            </Col>
            <Col span="12">
            <FormItem label="流程状态">
                <Input v-model="formItem.status" readonly />
            </FormItem>
            </Col>
        </Row>
        <Row>
            <Col span="12">
            <FormItem label="请求地址">
                <Input v-model="formItem.requestUrl" readonly />
            </FormItem>
            </Col>
        </Row>
        <Row>
            <Col span="12">
            <FormItem label="创建时间">
                <Input v-model="formItem.createTime" readonly />
            </FormItem>
            </Col>
            <Col span="12">
            <FormItem label="修改时间">
                <Input v-model="formItem.modifyTime" readonly />
            </FormItem>
            </Col>
        </Row>
    </Form>
</template>
<script>
import { queryFlowBaseInfo } from '@/api/flow.js'
import message from '@/libs/message.js'
export default {
  name: 'viewFlowBaseInfo',
  data() {
    return {
      formItem: {}
    }
  },

  props: {
    flowInfoId: {
      type: Number,
      required: true
    }
  },

  methods: {
    handleQueryFlowBaseInfo() {
      let params = {
        flowInfoId: this.flowInfoId
      }
      queryFlowBaseInfo(params)
        .then(response => {
          let queryData = response.result
          this.formItem = queryData
        })
        .catch(error => {
          this.$Message.error(message.system_error)
        })
    }
  },

  created() {
    this.handleQueryFlowBaseInfo()
  }
}
</script>

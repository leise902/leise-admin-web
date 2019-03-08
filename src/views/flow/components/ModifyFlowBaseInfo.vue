<template>
  <Card>
    <p slot="title" style="color:#2D8CF0">
      <Icon type="plus-circled"></Icon>
      编辑流程
    </p>
    <Form ref="formItem" :model="formItem" :rules="ruleValidate" :label-width="100">
      <Row>
        <Col span="12">
        <FormItem label="流程ID">
          <Input v-model="this.flowInfoId" disabled/>
        </FormItem>
        </Col>
        <Col span="12">
        <FormItem label="流程状态">
          <Input v-model="formItem.status" disabled/>
        </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
        <FormItem label="模块编号" prop="moduleId">
          <Input v-model="formItem.moduleId" />
        </FormItem>
        </Col>
        <Col span="12">
        <FormItem label="模块名称" prop="moduleName">
          <Input v-model="formItem.moduleName" />
        </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
        <FormItem label="流程编号" prop="flowId">
          <Input v-model="formItem.flowId" />
        </FormItem>
        </Col>
        <Col span="12">
        <FormItem label="流程名称" prop="flowName">
          <Input v-model="formItem.flowName" />
        </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="12">
        <FormItem label="流程版本号" prop="flowVersion">
          <Input v-model="formItem.flowVersion" />
        </FormItem>
        </Col>
        <Col span="12">
        <FormItem label="请求地址" prop="requestUrl">
          <Input v-model="formItem.requestUrl" />
        </FormItem>
        </Col>
      </Row>
    </Form>
    <span @click="handleConfirm" style="margin: 0px 10px;">
      <Button type="primary" icon="edit">保存</Button>
    </span>
  </Card>
</template>
<script>
import { queryFlowBaseInfo, modifyFlowBaseInfo } from '@/api/flow.js'
import message from '@/libs/message.js'
export default {
  name: 'modifyFlowBaseInfo',
  data() {
    return {
      formItem: {},
      ruleValidate: {
        moduleId: [
          { required: true, message: '模块编号不能为空', trigger: 'blur' }
        ],
        moduleName: [
          { required: true, message: '模块名称不能为空', trigger: 'blur' }
        ],
        flowId: [
          { required: true, message: '流程编号不能为空', trigger: 'blur' }
        ],
        flowName: [
          { required: true, message: '流程名称不能为空', trigger: 'blur' }
        ],
        flowVersion: [
          { required: true, message: '流程版本号不能为空', trigger: 'blur' }
        ],
        requestUrl: [
          { required: true, message: '请求地址不能为空', trigger: 'blur' }
        ]
      }
    }
  },

  props: ['flowInfoId'],

  methods: {
    init() {
      this.handleQueryFlowBaseInfo()
    },

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
    },

    handleConfirm() {
      this.$refs.formItem.validate(valid => {
        if (valid) {
          let params = this.formItem
          params.flowModelId = this.flowModelId
          modifyFlowBaseInfo(params)
            .then(response => {
              this.$Message.success('操作成功')
            })
            .catch(error => {
              console.log(error)
              this.$Message.error('操作失败')
            })
        }
      })
    }
  },

  mounted() {
    this.init()
  }
}
</script>

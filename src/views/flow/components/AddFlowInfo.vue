<template>
  <Card>
    <p slot="title" style="color:#2D8CF0">
      <Icon type="plus-circled"></Icon>
      新建流程
    </p>
    <Form ref="formItem" :model="formItem" :rules="ruleValidate" :label-width="100" inline>
      <FormItem label="模块名称">
        <Select v-model="formItem.moduleInfoId" @on-change="handleChangeSelectModule(formItem.moduleInfoId)" filterable>
          <Option v-for="item in moduleInfoList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </FormItem><br>
      <FormItem label="模块ID" prop="moduleInfoId">
        <Input v-model="formItem.moduleInfoId" readonly/>
      </FormItem>
      <FormItem label="模块编号" prop="moduleId">
        <Input v-model="formItem.moduleId" readonly/>
      </FormItem>
      <FormItem label="流程编号" prop="flowId">
        <Input v-model="formItem.flowId" />
      </FormItem>
      <FormItem label="流程名称" prop="flowName">
        <Input v-model="formItem.flowName" />
      </FormItem>
      <FormItem label="流程版本号" prop="flowVersion">
        <Input v-model="formItem.flowVersion" />
      </FormItem>
      <FormItem label="请求地址" prop="requestUrl">
        <Input v-model="formItem.requestUrl" />
      </FormItem>
    </Form>
    <span @click="handleSave" style="margin: 0px 10px;">
      <Button type="primary" icon="search">保存</Button>
    </span>
    <Button @click="handleReset" type="ghost">重置</Button>
  </Card>
</template>
<script>
import { addFlowInfo } from '@/api/flow.js'
import { queryModuleInfoList } from '@/api/module.js'
import message from '@/libs/message.js'
export default {
  name: 'viewFlowModel',
  data() {
    return {
      formItem: {},

      moduleInfoList: [],

      moduleInfoMap: [],

      ruleValidate: {
        moduleInfoId: [
          {
            required: true,
            message: '模块ID不能为空',
            trigger: 'blur',
            type: 'number'
          }
        ],
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

  methods: {
    init() {
      this.handleQueryModuleInfoList()
    },

    handleQueryModuleInfoList() {
      let params = {}
      queryModuleInfoList(params)
        .then(response => {
          let result = response.result
          result.moduleInfoList.forEach(item => {
            this.moduleInfoList.push({
              label: item.moduleName,
              value: item.moduleInfoId
            })
            this.moduleInfoMap[item.moduleInfoId] = item
          })
        })
        .catch(error => {
          console.log(error)
        })
    },

    handleSave() {
      this.$refs.formItem.validate(valid => {
        if (valid) {
          let params = this.formItem
          addFlowInfo(params)
            .then(response => {
              this.$Message.success('操作成功')
            })
            .catch(error => {
              console.log(error)
              this.$Message.error('操作失败')
            })
        }
      })
    },

    handleReset() {
      this.$refs.formItem.resetFields()
    },

    handleChangeSelectModule(moduleInfoId) {
      if (moduleInfoId) {
        this.formItem.moduleId = this.moduleInfoMap[moduleInfoId].moduleId
      }
    }
  },

  mounted() {
    this.init()
  }
}
</script>

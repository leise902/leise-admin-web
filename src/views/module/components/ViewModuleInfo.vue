<template>
  <Card>
    <p slot="title" style="color:#2D8CF0">
      <Icon type="eye"></Icon>
      查看模块信息
    </p>
    <Form ref="formItem" :model="formItem" :label-width="100" inline>
      <FormItem label="模块编号">
        <Input v-model="formItem.moduleId" readonly/>
      </FormItem>
      <FormItem label="模块名称">
        <Input v-model="formItem.moduleName" readonly/>
      </FormItem>
      <FormItem label="模块描述">
        <Input v-model="formItem.moduleDesc" readonly/>
      </FormItem>
    </Form>
  </Card>
</template>
<script>
import { queryModuleInfo } from '@/api/module.js'
import message from '@/libs/message.js'
export default {
  name: 'viewModuleInfo',
  data() {
    return {
      formItem: {}
    }
  },

  props: ['moduleInfoId'],

  methods: {
    init() {
      this.handleQueryModuleInfo()
    },

    handleQueryModuleInfo() {
      let params = {
        moduleInfoId: this.moduleInfoId
      }
      queryModuleInfo(params)
        .then(response => {
          if (response.result) {
            this.formItem = response.result
          }
        })
        .catch(error => {
          console.log(error)
          this.$Message.error('查询失败')
        })
    }
  },

  mounted() {
    this.init()
  }
}
</script>

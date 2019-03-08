<template>
    <Card>
        <p slot="title" style="color:#2D8CF0">
            <Icon type="plus-circled"></Icon>
            新建模块
        </p>
        <Form ref="formItem" :model="formItem" :rules="ruleValidate" :label-width="100" inline>
            <FormItem label="模块编号" prop="moduleId">
                <Input v-model="formItem.moduleId" />
            </FormItem>
            <FormItem label="模块名称" prop="moduleName">
                <Input v-model="formItem.moduleName" />
            </FormItem>
            <FormItem>
                <span @click="handleSave" style="margin: 0px 10px;">
                    <Button type="primary" icon="filing">保存</Button>
                </span>
                <Button @click="handleReset" type="ghost">重置</Button>
            </FormItem>
        </Form>
    </Card>
</template>
<script>
import { addModuleInfo } from '@/api/module.js'
import message from '@/libs/message.js'
export default {
  name: 'viewFlowModel',
  data() {
    return {
      formItem: {},
      ruleValidate: {
        moduleId: [
          { required: true, message: '模块编号不能为空', trigger: 'blur' }
        ],
        moduleName: [
          { required: true, message: '模块名称不能为空', trigger: 'blur' }
        ]
      }
    }
  },

  methods: {
    handleSave() {
      this.$refs.formItem.validate(valid => {
        if (valid) {
          let params = this.formItem
          addModuleInfo(params)
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
    }
  }
}
</script>

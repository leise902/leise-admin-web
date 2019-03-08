<template>
  <Form :ref="refId" :model="form" :rules="rules" :label-width="100" inline>
    <FormItem :prop="formItem.code" :key="formItem.code" :label="formItem.label || ''" v-for="formItem in formItems">
      <Input v-if="formItem.type === 'Input'" v-model="form[formItem.code]" :icon="formItem.icon || ''" :placeholder="formItem.placeholder" />
    </FormItem>
  </Form>
</template>
<script>
import guid from '@/libs/guid'
export default {
  name: 'SearchForm',
  props: {
    formItems: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      refId: guid.genGUID(),
      form: {}
    }
  },
  computed: {
    rules() {
      let rules = {}
      let formItems = this.formItems
      for (let i = 0; i < formItems.length; i++) {
        let formItem = formItems[i]
        let code = formItem.code
        let rule = formItem.rules
        rules[code] = rule
      }
      return rules
    }
  },
  methods: {
    handleSubmit() {
      this.$refs[refId].validate(valid => {
        if (valid) {
          this.$emit('on-search', this.form)
        }
      })
    },
    handleReset() {
      this.$refs.form.resetFields()
    }
  },
  mounted() {}
}
</script>

<style lang="less" scoped>
@import '../../styles/common.less';
@import '../../styles/table.less';
</style>

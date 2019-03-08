<template>
  <!-- <form-generator :ref="refId" :items="items" v-model="formData" />
    <p>
      Hello {{formData.title}} {{formData.firstName}} {{formData.lastName}}, I hear you are {{formData.age}} years old.
    </p> -->
  <Form :ref="refId" :model="formData" :rules="rules" :label-width="100" inline>
    <FormItem :prop="item.code" :key="item.code" :label="item.label || ''" v-for="item in items">
      <Input v-if="item.type === 'Input'" v-model="formData[item.code]" v-bind="item.props || {}" />
      <Select v-if="item.type === 'Select'" v-model="formData[item.code]" clearable style="width:200px" v-bind="item.props || {}">
        <Option v-for="option in item.options" :value="option.value" :key="option.value">{{ option.label }}</Option>
      </Select>
    </FormItem>
    <FormItem>
      <Button @click="handleSubmit" type='primary' icon="md-search">查询</Button>
      <Button @click="handleReset" icon='md-beaker' style="margin: 0px 5px;">重置</Button>
    </FormItem>
  </Form>
  <!-- <Form :ref="refId" :model="formData" :rules="rules" :label-width="100" inline>
    <FormItem :prop="item.code" :key="index" v-for="(item, index) in items" :label="item.label || ''">
      <component :key="index" :is="item.type" v-model="formData[item.code]" v-bind="item.props || {}">
      </component>
    </FormItem>
    <FormItem>
      <Button @click="handleSubmit" type='primary' icon="md-search">查询</Button>
      <Button @click="handleReset" icon='md-beaker' style="margin: 0px 5px;">重置</Button>
    </FormItem>
  </Form> -->
</template>
<script>
import guid from '@/libs/guid'
import formatter from '@/libs/formatter'
import FormGenerator from '../form-generator'
export default {
  name: 'SearchForm',
  components: {
    FormGenerator
  },
  props: {
    items: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      refId: guid.genGUID(),
      options: [],
      formData: {}
    }
  },
  computed: {
    rules() {
      let rules = {}
      let items = this.items
      for (let i = 0; i < items.length; i++) {
        let item = items[i]
        if (item.rules) {
          let code = item.code
          let rule = item.rules
          rules[code] = rule
        }
      }
      return rules
    }
  },
  methods: {
    handleSubmit() {
      this.$refs[this.refId].validate(valid => {
        if (valid) {
          this.$emit('on-search', this.formData)
        }
      })
    },
    handleReset() {
      this.$refs[this.refId].resetFields()
      this.formData = {}
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../styles/common.less';
@import '../../styles/table.less';
</style>

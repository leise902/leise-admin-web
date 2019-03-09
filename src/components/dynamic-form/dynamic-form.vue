<template>
  <Form :model="formData" :rules="rules" :label-width="100" inline>
    <FormItem :prop="item.code" :key="item.code" :label="item.label || ''" v-for="item in items">
      <Input v-if="item.type === 'Input'" v-model="formData[item.code]" v-bind="item.props || {}" />
      <Select v-if="item.type === 'Select'" v-model="formData[item.code]" clearable style="width:200px" v-bind="item.props || {}">
        <Option v-for="option in item.options" :value="option.value" :key="option.value">{{ option.label }}</Option>
      </Select>
    </FormItem>
  </Form>
</template>

<script>
export default {
  name: 'DynamicForm',
  props: ['items', 'value'],
  data() {
    return {
      formData: this.value || {}
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
    
  }
}
</script>

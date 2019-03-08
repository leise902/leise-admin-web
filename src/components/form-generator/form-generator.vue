<template>
  <div>
    <Form inline>
      <FormItem :key="index" v-for="(item, index) in items" :label="item.label || ''" label-width="100">
        <component :key="index" :is="item.type" v-model="formData[item.code]" v-bind="item.props || {}">
        </component>
      </FormItem>
    </Form>
  </div>
</template>

<script>
export default {
  name: 'FormGenerator',
  props: ['items', 'value'],
  data() {
    return {
      formData: this.value || {}
    }
  },
  methods: {

  }
}
</script>

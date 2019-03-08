<template>
  <Form :ref="refId" inline>
    <span :key="actionItem.code" v-for="actionItem in actionItems">
      <Button @click="handleClick(actionItem.event)" :type="actionItem.type" style="margin: 0px 5px;">{{actionItem.text}}</Button>
    </span>
  </Form>
</template>
<script>
import guid from '@/libs/guid'
export default {
  name: 'ToolBar',
  props: {
    actionItems: {
      type: Array,
      default: []
    },
    context: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      refId: guid.genGUID()
    }
  },
  methods: {
    handleClick(eventName) {
      let parent = this.context._self
      eval('parent.' + eventName + '()')
    }
  }
}
</script>

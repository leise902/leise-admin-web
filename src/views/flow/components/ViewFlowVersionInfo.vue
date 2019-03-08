<template>
    <Card>
        <p slot="title" style="color:#2D8CF0">
            <Icon type="eye"></Icon>
            查看流程信息
        </p>
        <Tabs type="card">
            <Tab-pane label="流程基本信息">
                <ViewFlowVersionBaseInfo :version="version"></ViewFlowVersionBaseInfo>
            </Tab-pane>
            <Tab-pane label="流程数据定义">
                <ViewFlowVersionData :version="version"></ViewFlowVersionData>
            </Tab-pane>
        </Tabs>
    </Card>
</template>

<script>
import ViewFlowVersionBaseInfo from './ViewFlowVersionBaseInfo.vue'
import ViewFlowVersionData from './ViewFlowVersionData.vue'
export default {
  name: 'viewFlowInfo',
  data () {
    return {}
  },

  props: {
    version: {
      type: String,
      required: true
    }
  },

  components: {
    ViewFlowVersionBaseInfo,
    ViewFlowVersionData
  }
}
</script>

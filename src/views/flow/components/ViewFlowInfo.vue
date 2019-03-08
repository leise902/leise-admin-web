<template>
    <Card>
        <p slot="title" style="color:#2D8CF0">
            <Icon type="eye"></Icon>
            查看流程信息
        </p>
        <Tabs type="card">
            <Tab-pane label="流程基本信息">
                <ViewFlowBaseInfo :flowInfoId="flowInfoId"></ViewFlowBaseInfo>
            </Tab-pane>
            <Tab-pane label="流程数据定义">
                <ViewFlowData :flowInfoId="flowInfoId"></ViewFlowData>
            </Tab-pane>
        </Tabs>
    </Card>
</template>

<script>
import ViewFlowBaseInfo from './ViewFlowBaseInfo.vue'
import ViewFlowData from './ViewFlowData.vue'
export default {
  name: 'viewFlowInfo',
  data () {
    return {}
  },

  props: {
    flowInfoId: {
      type: Number,
      required: true
    }
  },

  components: {
    ViewFlowBaseInfo,
    ViewFlowData
  }
}
</script>

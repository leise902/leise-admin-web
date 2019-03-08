<template>
  <div>
    <Card>
      <Tabs type="card">
        <TabPane v-for="tab in tabs" :key="tab" :label="'标签' + tab">
          <div style="width: 100%; display: flex; justify-content: space-between">
            <div id="displayDiagramDiv" style="flex-grow: 1; height: 600px; border: solid 1px black"></div>
            <span style="display: inline-block; vertical-align: top; margin-left: 2px; margin-right: 2px;">
              <Collapse v-model="inspectorPanels">
                <Panel name="1" style="width: 280px; background-color: #DAE4E4;">
                  流程基本信息:
                  <div slot="content">
                    <div id="inspectorDiv1" class="inspector"></div>
                  </div>
                </Panel>
                <Panel name="2" style="width: 280px; background-color: #DAE4E4;">
                  组件配置信息:
                  <div slot="content">
                    <div id="inspectorDiv2" class="inspector"></div>
                  </div>
                </Panel>
              </Collapse>
            </span>
          </div>
        </TabPane>
        <Button type="ghost" @click="handleTabsAdd" size="small" slot="extra">增加</Button>
      </Tabs>
    </Card>
  </div>
</template>
<script>
import { FlowDiagram } from './render/diagram.js'
import { queryFlowBizlogic } from '@/api/flow.js'

export default {
  name: 'viewFlowBizlogic',
  data() {
    return {
      tabs: 1,
      inspectorPanels: ['1', '2'],
      flowModelId: '',
      flowDiagram: {}
    }
  },

  methods: {
    init() {
      this.flowDiagram = new FlowDiagram('displayDiagramDiv')
      this.flowDiagram.createModelInspector('inspectorDiv1')
      this.flowDiagram.createActionInspector('inspectorDiv2')
      this.handleQueryFlowModelInfo()
    },

    handleTabsAdd() {
      this.tabs++
    },

    handleQueryFlowModelInfo() {
      var flowInfoId = this.$route.params.flowInfoId
      let params = {
        flowInfoId: flowInfoId
      }
      queryFlowBizlogic(params)
        .then(response => {
          let result = response.result
          if (result.flowModelInfo) {
            this.flowDiagram.show(result.flowModelInfo)
            this.flowDiagram.createModelInspector('inspectorDiv1')
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
  },

  mounted() {
    this.init()
  }
}
</script>
<style scoped>
@import './render/inspector.css';
</style>

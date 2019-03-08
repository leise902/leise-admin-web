<template>
  <div>
    <Card>
      <span @click="handleMakeSvg()" style="margin: 0px 5px;">
        <Button type="primary" icon="eye">预览</Button>
      </span>
      <Modal v-model="showPreviewModal" cancel-text="" width="auto">
        <p slot="header" style="color:#f60;text-align:left">
          <Icon type="information-circled"></Icon>
          <span>查看流程图</span>
        </p>
        <div ref="SVGArea"></div>
      </Modal>
      <span @click="handleViewCode()" style="margin: 0px 5px;">
        <Button type="primary" icon="eye">源代码</Button>
      </span>
      <Modal v-model="showViewCodeModal" cancel-text="">
        <p slot="header" style="color:#f60;text-align:left">
          <Icon type="information-circled"></Icon>
          <span>查看源代码</span>
        </p>
        <Input v-model="sourceCode" :autosize="{minRows: 10, maxRows: 20}" type="textarea" readonly></Input>
      </Modal>
      <span @click="handleSaveFlowBizlogic()" style="margin: 0px 5px;">
        <Button type="primary" icon="filing">保存流程</Button>
      </span>
      <span @click="handleSaveFlowVersion()" style="margin: 0px 5px;">
        <Button type="primary" icon="filing">保存版本记录</Button>
      </span>
      <span @click="handleRenderConfigFlowData()" style="margin: 0px 10px;">
        <Button type="primary" icon="gear-b">配置数据定义</Button>
      </span>
    </Card>
    <Card>
      <div style="width: 100%; display: flex; justify-content: space-between">
        <!-- // TODO 这里使用iview的折叠面板 Collapse 加载组件面板存在问题, 需要手动放大或缩小页面才能显示组件, 需要后期改进 -->
        <Collapse accordion>
          <Panel :name="index + ''" v-for="(actionGroup, group, index) in actionGroupMap" :key="group" style="width: 240px; margin-right: 2px; background-color: #DAE4E4;">
            {{handleActionGroupName(group)}}
            <div slot="content">
              <div :id="'paletteDiv' + index" style="height: 240px; background-color: #DAE4E4;"></div>
            </div>
          </Panel>
        </Collapse>

        <div id="leiseDiagramDiv" style="flex-grow: 1; height: 600px; border: solid 1px black"></div>
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
    </Card>
  </div>
</template>
<script>
import { queryActions } from '@/api/designer.js'
import {
  queryFlowBizlogic,
  saveFlowBizlogic,
  saveFlowVersion
} from '@/api/flow.js'
import { FlowDiagram } from './render/diagram.js'
import flowRender from './render/render.js'

export default {
  name: 'designFlowBizlogic',
  data() {
    return {
      searchInputReadonly: false,
      showPreviewModal: false,
      showAddDiagramModal: false,
      showViewCodeModal: false,
      showViewFlowDataModal: false,
      inspectorPanels: ['1', '2'],
      actionGroupMap: {},
      actionGroupNameMap: {
        FLOW: '基本流程组件',
        DATABASE: '数据库组件',
        FILE: '文件操作组件',
        COMMU: '通讯组件',
        CACHE: '缓存组件',
        OPERATION: '数据操作组件',
        VALIDATE: '数据验证组件',
        ENCRYPT: '加密解密组件'
      },
      flowDiagram: {},
      formItem: {
        moduleId: '',
        moduleName: '',
        flowId: '',
        flowName: '',
        flowVersion: '',
        requestUrl: ''
      },
      sourceCode: ''
    }
  },

  methods: {
    init() {
      this.flowDiagram = new FlowDiagram('leiseDiagramDiv')
      this.initPalette()
      this.flowDiagram.createModelInspector('inspectorDiv1', true)
      this.flowDiagram.createActionInspector('inspectorDiv2')
      this.handleQueryFlowModelInfo()
    },

    initPalette() {
      let params = {
        moduleId: this.moduleId
      }
      queryActions(params)
        .then(response => {
          let responseData = response.result
          this.actionGroupMap = responseData
          this.$nextTick(function() {
            let tempMap = this.actionGroupMap
            let index = 0
            for (let key in tempMap) {
              let value = tempMap[key]
              this.flowDiagram.createPalette('paletteDiv' + index, value)
              index++
            }
          })
        })
        .catch(error => {
          console.log(error)
        })
    },

    handleActionGroupName(key) {
      return this.actionGroupNameMap[key]
    },

    handleQueryFlowModelInfo() {
      let flowInfoId = this.$route.params.flowInfoId
      let params = {
        flowInfoId: flowInfoId
      }
      queryFlowBizlogic(params)
        .then(response => {
          let result = response.result
          if (result.flowModelInfo) {
            this.flowDiagram.show(result.flowModelInfo)
            this.flowDiagram.createModelInspector('inspectorDiv1', true)
          }
        })
        .catch(error => {
          console.log(error)
        })
    },

    handleMakeSvg() {
      let obj = this.$refs.SVGArea
      let svg = this.flowDiagram.makeSvg()
      obj.appendChild(svg)
      if (obj.children.length > 0) {
        obj.replaceChild(svg, obj.children[0])
      }
      this.showPreviewModal = true
    },

    handleSaveFlowBizlogic() {
      let params = JSON.parse(this.flowDiagram.load())
      saveFlowBizlogic(params)
        .then(response => {
          this.$Message.success('操作成功')
          if (sessionStorage.getItem('autoSave') !== 'false') {
            this.handleSaveFlowVersion()
          }
        })
        .catch(error => {
          console.log(error)
          this.$Message.error('操作失败')
        })
    },

    handleSaveFlowVersion() {
      let flowInfoId = this.$route.params.flowInfoId
      let params = {
        flowInfoId: flowInfoId
      }
      saveFlowVersion(params)
        .then(response => {
          this.$Message.success('操作成功')
        })
        .catch(error => {
          console.log(error)
          this.$Message.error('操作失败')
        })
    },

    handleViewCode() {
      this.sourceCode = this.flowDiagram.load()
      this.showViewCodeModal = true
    },

    handleRenderConfigFlowData() {
      let vm = this
      let data = this.$route.params.flowInfoId
      flowRender.configFlowData(vm, data)
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

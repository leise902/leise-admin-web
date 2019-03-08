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
      <span @click="handleRenderAddFlowInfo()" style="margin: 0px 5px;">
        <Button type="primary" icon="plus-round">新建流程</Button>
      </span>
      <Modal v-model="showAddFlowInfoModal" :closable="false" :mask-closable="false" @on-ok="handleAddFlowInfo">
        <p slot="header" style="color:#f60;text-align:left">
          <Icon type="information-circled"></Icon>
          <span>新建流程</span>
        </p>
        <Form ref="formItem" :model="formItem" :label-width="100">
          <FormItem label="模块编号">
            <Input v-model="formItem.moduleId" placeholder="请输入模块编号"></Input>
          </FormItem>
          <FormItem label="模块名称">
            <Input v-model="formItem.moduleName" placeholder="请输入模块名称"></Input>
          </FormItem>
          <FormItem label="流程编号">
            <Input v-model="formItem.flowId" placeholder="请输入流程编号"></Input>
          </FormItem>
          <FormItem label="流程名称">
            <Input v-model="formItem.flowName" placeholder="请输入流程名称"></Input>
          </FormItem>
          <FormItem label="流程版本号">
            <Input v-model="formItem.flowVersion" placeholder="请输入流程版本号"></Input>
          </FormItem>
          <FormItem label="请求地址">
            <Input v-model="formItem.requestUrl" placeholder="请输入请求地址"></Input>
          </FormItem>
        </Form>
      </Modal>
      <span @click="handleSaveDiagram()" style="margin: 0px 5px;">
        <Button type="primary" icon="filing">保存流程</Button>
      </span>
      <span @click="handleSaveDiagramWithVersion()" style="margin: 0px 5px;">
        <Button type="primary" icon="filing">保存并保留修改记录</Button>
      </span>
      <span @click="handleRenderConfigAdminFlowData()" style="margin: 0px 5px;">
        <Button type="primary" icon="filing">配置数据定义</Button>
      </span>
      <span @click="handleClearFlowCache()" style="margin: 0px 5px;">
        <Button type="primary" icon="filing">清理缓存</Button>
      </span>
      <span style="width:400px; display:inline-block;">
        <Cascader :data="flowInfoList" @on-change="handleCascaderChange"></Cascader>
      </span>
    </Card>
    <Card>
      <div style="width: 100%; display: flex; justify-content: space-between">
        <!-- // TODO 这里使用iview的折叠面板 Collapse 加载组件面板存在问题, 需要手动放大或缩小页面才能显示组件, 需要后期改进 -->
        <Card>
          <Collapse accordion @on-change="handleCollapsePanelChange">
            <Panel :name="group" v-for="(actionGroup, group) in actionGroupMap" :key="group" style="width: 240px; margin-right: 2px; background-color: #DAE4E4;">
              {{handleActionGroupName(group)}}
              <div slot="content">
                <div :id="group" style="height: 240px; background-color: #DAE4E4;"></div>
              </div>
            </Panel>
          </Collapse>
        </Card>
        <div id="diagramDiv" style="flex-grow: 1; height: 600px; border: solid 1px black"></div>
        <span style="display: inline-block; vertical-align: top; margin-left: 2px; margin-right: 2px;">
          <Collapse v-model="inspectorPanels">
            <Panel name="1" style="width: 350px; background-color: #DAE4E4;">
              流程基本信息:
              <div slot="content">
                <div id="modelInspectorDiv" class="inspector"></div>
              </div>
            </Panel>
            <Panel name="2" style="width: 350px; background-color: #DAE4E4;">
              组件配置信息:
              <div slot="content">
                <div id="actionInspectorDiv" class="inspector"></div>
              </div>
            </Panel>
          </Collapse>
        </span>
      </div>
    </Card>
  </div>
</template>
<script>
import { FlowDiagram } from '../render/diagram.js'
import {
  getActions,
  searchFlowInfoList,
  addFlowInfo,
  updateFlowModel,
  findFlowModel,
  clearFlowCache
} from '@/api/designer.js'
import flowRender from '../render/render.js'
import { on, off } from '@/libs/tools'
import formatter from '@/libs/formatter'

export default {
  name: 'FlowDesigner',
  data() {
    return {
      searchInputReadonly: false,
      showPreviewModal: false,
      showAddFlowInfoModal: false,
      showViewCodeModal: false,
      showViewFlowDataModal: false,
      inspectorPanels: ['1', '2'],
      actionGroupMap: null,
      actionGroupKeys: [],
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
      flowInfoList: [],
      flowInfoId: '',
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
      this.flowDiagram = new FlowDiagram('diagramDiv')
      this.initActionGroupMap()
      this.initFlowInfoList()
      this.flowDiagram.createModelInspector('modelInspectorDiv')
      this.flowDiagram.createActionInspector('actionInspectorDiv')
    },

    initActionGroupMap() {
      let params = {
        moduleId: this.moduleId
      }
      getActions(params)
        .then(response => {
          let responseData = response.result
          this.actionGroupMap = responseData
        })
        .catch(error => {
          console.log(error)
        })
    },

    initFlowInfoList() {
      let params = {}
      searchFlowInfoList(params)
        .then(response => {
          let responseData = response.result
          this.flowInfoList = formatter.formatCascaderList(
            responseData.list,
            ['moduleId', 'flowInfoId'],
            ['moduleName', ['flowName', 'flowId', 'flowVersion']]
          )
        })
        .catch(error => {
          console.log(error)
        })
    },

    handleCascaderChange(value, selectedData) {
      if (!selectedData || selectedData.length < 2) {
        this.handleResetDiagram()
        return
      }
      let flowInfoId = selectedData[1].value
      let params = {
        flowInfoId: flowInfoId
      }
      findFlowModel(params)
        .then(response => {
          let result = response.result
          if (result) {
            this.flowDiagram.show(result)
            this.flowDiagram.createModelInspector('modelInspectorDiv')
            this.flowInfoId = flowInfoId
          }
        })
        .catch(error => {
          console.log(error)
        })
    },

    handleCollapsePanelChange(keys) {
      let key = keys[0]
      if (!key || this.actionGroupKeys.indexOf(key) > -1) {
        return
      }
      let tempMap = this.actionGroupMap
      let value = tempMap[key]
      this.flowDiagram.createPalette(key, value)
      this.actionGroupKeys.push(key)
    },

    handleActionGroupName(key) {
      return this.actionGroupNameMap[key]
    },

    handleMakeSvg() {
      if (!this.flowInfoId) {
        this.$Message.warning('请选择流程')
        return
      }
      let obj = this.$refs.SVGArea
      let svg = this.flowDiagram.makeSvg()
      obj.appendChild(svg)
      if (obj.children.length > 0) {
        obj.replaceChild(svg, obj.children[0])
      }
      this.showPreviewModal = true
    },

    handleRenderAddFlowInfo() {
      this.showAddFlowInfoModal = true
    },

    handleAddFlowInfo() {
      let params = this.formItem
      addFlowInfo(params)
        .then(response => {
          this.$Message.success('操作成功')
          this.$Modal.remove()
        })
        .catch(error => {
          console.log(error)
          this.$Message.error('操作失败')
        })
    },

    handleSaveDiagram() {
      let flowInfoId = this.flowInfoId
      if (!flowInfoId) {
        this.$Message.warning('请选择流程')
        return
      }
      let params = JSON.parse(this.flowDiagram.load())
      updateFlowModel(params)
        .then(response => {
          this.$Message.success('操作成功')
        })
        .catch(error => {
          console.log(error)
          this.$Message.error('操作失败')
        })
    },

    handleRenderConfigAdminFlowData() {
      let vm = this
      let flowInfoId = this.flowInfoId
      if (!flowInfoId) {
        this.$Message.warning('请选择流程')
        return
      }
      flowRender.configAdminFlowData(vm, flowInfoId)
    },

    handleResetDiagram() {
      this.flowDiagram.reset()
      this.flowDiagram.createModelInspector('modelInspectorDiv')
      this.flowDiagram.createActionInspector('actionInspectorDiv')
      this.flowInfoId = ''
    },

    handleViewCode() {
      if (!this.flowInfoId) {
        this.$Message.warning('请选择流程')
        return
      }
      this.sourceCode = this.flowDiagram.load()
      this.showViewCodeModal = true
    },

    handleClearFlowCache() {
      if (!this.flowInfoId) {
        this.$Message.warning('请选择流程')
        return
      }
      let params = {
        flowInfoId: this.flowInfoId
      }
      clearFlowCache(params)
        .then(response => {
          this.$Message.success('操作成功')
        })
        .catch(error => {
          console.log(error)
          this.$Message.error('操作失败')
        })
    }
  },

  mounted() {
    this.init()
  }
}
</script>
<style scoped>
@import '../render/inspector.css';
</style>

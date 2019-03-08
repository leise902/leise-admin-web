<template>
  <div>
    <Row class="expand-row">
      <Col>
      <span @click="handleRenderModify" style="margin: 0px 10px;">
        <Button size="small" type="primary" icon="edit">编辑</Button>
      </span>
      <span @click="handleDesign" style="margin: 0px 10px;">
        <Button size="small" type="primary" icon="power">设计</Button>
      </span>
      <span @click="handleDelete" style="margin: 0px 10px;">
        <Button size="small" type="warning" icon="trash-b">删除</Button>
      </span>
      <span @click="handleCleanFlowCache" style="margin: 0px 10px;">
        <Button size="small" type="primary" icon="trash-b">清理缓存</Button>
      </span>
      <span @click="handleRenderManageFlowVersions" style="margin: 0px 10px;">
        <Button size="small" type="primary" icon="trash-b">版本管理</Button>
      </span>
      </Col>
    </Row>
  </div>
</template>

<script>
import { deleteFlowInfo, cleanFlowCache } from '@/api/flow.js'
import flowRender from '../render/render.js'
import util from '@/libs/util'
import formatter from '@/libs/formatter'

export default {
  name: 'expandFlowTools',
  data() {
    return {}
  },

  props: {
    row: {
      type: Object,
      required: true
    }
  },
  methods: {
    handleRenderModify() {
      let vm = this
      let data = this.row.flowInfoId
      flowRender.modifyFlowBaseInfo(vm, data)
    },

    handleDesign() {
      let vm = this
      let flowInfoId = this.row.flowInfoId
      util.openNewPage(vm, 'designFlowBizlogic_index')
      vm.$router.push({
        name: 'designFlowBizlogic_index',
        params: { flowInfoId: flowInfoId }
      })
    },

    handleDelete() {
      let vm = this
      vm.$Modal.confirm({
        title: '删除流程',
        okText: '确定',
        cancelText: '取消',
        content: '<p>警告!删除此数据可能导致无法恢复!!!</p>',
        loading: true,
        onOk: () => {
          setTimeout(() => {
            let flowInfoId = this.row.flowInfoId
            let params = {
              flowInfoId: flowInfoId
            }
            deleteFlowInfo(params)
              .then(response => {
                this.$Message.success('操作成功')
                this.$Modal.remove()
              })
              .catch(error => {
                console.log(error)
                this.$Message.error('操作失败')
              })
          }, 2000)
        }
      })
    },

    handleCleanFlowCache() {
      let flowInfoId = this.row.flowInfoId
      let params = {
        flowInfoId: flowInfoId
      }
      cleanFlowCache(params)
        .then(response => {
          this.$Message.success('操作成功')
          this.$Modal.remove()
        })
        .catch(error => {
          console.log(error)
          this.$Message.error('操作失败')
        })
    },

    handleRenderManageFlowVersions () {
      let vm = this
      let data = this.row.flowInfoId
      flowRender.manageFlowVersions(vm, data)
    }
  }
}
</script>

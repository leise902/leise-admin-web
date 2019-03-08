<template>
    <Card>
        <p slot="title" style="color:#2D8CF0">
            <Icon type="plus-circled"></Icon>
            添加规则信息
        </p>
        <Row>
            <Form ref="formItem" :model="formItem" :rules="ruleValidate" :label-width="80">
                <Row>
                    <Col span="12">
                        <FormItem label="规则编号">
                            <Input v-model="formItem.ruleId" disabled placeholder="系统自动生成" />
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="规则代码" prop="ruleCode">
                            <Input v-model="formItem.ruleCode" placeholder="请输入规则代码" />
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="规则名称" prop="ruleName">
                            <Input v-model="formItem.ruleName" placeholder="请输入规则名称" />
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="描述信息" prop="description">
                            <Input v-model="formItem.description" placeholder="请输入描述信息..." />
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="是否启用" prop="enable">
                            <i-switch v-model="formItem.enable" size="large">
                                <span slot="open">开启</span>
                                <span slot="close">关闭</span>
                            </i-switch>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="是否使用模板">
                            <i-switch v-model="formItem.needTemplate" size="large">
                                <span slot="open">自动</span>
                                <span slot="close">人工</span>
                            </i-switch>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
            <Card v-if="formItem.needTemplate">
                <p slot="title" style="color:#2D8CF0">
                    <Icon type="gear-b"></Icon>
                    设置规则条件
                </p>
                <Form ref="formDynamic" :model="formDynamic" :label-width="80" label="添加规则条件">
                    <Row>
                        <Col span="12">
                            <FormItem label="选择模板">
                                <Select v-model="formItem.templateId" filterable>
                                    <Option v-for="item in templateList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span="12">
                            <FormItem label="选择模板">
                                <Select v-model="selectedTemplate" filterable>
                                    <Option v-for="item in templateList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                    </Row>
                    <FormItem
                            v-for="(item, index) in formDynamic.items"
                            v-if="item.status"
                            :key="index"
                            :label="'条件' + item.index"
                            :prop="'items.' + index + '.ruleCondition'"
                            :rules="{required: true, message: '请填写条件 ' + item.index +'规则表达式', trigger: 'blur'}">
                        <Row>
                            <Col span="9">
                                <Input type="text" v-model="item.ruleCondition" placeholder="请输入规则表达式..."></Input>
                            </Col>
                             <Col span="9">
                                <Input type="text" v-model="item.ruledescription" placeholder="请输入规则描述..."></Input>
                            </Col>
                            <Col span="5">
                                <Button type="ghost" @click="handleRenderConfig(item)">配置</Button>
                                <Button type="ghost" @click="handleRemove(index)">删除</Button>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem>
                        <Row>
                            <Col span="12">
                                <Button type="dashed" @click="handleAdd" icon="plus-round">添加条件</Button>
                                <Button type="ghost" @click="handleReset('formDynamic')" style="margin-left: 8px">重置</Button>
                            </Col>
                        </Row>
                    </FormItem>
                </Form>
            </Card>
            <Card>
                <Form ref="ruleContentformItem" :model="formItem" :rules="ruleValidate" :label-width="80">
                    <Row>
                        <FormItem label="规则内容" prop="ruleContent">
                            <textarea rows="8" cols="90" v-model="formItem.ruleContent" style="resize:none;line-height:150%"></textarea>
                        </FormItem>
                    </Row>
                    <Row>
                        <FormItem>
                            <Button type="primary" @click="handleCompile('formItem')">编译</Button>
                            <Button type="primary" @click="handleSubmit('formItem')">保存</Button>
                            <Button type="ghost" @click="handleReset('formItem')" style="margin-left: 8px">重置</Button>
                        </FormItem>
                    </Row>
                </Form>
            </Card>
        </Row>
    </Card>
</template>
<script>
import { queryTemplateList } from '@/api/template.js'
import { addRule, compileRule } from '@/api/rules.js'
import ruleRender from './render/rules.js'
export default {
  data() {
    return {
      index: 1,
      formDynamic: {
        items: [
          {
            value: '',
            index: 1,
            status: 1,
            ruleCondition: '',
            ruleDescription: ''
          }
        ]
      },
      selectedTemplate: -1,
      templateList: [],
      argsList: [],
      operationList: [],
      formItem: {
        ruleId: '',
        ruleCode: '',
        ruleName: '',
        ruleContent: '',
        needTemplate: true,
        enable: true,
        description: '',
        templateId: -1
      },
      ruleValidate: {
        ruleName: [
          { required: true, message: '规则名称不能为空', trigger: 'blur' }
        ],
        ruleCode: [
          { required: true, message: '规则代码不能为空', trigger: 'blur' }
        ],
        ruleContent: [
          { required: true, message: '规则内容不能为空', trigger: 'blur' }
        ]
      }
    }
  },

  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          addRule(this.formItem)
            .then(response => {
              let responseData = response.data
              this.$Message.success('Success!')
            })
            .catch(error => {
              this.$Message.error('Fail!')
            })
        }
      })
    },
    handleReset(name) {
      this.$refs[name].resetFields()
    },
    handleCompile(name) {
      let params = {}
      if (this.formItem.needTemplate) {
        const ruleConditions = this.formDynamic.items
          .filter(item => item.ruleCondition && item.status === 1)
          .map(item => {
            return {
              conditionExpression: item.ruleCondition,
              conditionName: item.ruleDescription
            }
          })
        params = {
          needTemplate: true,
          ruleConditions: ruleConditions,
          templateId: this.selectedTemplate,
          ruleCode: this.formItem.ruleCode
        }
      } else {
        params = {
          needTemplate: false,
          ruleContent: this.ruleContent,
          ruleCode: this.formItem.ruleCode
        }
      }
      compileRule(params)
        .then(response => {
          let responseData = response.data
          this.formItem.ruleContent = responseData.compiledRuleContent
          this.$Message.success('Success!')
        })
        .catch(error => {
          this.$Message.error('Fail!')
        })
    },
    handleSelectTemplate() {
      let params = {}
      queryTemplateList(params)
        .then(response => {
          let responseData = response.data
          let pageInfo = responseData.pageInfo
          let list = pageInfo.list
          this.templateList = list.map(item => {
            return {
              value: item.templateId,
              label: item.templateName
            }
          })
        })
        .catch(error => {})
    },
    handleRenderConfig(item) {
      let vm = this
      ruleRender.configRuleInfo(vm, item)
    },
    handleAdd() {
      this.index++
      this.formDynamic.items.push({
        value: '',
        index: this.index,
        status: 1,
        ruleCondition: '',
        ruleDescription: ''
      })
    },
    handleRemove(index) {
      this.formDynamic.items[index].status = 0
    }
  },

  created() {
    this.handleSelectTemplate()
  }
}
</script>
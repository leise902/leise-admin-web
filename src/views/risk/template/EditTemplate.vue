<template>
    <Card>
        <p slot="title" style="color:#2D8CF0">
            <Icon type="edit"></Icon>
            编辑模板信息
        </p>
        <Form ref="formItem" :model="formItem" :rules="ruleValidate" :label-width="80">
            <Row>
                <Col span="12">
                    <FormItem label="模板编号">
                        <Input v-model="templateId" disabled></Input>
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="模板代码">
                        <Input v-model="formItem.templateCode" placeholder="请输入模板代码..."></Input>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                    <FormItem label="模板名称" prop="templateName">
                        <Input v-model="formItem.templateName" placeholder="请输入模板名称..."></Input>
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="是否启用" prop="enable">
                        <i-switch v-model="formItem.enable" size="large">
                            <span slot="open">开启</span>
                            <span slot="close">关闭</span>
                        </i-switch>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <FormItem label="描述信息" prop="description">
                    <Input v-model="formItem.description" placeholder="请输入描述信息..."></Input>
                </FormItem>
            </Row>
            <Row>
                <FormItem label="模板内容" prop="templateContent">
                    <textarea rows="8" cols="100" style="resize:none;line-height:150%" v-model="formItem.templateContent"></textarea>
                </FormItem>
            </Row>
            <FormItem>
                <Button type="primary" @click="handleSubmit('formItem')">修改</Button>
                <Button type="ghost" @click="handleReset('formItem')" style="margin-left: 8px">重置</Button>
            </FormItem>
        </Form>
    </Card>
</template>
<script>
import { queryTemplateDetail, editTemplate } from '@/api/template.js'
    export default {
        data () {
            return {
                formItem: {
                    templateCode: '',
                    templateName: '',
                    enable: true,
                    description: ''
                },
                ruleValidate: {
                    templateName: [
                        { required: true, message: '模板名称不能为空', trigger: 'blur' }
                    ],
                    templateCode: [
                        { required: true, message: '模板代码不能为空', trigger: 'blur' }
                    ]
                }
            }
        },

        props:['templateId'],

        methods: {

            init () {
                this.handleSearch()
            },

            handleSearch () {
                let params = {
                    'templateId': this.templateId
                }
               
                queryTemplateDetail(params).then(response => {
                    this.searchLoading = true
                    let responseData = response.data
                    this.formItem = responseData
                    this.searchLoading = false
                }).catch(error => {

                })

            },
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                         editTemplate(this.formItem).then(response => {
                            let responseData = response.data
                        }).catch(error => {

                        })
                        this.$Message.success('Success!');
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            }
        },

        created () {
            this.init();
        } 
    }
</script>
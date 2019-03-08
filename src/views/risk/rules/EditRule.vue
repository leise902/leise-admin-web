<template>
    <Card>
        <p slot="title" style="color:#2D8CF0">
            <Icon type="edit"></Icon>
            编辑规则信息
        </p>
        <Form ref="formItem" :model="formItem" :rules="ruleValidate" :label-width="80">
            <Row>
                <Col span="12">
                    <FormItem label="规则编号">
                        <Input v-model="formItem.ruleId" disabled></Input>
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="规则代码">
                        <Input v-model="formItem.ruleCode" placeholder="请输入规则代码..."></Input>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                    <FormItem label="规则名称" prop="ruleName">
                        <Input v-model="formItem.ruleName" placeholder="请输入规则名称..."></Input>
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
                <FormItem label="规则内容" prop="ruleContent">
                    <textarea rows="8" cols="100" v-model="formItem.ruleContent"></textarea>
                </FormItem>
            </Row>
            <FormItem>
                <Button type="primary" @click="handleCompile('formItem')">编译</Button>
                <Button type="primary" @click="handleSubmit('formItem')">修改</Button>
                <Button type="ghost" @click="handleReset('formItem')" style="margin-left: 8px">重置</Button>
            </FormItem>
        </Form>
    </Card>
</template>
<script>
import { queryRuleDetail } from '@/api/rules.js'
    export default {
        data () {
            return {
                formItem: {
                    ruleCode: '',
                    ruleName: '',
                    enable: true,
                    description: ''
                },
                ruleValidate: {
                    ruleName: [
                        { required: true, message: '规则名称不能为空', trigger: 'blur' }
                    ],
                    ruleCode: [
                        { required: true, message: '规则代码不能为空', trigger: 'blur' }
                    ]
                }
            }
        },

        props:['ruleId'],

        methods: {

            init () {
                this.handleSearch()
            },

            handleSearch () {
                let params = {
                    'ruleId': this.ruleId
                }
                return new Promise((resolve, reject) => {
                    queryRuleDetail(params).then(response => {
                        this.searchLoading = true
                        let responseData = response.data
                        this.formItem = responseData
                        this.formItem.ruleId = this.ruleId
                        this.searchLoading = false
                        resolve()
                    }).catch(error => {
                        reject(error)
                    })
                })
            },
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('Success!');
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            handleCompile(name) {
                this.$Message.success('编译成功!');
            }
        },

        created () {
            this.init();
        } 
    }
</script>
<template>
    <Card>
        <p slot="title" style="color:#2D8CF0">
            <Icon type="edit"></Icon>
            编辑参数信息
        </p>
        <Form ref="formItem" :model="formItem" :rules="ruleValidate" :label-width="80">
            <FormItem label="参数编号">
                <Input v-model="formItem.argsId" disabled></Input>
            </FormItem>
            <FormItem label="参数代码">
                <Input v-model="formItem.argsCode" placeholder="请输入参数代码..."></Input>
            </FormItem>
            <FormItem label="参数名称" prop="argsName">
                <Input v-model="formItem.argsName" placeholder="请输入参数名称..."></Input>
            </FormItem>
            <FormItem label="是否启用" prop="enable">
                <i-switch v-model="formItem.enable" size="large">
                    <span slot="open">开启</span>
                    <span slot="close">关闭</span>
                </i-switch>
            </FormItem>
            <FormItem label="描述信息" prop="description">
                <Input v-model="formItem.description" placeholder="请输入描述信息..."></Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('formItem')">修改</Button>
                <Button type="ghost" @click="handleReset('formItem')" style="margin-left: 8px">重置</Button>
            </FormItem>
        </Form>
    </Card>
</template>
<script>
import { queryArgsDetail } from '@/api/args.js'
    export default {
        data () {
            return {
                formItem: {
                    argsCode: '',
                    argsName: '',
                    enable: true,
                    description: ''
                },
                ruleValidate: {
                    argsName: [
                        { required: true, message: '参数名称不能为空', trigger: 'blur' }
                    ],
                    argsCode: [
                        { required: true, message: '参数代码不能为空', trigger: 'blur' }
                    ]
                }
            }
        },

        props:['argsId'],

        methods: {

            init () {
                this.handleSearch()
            },

            handleSearch () {
                let params = {
                    'argsId': this.argsId
                }
                return new Promise((resolve, reject) => {
                    queryArgsDetail(params).then(response => {
                        this.searchLoading = true
                        let responseData = response.data
                        this.formItem = responseData
                        this.formItem.argsId = this.argsId
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
            }
        },

        created () {
            this.init();
        } 
    }
</script>
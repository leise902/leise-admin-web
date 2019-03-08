<template>
    <Card>
        <p slot="title" style="color:#2D8CF0">
            <Icon type="person"></Icon>
            编辑服务信息
        </p>
        <Form ref="formItem" :model="formItem" :rules="ruleValidate" :label-width="80">
            <FormItem label="服务编号">
                <Input v-model="formItem.serviceId" disabled></Input>
            </FormItem>
            <FormItem label="服务信息" prop="serviceName">
                <Input v-model="formItem.serviceName" placeholder="Enter the serviceName"></Input>
            </FormItem>
            <FormItem label="描述信息" prop="description">
                <Input v-model="formItem.description" placeholder="Enter the description"></Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('formItem')">修改</Button>
                <Button type="ghost" @click="handleReset('formItem')" style="margin-left: 8px">重置</Button>
            </FormItem>
        </Form>
    </Card>
</template>
<script>
import { queryServiceDetail } from '@/api/service.js'
    export default {
        data () {
            return {
                formItem: {
                    serviceId: '',
                    serviceName: '',
                    description: ''
                },
                ruleValidate: {
                    serviceName: [
                        { required: true, message: 'The serviceName cannot be empty', trigger: 'blur' }
                    ]
                }
            }
        },

        props:['serviceId'],

        methods: {

            init () {
                this.handleSearch()
            },

            handleSearch () {
                let params = {
                    'serviceId': this.serviceId
                }
                return new Promise((resolve, reject) => {
                    queryServiceDetail(params).then(response => {
                        this.searchLoading = true
                        let responseData = response.data
                        this.formItem = responseData
                        this.formItem.serviceId = this.serviceId
                        this.searchLoading = false
                        resolve()
                    }).catch(service => {
                        reject(service)
                    })
                })
            },
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('Success!');
                    } else {
                        this.$Message.service('Fail!');
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
<template>
    <Card>
        <p slot="title" style="color:#2D8CF0">
            <Icon type="person"></Icon>
            编辑错误信息
        </p>
        <Form ref="formItem" :model="formItem" :rules="ruleValidate" :label-width="80">
            <FormItem label="错误编号">
                <Input v-model="formItem.errorId" disabled></Input>
            </FormItem>
            <FormItem label="错误信息" prop="errorName">
                <Input v-model="formItem.errorName" placeholder="Enter the errorName"></Input>
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
import { queryErrorDetail } from '@/api/error.js'
    export default {
        data () {
            return {
                formItem: {
                    errorId: '',
                    errorName: '',
                    description: ''
                },
                ruleValidate: {
                    errorName: [
                        { required: true, message: 'The errorName cannot be empty', trigger: 'blur' }
                    ]
                }
            }
        },

        props:['errorId'],

        methods: {

            init () {
                this.handleSearch()
            },

            handleSearch () {
                let params = {
                    'errorId': this.errorId
                }
                return new Promise((resolve, reject) => {
                    queryErrorDetail(params).then(response => {
                        this.searchLoading = true
                        let responseData = response.data
                        this.formItem = responseData
                        this.formItem.errorId = this.errorId
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
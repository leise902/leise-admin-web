<template>
    <Card>
        <p slot="title" style="color:#2D8CF0">
            <Icon type="person"></Icon>
            编辑基本信息
        </p>
        <Form ref="formItem" :model="formItem" :rules="ruleValidate" :label-width="80">
            <FormItem label="信用编号">
                <Input v-model="formItem.creditId" disabled></Input>
            </FormItem>
            <FormItem label="信用姓名" prop="creditName">
                <Input v-model="formItem.creditName" placeholder="Enter your name"></Input>
            </FormItem>
            <FormItem label="手机号码" prop="mobile">
                <Input v-model="formItem.mobile" placeholder="Enter your mobile"></Input>
            </FormItem>
            <FormItem label="电子邮箱" prop="email">
                <Input v-model="formItem.email" placeholder="Enter your email"></Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('formItem')">修改</Button>
                <Button type="ghost" @click="handleReset('formItem')" style="margin-left: 8px">重置</Button>
            </FormItem>
        </Form>
    </Card>
</template>
<script>
import { queryCreditDetail } from '@/api/credit.js'
    export default {
        data () {
            return {
                formItem: {
                    creditId: '',
                    creditName: '',
                    mobile: '',
                    email: '',
                    desc: ''
                },
                ruleValidate: {
                    creditId: [
                         { required: true, message: 'The creditId cannot be empty', trigger: 'blur' }
                    ],
                    creditName: [
                        { required: true, message: 'The creditName cannot be empty', trigger: 'blur' }
                    ],
                    mobile: [
                        { required: true, message: 'The mobile cannot be empty', trigger: 'blur' }
                    ],
                    email: [
                        { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' },
                        { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
                    ]
                }
            }
        },

        props:['creditId'],

        methods: {

            init () {
                this.handleSearch()
            },

            handleSearch () {
                let params = {
                    'creditId': this.creditId
                }
                return new Promise((resolve, reject) => {
                    queryCreditDetail(params).then(response => {
                        this.searchLoading = true
                        let responseData = response.data
                        this.formItem = responseData
                        this.formItem.creditId = this.creditId
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
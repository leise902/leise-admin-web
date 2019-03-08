<template>
    <Card>
        <p slot="title" style="color:#2D8CF0">
            <Icon type="person"></Icon>
            编辑基本信息
        </p>
        <Form ref="formItem" :model="formItem" :rules="ruleValidate" :label-width="80">
            <FormItem label="用户编号">
                <Input v-model="formItem.userId" disabled></Input>
            </FormItem>
            <FormItem label="用户姓名" prop="userName">
                <Input v-model="formItem.userName" placeholder="Enter your name"></Input>
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
import { queryUserDetail } from '@/api/user.js'
    export default {
        data () {
            return {
                formItem: {
                    userId: '',
                    userName: '',
                    mobile: '',
                    email: '',
                    desc: ''
                },
                ruleValidate: {
                    userId: [
                         { required: true, message: 'The userId cannot be empty', trigger: 'blur' }
                    ],
                    userName: [
                        { required: true, message: 'The userName cannot be empty', trigger: 'blur' }
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

        props:['userId'],

        methods: {

            init () {
                this.handleSearch()
            },

            handleSearch () {
                let params = {
                    'userId': this.userId
                }
                return new Promise((resolve, reject) => {
                    queryUserDetail(params).then(response => {
                        this.searchLoading = true
                        let responseData = response.data
                        this.formItem = responseData
                        this.formItem.userId = this.userId
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
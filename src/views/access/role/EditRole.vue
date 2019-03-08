<template>
    <Card>
        <p slot="title" style="color:#2D8CF0">
            <Icon type="person"></Icon>
            编辑角色信息
        </p>
        <Form ref="formItem" :model="formItem" :rules="ruleValidate" :label-width="80">
            <FormItem label="角色编号">
                <Input v-model="formItem.roleId" disabled></Input>
            </FormItem>
            <FormItem label="角色姓名" prop="roleName">
                <Input v-model="formItem.roleName" placeholder="Enter the roleName"></Input>
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
import { queryRoleDetail } from '@/api/role.js'
    export default {
        data () {
            return {
                formItem: {
                    roleId: '',
                    roleName: '',
                    description: ''
                },
                ruleValidate: {
                    roleName: [
                        { required: true, message: 'The roleName cannot be empty', trigger: 'blur' }
                    ]
                }
            }
        },

        props:['roleId'],

        methods: {

            init () {
                this.handleSearch()
            },

            handleSearch () {
                let params = {
                    'roleId': this.roleId
                }
                return new Promise((resolve, reject) => {
                    queryRoleDetail(params).then(response => {
                        this.searchLoading = true
                        let responseData = response.data
                        this.formItem = responseData
                        this.formItem.roleId = this.roleId
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
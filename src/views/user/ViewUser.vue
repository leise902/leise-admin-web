<template>
    <Card>
        <p slot="title" style="color:#2D8CF0">
            <Icon type="person"></Icon>
            查看基本信息
        </p>
        <Form ref="formItem" :loading="searchLoading" :label-width="80">
            <FormItem label="用户编号" prop="userId">
                <Input v-model="userId" disabled />
            </FormItem>
            <FormItem label="用户姓名">
                <Input v-model="userName" disabled />
            </FormItem>
            <FormItem label="用户角色">
                <Input v-model="roles" disabled />
            </FormItem>
        </Form>
    </Card>
</template>
<script>
import { queryUserDetail } from '@/api/user.js' 
    export default {   
        name: 'viewUser',
        data () {
            return {
                searchLoading: false,
                userName: '',
                cardNo: '',
                mobile: '',
                email: '',
                roles: ''
            }
        },

        props: ['userId'],

        methods: {
            init () {
                let params = {
                    'userId': this.userId
                }
                return new Promise((resolve, reject) => {
                    queryUserDetail(params).then(response => {
                        this.searchLoading = true
                        let responseData = response.data
                        this.userName = responseData.userName,
                        this.mobile = responseData.mobile,
                        this.roles = responseData.roles
                        this.searchLoading = false
                        resolve()
                    }).catch(error => {
                        reject(error)
                    })
                })
            }     
        },

        created () {
            this.init();
        } 

    }
</script>
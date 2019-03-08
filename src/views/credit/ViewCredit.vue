<template>
    <Card>
        <p slot="title" style="color:#2D8CF0">
            <Icon type="person"></Icon>
            查看基本信息
        </p>
        <Form ref="formItem" :loading="searchLoading" :label-width="80">
            <FormItem label="信用编号" prop="creditId">
                <Input v-model="creditId" disabled />
            </FormItem>
            <FormItem label="信用姓名">
                <Input v-model="creditName" disabled />
            </FormItem>
            <FormItem label="信用角色">
                <Input v-model="roles" disabled />
            </FormItem>
        </Form>
    </Card>
</template>
<script>
import { queryCreditDetail } from '@/api/credit.js' 
    export default {   
        name: 'viewCredit',
        data () {
            return {
                searchLoading: false,
                creditName: '',
                cardNo: '',
                mobile: '',
                email: '',
                roles: ''
            }
        },

        props: ['creditId'],

        methods: {
            init () {
                let params = {
                    'creditId': this.creditId
                }
                return new Promise((resolve, reject) => {
                    queryCreditDetail(params).then(response => {
                        this.searchLoading = true
                        let responseData = response.data
                        this.creditName = responseData.creditName,
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
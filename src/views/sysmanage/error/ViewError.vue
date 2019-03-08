<template>
    <Card>
        <p slot="title" style="color:#2D8CF0">
            <Icon type="person"></Icon>
            查看错误信息
        </p>
        <Form ref="formItem" :loading="searchLoading" :label-width="80">
            <FormItem label="错误编号" prop="errorId">
                <Input v-model="errorId" disabled />
            </FormItem>
            <FormItem label="错误名称">
                <Input v-model="errorName" disabled />
            </FormItem>
            <FormItem label="描述信息">
                <Input v-model="description" disabled />
            </FormItem>
        </Form>
    </Card>
</template>
<script>
import { queryErrorDetail } from '@/api/error.js' 
    export default {   
        name: 'viewError',
        data () {
            return {
                searchLoading: false,
                errorName: '',
                description: ''
            }
        },

        props: ['errorId'],

        methods: {
            init () {
                let params = {
                    'errorId': this.errorId
                }
                return new Promise((resolve, reject) => {
                    queryErrorDetail(params).then(response => {
                        this.searchLoading = true
                        let responseData = response.data
                        this.errorName = responseData.errorName,
                        this.description = responseData.description
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
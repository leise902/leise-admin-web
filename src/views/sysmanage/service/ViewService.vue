<template>
    <Card>
        <p slot="title" style="color:#2D8CF0">
            <Icon type="person"></Icon>
            查看服务信息
        </p>
        <Form ref="formItem" :loading="searchLoading" :label-width="80">
            <FormItem label="服务编号" prop="serviceId">
                <Input v-model="serviceId" disabled />
            </FormItem>
            <FormItem label="服务名称">
                <Input v-model="serviceName" disabled />
            </FormItem>
            <FormItem label="描述信息">
                <Input v-model="description" disabled />
            </FormItem>
        </Form>
    </Card>
</template>
<script>
import { queryServiceDetail } from '@/api/service.js' 
    export default {   
        name: 'viewService',
        data () {
            return {
                searchLoading: false,
                serviceName: '',
                description: ''
            }
        },

        props: ['serviceId'],

        methods: {
            init () {
                let params = {
                    'serviceId': this.serviceId
                }
                return new Promise((resolve, reject) => {
                    queryServiceDetail(params).then(response => {
                        this.searchLoading = true
                        let responseData = response.data
                        this.serviceName = responseData.serviceName,
                        this.description = responseData.description
                        this.searchLoading = false
                        resolve()
                    }).catch(service => {
                        reject(service)
                    })
                })
            }     
        },

        created () {
            this.init();
        } 

    }
</script>
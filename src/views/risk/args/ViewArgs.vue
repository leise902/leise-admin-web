<template>
    <Card>
        <p slot="title" style="color:#2D8CF0">
            <Icon type="eye"></Icon>
            查看参数信息
        </p>
        <Form ref="formItem" :loading="searchLoading" :label-width="80">
            <FormItem label="参数编号" prop="argsId">
                <Input v-model="argsId" disabled />
            </FormItem>
             <FormItem label="参数代码" prop="argsCode">
                <Input v-model="formItem.argsCode" disabled />
            </FormItem>
            <FormItem label="参数名称">
                <Input v-model="formItem.argsName" disabled />
            </FormItem>
            <FormItem label="是否启用" prop="enable">
                <Input v-model="formItem.enable" disabled />
            </FormItem>
            <FormItem label="描述信息">
                <Input v-model="formItem.description" disabled />
            </FormItem>
        </Form>
    </Card>
</template>
<script>
import { queryArgsDetail } from '@/api/args.js' 
    export default {   
        name: 'viewArg',
        data () {
            return {
                searchLoading: false,
                formItem: {
                    argsCode: '',
                    argsName: '',
                    enable: false,
                    description: ''
                }
            }
        },

        props: ['argsId'],

        methods: {
            init () {
                let params = {
                    'argsId': this.argsId
                }
                return new Promise((resolve, reject) => {
                    queryArgsDetail(params).then(response => {
                        this.searchLoading = true
                        let responseData = response.data
                        this.formItem = responseData,
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
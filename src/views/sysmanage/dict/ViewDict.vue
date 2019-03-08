<template>
    <Card>
        <p slot="title" style="color:#2D8CF0">
            <Icon type="person"></Icon>
            查看数据字典信息
        </p>
        <Form ref="formItem" :loading="searchLoading" :label-width="80">
            <FormItem label="数据字典编号" prop="dictId">
                <Input v-model="dictId" disabled />
            </FormItem>
            <FormItem label="数据字典名称">
                <Input v-model="dictName" disabled />
            </FormItem>
            <FormItem label="描述信息">
                <Input v-model="description" disabled />
            </FormItem>
        </Form>
    </Card>
</template>
<script>
import { queryDictDetail } from '@/api/dict.js' 
    export default {   
        name: 'viewDict',
        data () {
            return {
                searchLoading: false,
                dictName: '',
                description: ''
            }
        },

        props: ['dictId'],

        methods: {
            init () {
                let params = {
                    'dictId': this.dictId
                }
                return new Promise((resolve, reject) => {
                    queryDictDetail(params).then(response => {
                        this.searchLoading = true
                        let responseData = response.data
                        this.dictName = responseData.dictName,
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
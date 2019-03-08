<template>
    <Card>
        <p slot="title" style="color:#2D8CF0">
            <Icon type="information-circled"></Icon>
            查看日志信息
        </p>
        <Form ref="formItem" :loading="searchLoading" :label-width="80">
            <Row>
                <Col span="12">
                    <FormItem label="日志编号" prop="logId">
                        <Input v-model="logId" disabled />
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="操作类型">
                        <Input v-model="formItem.operType" disabled />
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                    <FormItem label="业务主键项">
                        <Input v-model="formItem.bizKeyName" disabled />
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="业务主键值">
                        <Input v-model="formItem.bizKeyValue" disabled />
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                    <FormItem label="操作员">
                        <Input v-model="formItem.operName" disabled />
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="操作结果">
                        <Input v-model="formItem.operResult" disabled />
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                    <FormItem label="操作时间">
                        <Input v-model="formItem.operTime" disabled />
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                    <FormItem label="操作摘要">
                        <textarea rows="4" cols="50" v-model="formItem.description" disabled />
                    </FormItem>
                </Col>
            </Row>
        </Form>
    </Card>
</template>
<script>
import { queryOperlogDetail } from '@/api/log.js' 
    export default {   
        name: 'viewOperlog',
        data () {
            return {
                searchLoading: false,
                formItem: {
                    operType: '',
                    bizKeyName: '',
                    bizKeyValue: '',
                    operName: '',
                    operResult: '',
                    operTime: '',
                    description: ''
                }
            }
        },

        props: ['logId'],

        methods: {
            init () {
                let params = {
                    'logId': this.logId
                }
                return new Promise((resolve, reject) => {
                    queryOperlogDetail(params).then(response => {
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
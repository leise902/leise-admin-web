<template>
    <Card>
        <p slot="title" style="color:#2D8CF0">
            <Icon type="eye"></Icon>
            查看规则信息
        </p>
        <Form ref="formItem" :loading="searchLoading" :label-width="80">
            <Row>
                <Col span="12">
                    <FormItem label="规则编号" prop="ruleId">
                        <Input v-model="ruleId" disabled />
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="规则代码" prop="ruleCode">
                        <Input v-model="formItem.ruleCode" disabled />
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                    <FormItem label="规则名称">
                        <Input v-model="formItem.ruleName" disabled />
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="是否启用" prop="enable">
                        <Input v-model="formItem.enable" disabled />
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <FormItem label="描述信息">
                    <Input v-model="formItem.description" disabled />
                </FormItem>
            </Row>
            <Row>
                <FormItem label="规则内容" prop="ruleContent">
                    <textarea rows="8" cols="100" v-model="formItem.ruleContent"></textarea>
                </FormItem>
            </Row>
        </Form>
    </Card>
</template>
<script>
import { queryRuleDetail } from '@/api/rules.js' 
    export default {   
        name: 'viewRule',
        data () {
            return {
                searchLoading: false,
                formItem: {
                    ruleCode: '',
                    ruleName: '',
                    enable: false,
                    description: '',
                    ruleContent: ''
                }
            }
        },

        props: ['ruleId'],

        methods: {
            init () {
                let params = {
                    'ruleId': this.ruleId
                }
                return new Promise((resolve, reject) => {
                    queryRuleDetail(params).then(response => {
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
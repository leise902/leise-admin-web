<template>
    <Form ref="formItem" :model="formItem" :label-width="100">
        <Row>
            <Col span="12">
                <FormItem label="企业名称">
                    <Input v-model="formItem.corpName" :readonly="isReadOnly" />
                </FormItem>
            </Col>
        </Row>
        <Row>
            <Col span="12">
                    <FormItem label="注册登记类型">
                    <Input v-model="formItem.registType" :readonly="isReadOnly" />
                </FormItem>
            </Col>
            <Col span="12">
                <FormItem label="注册登记号">
                    <Input v-model="formItem.registNo" :readonly="isReadOnly" />
                </FormItem>
            </Col>
        </Row>
        <Row>
            <Col span="12">
                    <FormItem label="注册资金(万元)">
                    <Input v-model="formItem.registCapital" :readonly="isReadOnly" />
                </FormItem>
            </Col>
            <Col span="12">
                <FormItem label="注册日期">
                    <Input v-model="formItem.registDate" :readonly="isReadOnly" />
                </FormItem>
            </Col>
        </Row>
        <Row>
            <Col span="12">
                    <FormItem label="有效日期">
                    <Input v-model="formItem.validDate" :readonly="isReadOnly" />
                </FormItem>
            </Col>
            <Col span="12">
                <FormItem label="组织机构代码">
                    <Input v-model="formItem.orgCode" :readonly="isReadOnly" />
                </FormItem>
            </Col>
        </Row>
        <Row>
            <Col span="12">
                    <FormItem label="中征码">
                    <Input v-model="formItem.creditCode" :readonly="isReadOnly" />
                </FormItem>
            </Col>
            <Col span="12">
                <FormItem label="国税登记号">
                    <Input v-model="formItem.nationalTaxCode" :readonly="isReadOnly" />
                </FormItem>
            </Col>
        </Row>
        <Row>
            <Col span="12">
                <FormItem label="地税登记号">
                    <Input v-model="formItem.localTaxCode" :readonly="isReadOnly" />
                </FormItem>
            </Col>
        </Row>
        <Row v-if="isReadOnly==false">
            <Col span="12">
                <FormItem>
                    <Button type="primary" @click="handleSubmit('formItem')">修改</Button>
                    <Button type="ghost" @click="handleReset('formItem')" style="margin-left: 8px">重置</Button>
                </FormItem>
            </Col>
        </Row>
    </Form>
</template>
<script>
import { queryCorpInfo } from '@/api/corp.js' 
import message from '@/libs/message.js'
    export default {   
        name: 'corpInfo',
        data () {
            return {
                formItem: {
                    corpName: '',
                    registType: '',
                    registNo: '',
                    registCapital: '',
                    registDate: '',
                    validDate: '',
                    orgCode: '',
                    creditCode: '',
                    nationalTaxCode: '',
                    localTaxCode: ''
                }
            }
        },

        props: {
            corpId: {
                type: Number,
                required: this.opType != 'add'
            },
            opType: {
                validator: function (value) {
                    // 这个值必须匹配下列字符串中的一个
                    return ['view', 'edit'].indexOf(value) !== -1
                }
            }
        },

        methods: {
            init () {
               if(this.opType === 'add'){
                   return
               }
               this.handleQueryCorpInfo()
            },
            handleQueryCorpInfo () {
                let params = {
                    'corpId': this.corpId
                }
                queryCorpInfo(params).then(response => {
                    let queryData = response.data
                    if(queryData){
                        this.formItem = queryData
                    }else{
                        this.$Message.warning(message.data_not_found)
                    }
                }).catch(error => {
                    this.$Message.error(message.system_error)
                })
            }
        },

        computed: {
            isReadOnly: function() {
                return this.opType === 'view'
            }
        },

        created () {
            this.init();
        } 
    }
</script>
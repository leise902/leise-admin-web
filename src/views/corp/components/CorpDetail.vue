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
                    <FormItem label="行业类别">
                    <Input v-model="formItem.industryType" :readonly="isReadOnly" />
                </FormItem>
            </Col>
            <Col span="12">
                <FormItem label="行业代码">
                    <Input v-model="formItem.industryCode" :readonly="isReadOnly" />
                </FormItem>
            </Col>
        </Row>
        <Row>
            <Col span="12">
                    <FormItem label="经营项目">
                    <Input v-model="formItem.bizItem" :readonly="isReadOnly" />
                </FormItem>
            </Col>
            <Col span="12">
                <FormItem label="经营范围">
                    <Input v-model="formItem.bizScope" :readonly="isReadOnly" />
                </FormItem>
            </Col>
        </Row>
        <Row>
            <Col span="12">
                    <FormItem label="邮政编号">
                    <Input v-model="formItem.zipCode" :readonly="isReadOnly" />
                </FormItem>
            </Col>
            <Col span="12">
                <FormItem label="电话号码">
                    <Input v-model="formItem.telephone" :readonly="isReadOnly" />
                </FormItem>
            </Col>
        </Row>
        <Row>
            <Col span="12">
                    <FormItem label="电子邮件">
                    <Input v-model="formItem.email" :readonly="isReadOnly" />
                </FormItem>
            </Col>
        </Row>
        <Row>
            <Col span="12">
                <FormItem label="创建时间">
                    <Input v-model="formItem.createTime" :readonly="isReadOnly" />
                </FormItem>
            </Col>
            <Col span="12">
                <FormItem label="修改时间">
                    <Input v-model="formItem.modifyTime" :readonly="isReadOnly" />
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
import { queryCorpDetail } from '@/api/corp.js' 
import message from '@/libs/message.js'
    export default {   
        name: 'corpInfo',
        data () {
            return {
                formItem: {
                    corpName: '-',
                    industryType: '-',
                    industryCode: '-',
                    bizItem: '-',
                    bizScope: '-',
                    zipCode: '-',
                    telephone: '-',
                    email: '-',
                    createTime: '-',
                    modifyTime: '-'
                }
            }
        },

        props: {
            corpId: {
                type: Number,
                required: true
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
               this.handleQueryCorpDetail()
            },
            handleQueryCorpDetail () {
                let params = {
                    'corpId': this.corpId
                }
                queryCorpDetail(params).then(response => {
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
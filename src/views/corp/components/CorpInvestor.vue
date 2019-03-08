<template>
    <Card>
        <Row class="margin-top-10">
            <Table :columns="columns" :data="queryData"></Table>
        </Row>             
        <Row v-if="isReadOnly==false">
            <Col span="12">
                <FormItem>
                    <Button type="primary" @click="handleSubmit('formItem')">修改</Button>
                    <Button type="ghost" @click="handleReset('formItem')" style="margin-left: 8px">重置</Button>
                </FormItem>
            </Col>
        </Row>
    </Card>
</template>
<script>
import { queryCorpInvestors } from '@/api/corp.js' 
import message from '@/libs/message.js'
    export default {   
        name: 'corpInvestor',
        data () {
            return {
                columns: [
                    {
                        key: 'investorName',
                        title: '出资方名称',
                        width: 100,
                        fixed: 'left'
                    },
                    {
                        key: 'cardType',
                        title: '证件类型',
                        width: 100
                    },
                    {
                        key: 'cardNo',
                        title: '证件号码',
                        width: 150
                    },
                    {
                        key: 'ratio',
                        title: '出资占比',
                        width: 100
                    },
                    {
                        key: 'createTime',
                        title: '创建时间',
                        width: 150
                    },
                    {
                        key: 'modifyTime',
                        title: '修改时间',
                        width: 150
                    }
                ],
                queryData: []
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
               this.handleQueryCorpInvestors()
            },
            handleQueryCorpInvestors () {
                let params = {
                    'corpId': this.corpId
                }
                queryCorpInvestors(params).then(response => {
                    let responseData = response.data
                    this.queryData = responseData.list
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
<template>
    <div>
        <Row>
            <Col>
                <Card>
                    <p slot="title">
                        <Icon type="mouse"></Icon>
                        点击搜索进行查询
                    </p>
                    <Row>
                        <Input v-model="searchById" icon="search" placeholder="请输入企业编号搜搜..." style="margin: 10px;width: 200px;" />
                        <Input v-model="searchByName" icon="search" placeholder="请输入企业名称搜搜..." style="margin: 10px;width: 200px;" />
                        <span @click="handleSearch" style="margin: 0px 10px;">
                            <Button type="primary" icon="search">搜索</Button>
                        </span>
                        <Button @click="handleCancel" type="ghost" >取消</Button>
                    </Row>
                </Card>
                <br>
                <Card>
                    <Row class="margin-top-10">
                        <Table :loading="searchLoading" :columns="columns" :data="queryData"></Table>
                    </Row>
                    <Row><br></Row>              
                    <Row>
                        <Page :total="total" :current="pageNum" :page-size="pageSize" show-sizer show-total  @on-change="handleChangePage" 
                        @on-page-size-change="handleChangePagesize"></Page>
                    </Row>
                </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
import { queryCorpList } from '@/api/corp.js'
import corpRender from './render/corp.js'

export default {
    name: 'queryCorps',
    data () {
        return {
            searchLoading: false,
            total: 0,
            pageNum: 1,
            pageSize: 10,
            searchById: '',
            searchByName: '',
            corpId: '',
            columns: [{
                 type: 'index',
                 title: '序号',
                 width: 80,
                 align: 'center',
                 fixed: 'left'
            },
            {
                key: 'corpName',
                title: '企业名称',
                width: 100,
                fixed: 'left'
            },
            {
                key: 'registType',
                title: '登记注册类型',
                width: 120
            },
            {
                key: 'registNo',
                title: '登记注册号',
                width: 150
            },
            {
                key: 'registCapital',
                title: '注册资金(万元)',
                width: 150
            },
            {
                key: 'registDate',
                title: '注册日期',
                width: 150
            },
            {
                key: 'validDate',
                title: '有效日期',
                width: 150
            },
            {
                key: 'orgCode',
                title: '组织机构代码',
                width: 150
            },
            {
                key: 'creditCode',
                title: '中征码',
                width: 150
            },
            {
                key: 'nationalTaxCode',
                title: '国税登记号',
                width: 150
            },
            {
                key: 'localTaxCode',
                title: '地税登记号',
                width: 150
            },
            {
                key: 'operation',
                title: '操作',
                width: 150,
                fixed: 'right',
                align: 'center',
                render: (h, params) => {
                    return h ('div', [
                        h('Button', {
                            props: {
                                type: 'primary',
                                size: 'small'
                            },
                            style: {
                                marginRight: '5px'
                            },
                            on: {
                                click: () => {
                                    this.handleRenderView(params.row.corpId)
                                }
                            }
                        }, '查看')
                    ])
                }
            }],

            queryData: []
        };
    },
    methods: {
        init () {
            this.handleSearch()
        },
        handleSearch () {
            let params = {
                'searchByName': this.searchByName,
                'searchById': this.searchById,
                'pageInfo': {
                    'pageNum': this.pageNum,
                    'pageSize': this.pageSize
                }
            }
            this.searchLoading = true
            queryCorpList(params).then(response => {
                let responseData = response.data
                let pageInfo = responseData.pageInfo
                this.total = pageInfo.total
                this.queryData = pageInfo.list
                this.searchLoading = false
            }).catch(error => {
                this.searchLoading = false
            })

        },

        handleCancel () {
            
        },

        handleChangePage (pageNum) {
            this.pageNum = pageNum
            this.handleSearch()
        },

        handleChangePagesize (pageSize) {
            this.pageSize = pageSize
            this.handleSearch()
        },

        handleRenderView (data) {
            let vm = this
            corpRender.viewCorpInfo(vm, data)
        }
    }
};
</script>
<style lang="less" scoped>
    @import '../../styles/common.less';
    @import '../../styles/table.less';
</style>

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
                    <Row>
                        <span @click="handleRenderAdd" style="margin: 0px 10px;">
                            <Button type="primary" icon="person-add">添加</Button>
                        </span>
                        <span @click="handleRenderImport" style="margin: 0px 10px;">
                            <Button type="primary" icon="person-add">导入</Button>
                        </span>
                        <span @click="handleRenderExport" style="margin: 0px 10px;">
                            <Button type="primary" icon="person-add">导出</Button>
                        </span>
                    </Row>  
                    <Row class="margin-top-10">
                        <Table size="small" :columns="columns" :data="queryData"></Table>
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
import { queryCorpList, addCorp, exportCorps } from '@/api/corp.js'
import corpRender from './render/corp.js'
import uploadRender from '../common/render/upload.js'

export default {
    name: 'manageCorps',
    data () {
        return {
            total: 0,
            pageNum: 1,
            pageSize: 10,
            searchById: '',
            searchByName: '',
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
                width: 180,
                fixed: 'right',
                align: 'center',
                render: (h, params) => {
                    return h ('div', [
                        h('Button', {
                            props: {
                                type: 'primary',
                                size: 'small',
                                icon: 'eye'
                            },
                            style: {
                                marginRight: '5px'
                            },
                            on: {
                                click: () => {
                                    this.handleRenderView(params.row.corpId)
                                }
                            }
                        }, '查看'),
                        h('Button', {
                            props: {
                                type: 'primary',
                                size: 'small',
                                icon: 'edit'
                            },
                            style: {
                                marginRight: '5px'
                            },
                            on: {
                                click: () => {
                                    this.handleRenderEdit(params.row.corpId)
                                }
                            }
                        }, '编辑')
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
        
            queryCorpList(params).then(response => {
                let responseData = response.data
                let pageInfo = responseData.pageInfo
                this.total = pageInfo.total
                this.queryData = pageInfo.list
            }).catch(error => {

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

        handleRenderAdd () {
            let vm = this
            corpRender.addCorpInfo(vm)
        },

        handleRenderImport () {
            let vm = this
            uploadRender.viewUpload(vm)
        },

        handleRenderExport() {

            let params = {
                'searchByName': this.searchByName,
                'searchById': this.searchById,
                'pageInfo': {
                    'pageNum': this.pageNum,
                    'pageSize': this.pageSize
                }
            }
        
            exportCorps(params);

        },

        handleRenderView (corpId) {
            let vm = this
            corpRender.viewCorpInfo(vm, corpId)
        },

        handleRenderEdit (corpId) {
            let vm = this
            corpRender.editCorpInfo(vm, corpId)
        }
    }
};
</script>

<style lang="less" scoped>
    @import '../../styles/common.less';
    @import '../../styles/table.less';
</style>
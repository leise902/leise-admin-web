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
                        <Input v-model="searchById" icon="search" placeholder="请输入错误编号搜搜..." style="margin: 10px;width: 200px;" />
                        <Input v-model="searchByName" icon="search" placeholder="请输入错误名称搜搜..." style="margin: 10px;width: 200px;" />
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
                    </Row>  
                    <Row class="margin-top-10 searchable-table-con1">
                        <Table size="small" :loading="searchLoading" :columns="columns" :data="data"></Table>
                    </Row><br>              
                    <Row>
                        <Page :total="totalCount" :page-size="pageSize" show-total  @on-change="changePage" ></Page>
                    </Row>
                </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
import { queryErrorList, addError, queryErrorDetail } from '@/api/error.js'
import errorRender from './render/error.js'

export default {
    name: 'manageUsers',
    data () {
        return {
            searchLoading: false,
            totalCount: 0,
            pageSize: 10,
            currentPage: 2,
            searchById: '',
            searchByName: '',
            columns: [{
                 type: 'index',
                 title: '序号',
                 width: 80,
                 align: 'center'
            },{
                 key: 'errorId',
                 title: '错误编号',
                 sortable: true
            },
            {
                key: 'errorName',
                title: '错误名称'
            },
            {
                key: 'createTime',
                title: '创建时间'
            },
            {
                key: 'modifyTime',
                title: '修改时间'
            },
            {
                key: 'operation',
                title: '操作',
                width: 180,
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
                                    this.handleRenderView(params.row.errorId)
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
                                    this.handleRenderEdit(params.row.errorId)
                                }
                            }
                        }, '编辑')
                    ])
                }
            }],

            data: []
        };
    },

    methods: {
        init () {
            this.handleSearch()
        },

        handleSearch () {
            this.loading = true
            let params = {
                'searchByName': this.searchByName,
                'searchByMobile': this.searchByMobile,
                'page': {
                    'currentPage': this.currentPage,
                    'pageSize': this.pageSize
                }
            }
            return new Promise((resolve, reject) => {
                queryErrorList(params).then(response => {
                    let responseData = response.data
                    let page = responseData.page
                    this.totalCount = page.totalCount
                    this.pageSize = page.pageSize
                    this.currentPage = page.currentPage
                    this.data = responseData.list
                    this.loading = false
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },

        handleCancel () {
            
        },

        changePage () {
            this.handleSearch()
        },

        handleRenderAdd () {
            let vm = this
            errorRender.addErrorInfo(vm)
        },

        handleRenderView (errorId) {
            let vm = this
            errorRender.viewErrorInfo(vm, errorId)
        },

        handleRenderEdit (errorId) {
            let vm = this
            errorRender.editErrorInfo(vm, errorId)
        }
    },
    mounted () {
        this.init();
    }
};
</script>

<style lang="less" scoped>
    @import '../../../styles/common.less';
    @import '../../../styles/table.less';
</style>
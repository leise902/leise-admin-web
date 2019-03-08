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
                        <Input v-model="searchById" icon="search" placeholder="请输入数据字典编号搜搜..." style="margin: 10px;width: 200px;" />
                        <Input v-model="searchByName" icon="search" placeholder="请输入数据字典名称搜搜..." style="margin: 10px;width: 200px;" />
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
import { queryDictList, addDict, queryDictDetail } from '@/api/dict.js'
import dictRender from './render/dict.js'

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
                 key: 'dictId',
                 title: '数据字典编号',
                 sortable: true
            },
            {
                key: 'dictName',
                title: '数据字典名称'
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
                                    this.handleRenderView(params.row.dictId)
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
                                    this.handleRenderEdit(params.row.dictId)
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
                queryDictList(params).then(response => {
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
            dictRender.addDictInfo(vm)
        },

        handleRenderView (dictId) {
            let vm = this
            dictRender.viewDictInfo(vm, dictId)
        },

        handleRenderEdit (dictId) {
            let vm = this
            dictRender.editDictInfo(vm, dictId)
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
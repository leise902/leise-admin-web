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
                        <Input v-model="searchById" icon="search" placeholder="请输入参数代码搜搜..." style="margin: 10px;width: 200px;" />
                        <Input v-model="searchByName" icon="search" placeholder="请输入参数名称搜搜..." style="margin: 10px;width: 200px;" />
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
                            <Button type="primary" icon="plus">添加</Button>
                        </span>
                    </Row>  
                    <Row class="margin-top-10 searchable-table-con1">
                        <Table size="small" :loading="searchLoading" :columns="columns" :data="data"></Table>
                    </Row><br>              
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
import { queryArgsList, queryArgsDetail } from '@/api/args.js'
import argsRender from './render/args.js'

export default {
    name: 'manageUsers',
    data () {
        return {
            searchLoading: false,
            total: 0,
            pageSize: 10,
            pageNum: 1,
            searchById: '',
            searchByName: '',
            columns: [{
                 type: 'index',
                 title: '序号',
                 width: 80,
                 align: 'center'
            },{
                 key: 'argsCode',
                 title: '参数代码',
                 sortable: true
            },
            {
                key: 'argsName',
                title: '参数名称'
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
                                    this.handleRenderView(params.row.argsId)
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
                                    this.handleRenderEdit(params.row.argsId)
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
            let params = {
                'searchByName': this.searchByName,
                'searchById': this.searchByMobile,
                'pageInfo': {
                    'pageNum': this.pageNum,
                    'pageSize': this.pageSize
                }
            }
           
            queryArgsList(params).then(response => {
                let responseData = response.data
                let pageInfo = responseData.pageInfo
                this.total = pageInfo.total
                this.pageSize = pageInfo.pageSize
                this.currentPage = pageInfo.currentPage
                this.data = pageInfo.list
                this.loading = false
            }).catch(error => {
                this.$Loading.error()
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
            argsRender.addArgsInfo(vm)
        },

        handleRenderView (argsId) {
            let vm = this
            argsRender.viewArgsInfo(vm, argsId)
        },

        handleRenderEdit (argsId) {
            let vm = this
            argsRender.editArgsInfo(vm, argsId)
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
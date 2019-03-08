<template>
    <div>
        <Row>
            <Col>
                <Card>
                    <p slot="title">
                        <Icon type="mouse"></Icon>
                        您可以进行菜单选项的操作
                    </p>
                </Card>
                <br>
                <Col span="12">
                    <Card>
                        <p slot="title" style="color:#2D8CF0">
                        <Icon type="information-circled"></Icon>
                            系统菜单列表
                        </p>
                        <Row class="margin-top-10 searchable-table-con1">
                            <Tree :data="data" :render="renderContent"></Tree>
                        </Row>
                    </Card>
                </Col>
                <Col span="12">
                    <Card v-if="showMenuDetail">
                        <p slot="title" style="color:#2D8CF0">
                            <Icon type="information-circled"></Icon>
                            菜单基本信息
                        </p>
                        <Form ref="formItem" :model="formItem" :rules="ruleValidate" :label-width="80">
                            <Row>
                                <Col span="12">
                                    <FormItem label="菜单代码">
                                        <Input v-model="formItem.menuCode" disabled></Input>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="菜单标题" prop="title">
                                        <Input v-model="formItem.title" placeholder="请输入菜单标题" disabled></Input>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="12">
                                    <FormItem label="菜单路径" prop="path">
                                        <Input v-model="formItem.path" placeholder="请输入菜单路径" disabled></Input>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="菜单名称" prop="name">
                                        <Input v-model="formItem.name" placeholder="请输入菜单名称" disabled></Input>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="12">
                                    <FormItem label="菜单图标" prop="icon">
                                        <Input v-model="formItem.icon" placeholder="请输入菜单图标" disabled></Input>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="菜单组件" prop="component">
                                        <Input v-model="formItem.component" placeholder="请输入菜单组件" disabled></Input>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="12">
                                    <FormItem label="菜单级别" prop="level">
                                        <Input v-model="formItem.level" placeholder="请输入菜单级别" disabled></Input>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="父菜单代码" prop="parentMenuCode">
                                        <Input v-model="formItem.parentMenuCode" placeholder="请输入菜单代码" disabled></Input>
                                    </FormItem>
                                </Col>
                            </Row>
                            <FormItem>
                                <Button type="primary" @click="handleSubmit('formItem')">保存</Button>
                                <Button type="ghost" @click="handleReset('formItem')" style="margin-left: 8px">重置</Button>
                            </FormItem>
                        </Form>
                    </Card>
                </Col>
            </Col>
        </Row>
    </div>
</template>

<script>
import { getMenuList } from '@/api/sysmanage.js'

export default {
    name: 'manageMenus',
    data () {
        return {
           data: [],
           menuData: [],
           showMenuDetail: false,
           formItem: {
               menuCode: '',
               title: '',
               name: '',
               icon: '',
               path: '',
               component: '',
               level: '',
               enable: ''
           }
        };
    },
    methods: {

        init() {
            this.handleSearch()
        },

        handleSearch () {
            this.loading = true
            let userId = sessionStorage.getItem('UserId')

            return new Promise((resolve, reject) => {
                getMenuList(userId).then(response => {
                    let responseData = response.data
                    this.menuData = responseData.menuList
                    this.handleBuild()
                    this.loading = false
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })

        },

        handleBuild () {
            let menuList = [{
                title: "系统菜单",
                expand: true,
                render: (h, { root, node, data }) => {
                    return h('span', {
                        style: {
                            display: 'inline-block',
                            width: '100%'
                        }
                    }, [
                        h('span', [
                            h('Icon', {
                                props: {
                                    type: 'navicon-round'
                                },
                                style: {
                                    marginRight: '8px'
                                }
                            }),
                            h('span', data.title)
                        ]),
                        h('span', {
                            style: {
                                display: 'inline-block',
                                float: 'right',
                                marginRight: '32px'
                            }
                        }, [
                            h('Button', {
                                props: Object.assign({}, this.buttonProps, {
                                    icon: 'ios-plus-empty',
                                    type: 'primary'
                                }),
                                style: {
                                    width: '52px'
                                },
                                on: {
                                    click: () => { this.append(data) }
                                }
                            })
                        ])
                    ]);
                },
                children: this.menuData
            }]

            this.data = menuList
        },

        renderContent (h, { root, node, data }) {
            return h('span', {
                style: {
                    display: 'inline-block',
                    width: '100%'
                }
            }, [
                h('span', [
                    h('Icon', {
                        props: {
                            type: data.icon
                        },
                        style: {
                            marginRight: '8px'
                        }
                    }),
                    h('span', data.title)
                ]),
                h('span', {
                    style: {
                        display: 'inline-block',
                        float: 'right',
                        marginRight: '32px'
                    }
                }, [
                    h('Button', {
                        props: Object.assign({}, this.buttonProps, {
                            icon: 'ios-plus-empty',
                            type: 'primary'
                        }),
                        style: {
                            display: data.level == 2 ? 'none': 'true',
                            marginRight: '8px'
                        },
                        on: {
                            click: () => { this.append(data) }
                        }
                    }),
                    h('Button', {
                        props: Object.assign({}, this.buttonProps, {
                            icon: 'ios-minus-empty',
                            type: 'primary'
                        }),
                        style: {
                            marginRight: '8px'
                        },
                        on: {
                            click: () => { this.remove(root, node, data) }
                        }
                    }),
                    h('Button', {
                        props: Object.assign({}, this.buttonProps, {
                            icon: 'eye',
                            type: 'primary'
                        }),
                        on: {
                            click: () => { this.view(root, node, data) }
                        }
                    })
                ])
            ]);
        },
        append (data) {
            const children = data.children || [];
            children.push({
                title: 'appended node',
                expand: true,
                level: data.level + 1
            });
            this.$set(data, 'children', children);
        },
        remove (root, node, data) {
            this.showMenuDetail = false
            const parentKey = root.find(el => el === node).parent;
            const parent = root.find(el => el.nodeKey === parentKey).node;
            const index = parent.children.indexOf(data);
            parent.children.splice(index, 1);
        },
        view (root, node, data) {
            this.showMenuDetail = true
            this.formItem = data
        }
    },

    created () {
        this.init();
    }
};
</script>

<style lang="less" scoped>
    @import '../../../styles/common.less';
    @import '../../../styles/table.less';
</style>
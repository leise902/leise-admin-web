<template>
    <Card>
        <p slot="title" style="color:#2D8CF0">
            <Icon type="plus-circled"></Icon>
            添加参数信息
        </p>
        <Row>
            <Form ref="formItem" :model="formItem" :rules="ruleValidate" :label-width="80">
                <Row>
                    <Col span="12">
                        <FormItem label="参数编号">
                            <Input v-model="formItem.argsId" disabled placeholder="系统自动生成" />
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="参数代码" prop="argsCode">
                            <Input v-model="formItem.argsCode" placeholder="请输入参数代码..." />
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="参数名称" prop="argsName">
                            <Input v-model="formItem.argsName" placeholder="请输入参数名称" />
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="是否启用" prop="enable">
                            <i-switch v-model="formItem.enable" size="large">
                                <span slot="open">开启</span>
                                <span slot="close">关闭</span>
                            </i-switch>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <FormItem label="描述信息" prop="description">
                        <Input v-model="formItem.description" placeholder="请输入描述信息..." />
                    </FormItem>
                </Row>
                <Row>
                    <FormItem>
                        <Button type="primary" @click="handleSubmit('formItem')">保存</Button>
                        <Button type="ghost" @click="handleReset('formItem')" style="margin-left: 8px">重置</Button>
                    </FormItem>
                </Row>
            </Form>
        </Row>
    </Card>
</template>
<script>
export default {
  data() {
    return {
      formItem: {
        argsId: "",
        argsCode: "",
        argsName: "",
        enable: true,
        description: ""
      },
      ruleValidate: {
        argsName: [
          { required: true, message: "参数名称不能为空", trigger: "blur" }
        ],
        argsCode: [
          { required: true, message: "参数代码不能为空", trigger: "blur" }
        ]
      }
    };
  },

  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Message.success("Success!");
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    }
  }
};
</script>
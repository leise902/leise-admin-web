<template>
    <div>
      <Card>
        <p slot="title">
            <Icon type="gear-b"></Icon>
            配置规则条件
        </p>
        <Row>
          <Col span="12">
            <Card>
              <Row>
                <Form ref="formItem" :model="formItem" :label-width="80">
                  <FormItem label="选择变量">
                    <Select v-model="selectedArgs" filterable @on-change="handleAddArgs" multiple>
                        <Option v-for="argsItem in argsList" :value="argsItem.value" :key="argsItem.value">{{ argsItem.label }}</Option>
                        <Page :total="total" :current="pageNum" :page-size="pageSize" @on-change="handleChangePage" size="small"></Page>
                    </Select>
                  </FormItem>
                  <!-- <FormItem label="选择常量">
                    <Select v-model="selectedConstantArgs" filterable @on-change="handleAddArgs">
                        <Option v-for="constantArgsItem in constantArgsList" :value="constantArgsItem.value" :key="constantArgsItem.value">{{ constantArgsItem.label }}</Option>
                    </Select>
                  </FormItem>
                  <FormItem label="条件描述">
                    <Input v-model="formItem.ruleDescription" placeholder="请输入描述信息..." />
                  </FormItem> -->
                </Form>
              </Row>
            </Card>
          </Col>
          <Col span="12">
            <Card>
              <Row>
                <textarea rows="8" cols="40" v-model="ruleCondition" style="resize:none;line-height:150%"/>
              </Row>
              <Row>
                <ButtonGroup>
                  <Button @click="handlePress('1')">1</Button>
                  <Button @click="handlePress('2')">2</Button>
                  <Button @click="handlePress('3')">3</Button>
                  <Button @click="handlePress('4')">4</Button>
                  <Button @click="handlePress('5')">5</Button>
                  <Button @click="handlePress('6')">6</Button>
                  <Button @click="handlePress('7')">7</Button>
                  <Button @click="handlePress('8')">8</Button>
                  <Button @click="handlePress('9')">9</Button>
                  <Button @click="handlePress('0')">0</Button>
                  <Button @click="handlePress('00')">00</Button>
                  <Button @click="handlePress('000')">000</Button>       
                </ButtonGroup>
                <ButtonGroup>
                  <Button @click="handlePress('+')">+</Button>
                  <Button @click="handlePress('-')">-</Button>
                  <Button @click="handlePress('x')">x</Button>
                  <Button @click="handlePress('/')">/</Button>
                  <Button @click="handlePress('%')">%</Button>
                  <Button @click="handlePress('.')">.</Button>
                </ButtonGroup>
                <ButtonGroup>
                  <Button @click="handlePress('?')">?</Button>
                  <Button @click="handlePress(':')">:</Button>
                  <Button @click="handlePress('(')">(</Button>
                  <Button @click="handlePress(')')">)</Button>
                  <Button @click="handlePress('&&')">并且</Button>
                  <Button @click="handlePress('||')">或者</Button>
                  <Button @click="handlePress('==')">等于</Button>
                  <Button @click="handlePress('!=')">不等于</Button>
                  <Button @click="handlePress('>')">大于</Button>
                  <Button @click="handlePress('<')">小于</Button>
                  <Button type="primary" @click="handleClear">清空</Button>
                  <Button type="primary" @click="handleSubmit">确定</Button>
                </ButtonGroup>
              </Row>
            </Card>
          </Col>
        </Row>
      </Card>
    </div>
</template>

<script>
import { queryArgsList } from '@/api/args.js'

export default {
  name: 'configRule',
  data () {
    return{
      total: 0,
      pageSize: 10,
      pageNum: 1,
      ruleCondition: '',
      selectedArgs: [],
      selectedConstantArgs: '',
      constantArgsList: [],
      argsList: [],
      formItem: {
        description: ''
      }
    }
  },
  methods: {
    handlePress (value) {
      let that = this
      that.ruleCondition += value
    },
    handleAddArgs () {
      let that = this
      that.ruleCondition += this.selectedArgs
    },
    handleClear () {
      this.ruleCondition = ''
    },
    handleSubmit () {
      var that = this
      this.$emit('emitRuleCondition', that.ruleCondition);
    },
    handleSearchArgs () {
        let params = {
            'pageInfo': {
                'pageNum': this.pageNum,
                'pageSize': this.pageSize
            }
        }     
        queryArgsList(params).then(response => {
            let responseData = response.data
            let pageInfo = responseData.pageInfo
            this.total = pageInfo.total
            this.argsList = pageInfo.list.map(item => {
                return {
                    value : item.argsCode,
                    label : item.argsName
                }
            })
        }).catch(error => {

        })
    },
    handleAppendArgs () {
      let that = this
      that.ruleCondition += this.selectedArgs
    },
    changeModeEvent: function() {
      let that = this
      that.changeMode = !that.changeMode
    },
    handleChangePage (pageNum) {
      this.pageNum = pageNum
      this.handleSearchArgs()
    }
  },
  created () {
    this.handleSearchArgs()
  }
}
</script>

<style scoped>

</style>
<template>
    <div class="home">
        <Row :gutter="10">
            <Col :md="24" :lg="8" span="12">
            <Card>
                <Row type="flex" class="user-infor">
                    <Col span="8">
                    <Row class-name="made-child-con-middle" type="flex" align="middle">
                        <img class="user-img" :src="userImage" />
                    </Row>
                    </Col>
                    <Col span="16" style="padding-left:6px;">
                    <Row class-name="made-child-con-middle" type="flex" align="middle">
                        <div>
                            <b class="card-user-infor-name">Admin</b>
                            <p>super admin</p>
                        </div>
                    </Row>
                    </Col>
                </Row>
                <div class="line-gray"></div>
                <Row class="margin-top-8">
                    <Col span="8">
                    <p class="notwrap">上次登录时间:</p>
                    </Col>
                    <Col span="16" class="padding-left-8">2017.09.12-13:32:20</Col>
                </Row>
                <Row class="margin-top-8">
                    <Col span="8">
                    <p class="notwrap">上次登录地点:</p>
                    </Col>
                    <Col span="16" class="padding-left-8">北京</Col>
                </Row>
            </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  computed: {
    userImage() {
      return ''
    }
  }
}
</script>

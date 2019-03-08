<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
          <p class="login-tip">输入任意用户名和密码即可</p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from '@/components/login-form'
import { mapActions } from 'vuex'
export default {
  components: {
    LoginForm
  },
  methods: {
    ...mapActions(['handleLogin', 'getUserInfo']),
    handleSubmit({ userName, password }) {
      this.handleLogin({ userName, password }).then(res => {
        // this.getUserInfo().then(res => {
        //   this.$router.push({
        //     name: this.$config.homeName
        //   })
        // })
        this.$router.push({
          name: this.$config.homeName
        })
      })
    }
  }
  //   data() {
  //     return {
  //       form: {
  //         userId: '100000',
  //         password: ''
  //       },
  //       rules: {
  //         userId: [
  //           { required: true, message: '请输入用户编号', trigger: 'blur' }
  //         ],
  //         password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
  //       }
  //     }
  //   },
  //   methods: {
  //     handleSubmit() {
  //       this.$refs.loginForm.validate(valid => {
  //         if (valid) {
  //           this.$store
  //             .dispatch('LoginByUserId', this.form)
  //             .then(() => {
  //               console.log('登录成功')
  //               this.$router.push({ name: 'home_index' })
  //               console.log('跳转主页')
  //             })
  //             .catch(error => {
  //               console.log('error==>' + error)
  //               console.log('登录失败')
  //             })
  //         }
  //       })
  //     }
  //   }
}
</script>

<style lang="less">
@import './login.less';
</style>

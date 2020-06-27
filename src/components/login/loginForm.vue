<template>
  <div class="login">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
      <el-form-item>
        <h1>主机数据集操作平台</h1>
      </el-form-item>
      <el-form-item prop="username">
        <el-input v-model="ruleForm.username" placeholder="请输入账号名" prefix-icon="el-icon-user"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="ruleForm.password" placeholder="请输入密码" prefix-icon="el-icon-lock" type="password"></el-input>
      </el-form-item>
      <el-form-item prop="address">
        <el-input v-model="ruleForm.address"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="submitLogin('ruleForm')">登录</el-button>
      </el-form-item>
      <el-form-item>
        <el-tooltip effect="dark" content="账号与密码分别为主机登录时的账号与密码" placement="top-start">
          <i class="el-icon-question"></i>
        </el-tooltip>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
    export default {
        name: "loginForm",
      data() {
          return {
            ruleForm: {
              username: '',
              password: '',
              address: '10.60.43.8:8800'
            },
            rules: {
              username: [
                { required: true, message: '请输入主机账号', trigger: 'blur'},
                { len: 5, message: '长度为5位字符', trigger: 'blur'}
              ],
              password: [
                { required: true, message: '请输入密码', trigger: 'blur'}
              ]
            }
          }
      },
      // created: function(){
      //   this.$axios({
      //     method: 'get',
      //     url: '/login',
      //   }).then((response) => {
      //     console.log(response);
      //     if(response.data === this.$store.state.user.account){
      //       this.$router.push({
      //         path: '/main'
      //       })
      //     }
      //   }).catch((err) => {
      //     console.log(err);
      //     alert("接口异常");
      //   })
      // },
      methods: {
          submitLogin(ruleForm){
            this.$refs[ruleForm].validate((valid) => {
              if(valid){
                this.$axios({
                  method: 'post',
                  url: '/login',
                  data: {
                    account: this.ruleForm.username,
                    password: this.ruleForm.password,
                    address: this.ruleForm.address
                  }
                }).then((response) => {
                  console.log(response);
                  if(response.status === 200 && response.data === 'successful'){
                    this.$store.state.user['account'] = this.ruleForm.username;
                    this.$router.push({
                      path: '/main'
                    })
                  }
                  if(response.status === 401){
                    alert("用户名或密码错误!");
                  }
                }).catch(() => {
                  alert("接口异常");
                })

              }else{
                return false;
              }
            })
          }
      }
    }
</script>

<style lang="less" scoped>
  .login{
    width: 400px;
    height: 400px;
    background-color: rgba(180, 180, 180, 0.8);
    .el-form{
      width: 300px;
      margin: 0 auto;
      .el-form-item{
        h1{
          margin-left: 25px;
        }
        .el-button{
          width:300px;
          background-color: dodgerblue;
          -webkit-border-radius: 0;
          -moz-border-radius: 0;
          border-radius: 0;
        }
        .el-button:hover{
          color: white;
        }
      }
    }
  }
  .login /deep/ .el-input__inner{
    -webkit-border-radius: 0;
    -moz-border-radius: 0;
    border-radius: 0;
  }
</style>

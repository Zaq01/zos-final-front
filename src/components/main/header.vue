<template>
<div>
  <el-row class="header_">
    <el-dropdown @command="handleClick">
      <span><i class="el-icon-user"></i>{{ this.$store.state.user.account}}</span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="login" v-if="!this.$store.state.user.account">登录</el-dropdown-item>
        <el-dropdown-item command="main_" v-if="this.$route.name === 'create'">主页</el-dropdown-item>
        <el-dropdown-item command="create" v-if="this.$store.state.user.account && this.$route.name === 'main'">创建数据集</el-dropdown-item>
        <el-dropdown-item command="logout" v-if="this.$store.state.user.account">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-row>
</div>
</template>

<script>
    export default {
        name: "header_",
      methods:{
        handleClick: function(command){
          if(command === 'login'){
            this.$router.push({
              path: '/'
            })
          }else if(command === 'logout'){
            this.$store.state.user = {};
            this.$axios({
              method: 'delete',
              url: '/logoff',
            }).then((response) => {
              if(response.status === 200){
                alert("退出成功");
                this.$router.push({
                  path: '/'
                })
              }
            }).catch(() => {
              alert("接口异常");
            });
          }else if(command === 'create'){
            this.$router.push({
              path: '/create'
            })
          }else if(command === 'main_'){
            this.$router.push({
              path: '/main'
            })
          }
        }
      }
    }
</script>

<style lang="less" scoped>

  .header_{
    .el-dropdown{
      display: inline;
      float: right;
      margin-right: 20px;
      span{
        margin-top: 20px;
        color: white;
        float: right;
        font-size: 22px;
      }
      span:hover{
        cursor: pointer;
      }
    }
  }
</style>

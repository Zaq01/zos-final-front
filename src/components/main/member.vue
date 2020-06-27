<template>
  <div class="main_">
    <header_></header_>
    <div class="bread">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{path: '/main'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{this.$route.params.name}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="member_detail">
      <el-row :gutter="20" v-for="(item,index) in member_list" :key="index">
        <el-col :span="3">
          <span class="dts_num">{{index}}</span>
        </el-col>
        <el-col :span="11">
          <span class="dts_name">{{item}}</span>
        </el-col>
<!--        <el-col :span="4">-->
<!--          <el-button>详情</el-button>-->
<!--        </el-col>-->
        <el-col :span="5">
          <el-button @click="get_member_detail(item)">编辑</el-button>
        </el-col>
        <el-col :span="5">
          <el-button @click="delete_member(item)">删除</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="member_btn">
      <el-col :span="12">
        <el-button @click="create_dataset()">新建</el-button>
      </el-col>
      <el-col :span="12">
        <span>name:</span>
        <el-input v-model="input"></el-input>
        <br/><br/>
      </el-col>
    </div>
  </div>

</template>

<script>
  import header_ from './header'
    export default {
        name: "member",
      components: {
          header_
      },
      inject: ['reload'],
      data(){
          return{
            member_list: [],
            input: '',
            code:'//'
          }
      },
      created: function(){
          this.get_member_list();
      },
      methods: {
          get_member_list: function(){
            console.log(this.$route.params.name);
            this.$axios({
              method: 'get',
              url: '/dataset/'+this.$route.params.name+'/member',
            }).then((response) => {
              console.log(response);
              this.member_list = response.data;
            }).catch((error) => {
              console.log(error);
              alert("接口异常！");
            })
          },
        delete_member: function(item){
          this.$axios({
            method: 'delete',
            url: '/dataset/'+this.$route.params.name+'('+item+")"
          }).then((response) => {
            if(response.status === 200 && response.data === 'successful'){
              alert("删除成功");
              this.$router.go(0)
            }
          }).catch((error) => {
            console.log(error);
            alert("接口异常！");
          })
        },
        create_dataset:function(){
          this.$axios({
            method: 'put',
            url: '/dataset/'+this.$route.params.name+'('+this.input+")",
            data: this.code
          }).then((response) => {
              console.log(response);
              if(response.status ===200){
                alert("创建成功！");
              this.$router.go(0)
              }
            }).catch((error) => {
              console.log(error);
              alert("创建成功!");
             this.$router.go(0)
          })
        },
        get_member_detail: function(member){
          this.$axios({
            method: 'get',
            url: '/dataset/'+this.$route.params.name+'('+member+')',
          }).then((response) => {
            this.$store.state.code = response.data;
            this.$router.push({
              path: `/edit/${this.$route.params.name}(${member})`
            });
          }).catch(() => {
            alert("接口异常!");
          });
        }
      },
    }
</script>

<style lang="less" scoped>
  .main_{
    background-color: #0a1c1c;
    background-size: cover;
    filter: Alpha(opacity=80);
    position: static;
    *zoom:1;
  }
  .bread{
    width: 400px;
    margin-left: 100px;
  }
  .member_detail{
    margin-top: 100px;
    margin-left: 400px;
    width: 40%;
    .el-row{
      border-bottom: 1px solid #909090;
      .dts_num{
        color: orangered;
        top: 14px;
        position: relative;
        font-size: 18px;
      }
      .dts_name{
        top: 14px;
        left: 20px;
        position: relative;
        color: white;
        font-size: 16px;

      }
      .el-button:hover{
        color: orangered;
      }
      .PDS_down{
        color: white;
      }
      .PDS_down:hover{
        cursor:pointer;
      }
    }
  }
  .el-button{
    -webkit-border-radius: 0;
    -moz-border-radius: 0;
    border-radius: 0;
    background-color: transparent;
    border: 0;
    width: 50px;
    height: 50px;
  }
  .member_btn{
    width: 30%;
    margin: 0 auto;
    position: relative;
    top: 100px;
    .el-button{
      width: 100px;
      border-bottom: 1px solid #a8a8a8;
      border-top: 0;
      border-left: 0;
      border-right: 0;
    }
    .el-button:hover{
      color: orangered;
    }
    span{
      color: white;
    }
  }
  .member_btn /deep/ .el-input__inner{
    background-color: transparent;
    border-bottom: 2px solid #ffffff;
    border-top: 0;
    border-left: 0;
    border-right: 0;
    -webkit-border-radius: 0;
    -moz-border-radius: 0;
    border-radius: 0;
  }
</style>

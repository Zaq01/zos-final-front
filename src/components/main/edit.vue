<template>
  <div>
    <header_></header_>
    <div class="back_">
      <div class="bread">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{path: '/main'}">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{this.$route.params.dataset}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="in-coder-panel">
        <textarea
          ref="mycode"
          v-model="this.$store.state.code"></textarea>
      </div>
      <div class="submit_btn">
        <el-button @click="submit_edit()">提交</el-button>
      </div>
    </div>
  </div>

</template>

<script>
  import codemirror from 'codemirror/lib/codemirror'
  import 'codemirror/lib/codemirror.css'
  import 'codemirror/theme/cobalt.css'
  import 'codemirror/mode/cobol/cobol'
  import 'codemirror/mode/shell/shell'
  import 'codemirror/theme/ambiance.css'
  import 'codemirror/theme/material-darker.css'
  import 'codemirror/theme/seti.css'
  import header_ from './header'

    export default {
      name: "edit",
      components: {
          header_,
      },
      inject: ['reload'],
      created: function(){
        this.get_detail();
      },
      data(){
        return{
          code: "",
        }
      },

      mounted(){
        let type = 'text/cobol';
        let theme = 'material-darker';
        let coder = codemirror.fromTextArea(this.$refs.mycode, {
          mode: type,
          indentWithTabs: true,
          lineNumbers: true,
          theme: theme
        });
        coder.on('change', (coder) => {
          this.code = coder.getValue();
        })
      },
      methods: {
        get_detail:function(){
          this.$axios({
            method: 'get',
            url: '/dataset/'+this.$route.params.dataset,
          }).then((response) => {
            this.$store.state.code = response.data;
            console.log(response.data);
          }).catch(() => {
            alert("接口异常!");
          });
        },
        submit_edit:function(){
          this.$axios({
            method: 'put',
            url: '/dataset/'+this.$route.params.dataset,
            data: this.code
          }).then((response) => {
            if(response.status === 200){
              alert("提交成功");
              this.reload();
            }
          }).catch(() => {
            alert('接口异常');
          });
        }
      }
    }
</script>

<style lang="less" scoped>
  .bread{
    width: 400px;
    margin-left: 100px;
  }
  .in-coder-panel{
    width: 70%;
    position: relative;
    top: 30px;
    margin: 0 auto;
    box-shadow: white;
  }
  .in-coder-panel /deep/ .CodeMirror{
    height: 600px !important;
    box-shadow: 2px 2px 10px #ffffff;
  }
  .submit_btn{
    width: 10%;
    margin: 0 auto;
    position: relative;
    top: 100px;
    .el-button{
      -webkit-border-radius: 0;
      -moz-border-radius: 0;
      border-radius: 0;
      background-color: transparent;
      width: 100px;
      border-bottom: 1px solid #a8a8a8;
      border-top: 0;
      border-left: 0;
      border-right: 0;
    }
    .el-button:hover{
      color: orangered;
    }
  }

</style>

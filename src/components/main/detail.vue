<template>
<div>
  <header_></header_>
  <div class="bread">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{path: '/main'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{this.$route.params.dataset}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
  <div class="detail">
    <el-row>
      <span>blksz: &emsp; &emsp;</span>
      <span>{{$store.state.dataset_detail.blksz}}</span>
    </el-row>
    <el-row>
      <span>catnm: &emsp; &emsp;</span>
      <span>{{$store.state.dataset_detail.catnm}}</span>
    </el-row>
    <el-row>
      <span>bcdate: &emsp; &emsp;</span>
      <span>{{$store.state.dataset_detail.cdate}}</span>
    </el-row>
    <el-row>
      <span>dev: &emsp; &emsp; </span>
      <span>{{$store.state.dataset_detail.dev}}</span>
    </el-row>
    <el-row>
      <span>dsname: &emsp; &emsp;</span>
      <span>{{$store.state.dataset_detail.dsname}}</span>
    </el-row>
    <el-row>
      <span>dsntp: &emsp; &emsp;</span>
      <span>{{$store.state.dataset_detail.dsntp}}</span>
    </el-row>
    <el-row>
      <span>dsorg: &emsp; &emsp;</span>
      <span>{{$store.state.dataset_detail.dsorg}}</span>
    </el-row>
    <el-row>
      <span>edate: &emsp; &emsp;</span>
      <span>{{$store.state.dataset_detail.edate}}</span>
    </el-row>
    <el-row>
      <span>extx: &emsp; &emsp;</span>
      <span>{{$store.state.dataset_detail.extx}}</span>
    </el-row>
    <el-row>
      <span>lrecl: &emsp; &emsp;</span>
      <span>{{$store.state.dataset_detail.lrecl}}</span>
    </el-row>
    <el-row>
      <span>migr: &emsp; &emsp;</span>
      <span>{{$store.state.dataset_detail.migr}}</span>
    </el-row>
    <el-row>
      <span>mvol: &emsp; &emsp;</span>
      <span>{{$store.state.dataset_detail.mvol}}</span>
    </el-row>
    <el-row>
      <span>ovf: &emsp; &emsp;</span>
      <span>{{$store.state.dataset_detail.ovf}}</span>
    </el-row>
    <el-row>
      <span>rdate: &emsp; &emsp;</span>
      <span>{{$store.state.dataset_detail.rdate}}</span>
    </el-row>
    <el-row>
      <span>recfm: &emsp; &emsp;</span>
      <span>{{$store.state.dataset_detail.recfm}}</span>
    </el-row>
    <el-row>
      <span>sizex: &emsp; &emsp;</span>
      <span>{{$store.state.dataset_detail.sizex}}</span>
    </el-row>
    <el-row>
      <span>spacu: &emsp; &emsp;</span>
      <span>{{$store.state.dataset_detail.spacu}}</span>
    </el-row>
    <el-row>
      <span>used: &emsp; &emsp;</span>
      <span>{{$store.state.dataset_detail.used}}</span>
    </el-row>
    <el-row>
      <span>vol: &emsp; &emsp;</span>
      <span>{{$store.state.dataset_detail.vol}}</span>
    </el-row>
  </div>
</div>
</template>

<script>
  import header_ from './header'
    export default {
        name: "detail",
      components:{
          header_
      },
      data(){
          return{
            data: []
          }
      },
      created:function(){
          let temp = this.$store.state.dataset_detail;
          console.log(temp);
          // console.log(temp.key)
      }
    }
</script>

<style lang="less" scoped>
  .bread{
    width: 400px;
    margin-left: 100px;
  }
  .detail{
    width: 60%;
    margin: 0 auto;
    padding-top: 100px;
    span{
      font: italic 2em Georgia, serif;
      color: white;
      letter-spacing: 2px;
      font-size: 16px;
      width: 100%;
    }
  }

</style>

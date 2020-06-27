<template>
  <div class="main_">
    <header_></header_>
    <el-row class="search">
      <el-col :span="10">
        <el-input
          placeholder="请输入数据集名称"
          v-model="input"></el-input>
      </el-col>
      <el-col :span="5">
        <el-button type="primary" icon="el-icon-search" @click="handleSearch"></el-button>
      </el-col>
    </el-row>

    <div class="dataset_detail" v-if="$store.state.dataset.length">
        <el-row :gutter="10" v-for="(item, index) in $store.state.dataset_page" :key="index">
          <el-col :span="1">
            <span class="dts_num">{{index + (currentPage-1)*10}}</span>
          </el-col>
          <el-col :span="13">
            <span class="dts_name" v-if="item.dsname">{{item.dsname}}</span>
          </el-col>
          <el-col :span="3">
            <el-button @click="getDetail(item)">详情</el-button>
          </el-col>
          <el-col :span="3">
            <el-button @click="getDataset(item.dsname, item.dsorg)">编辑</el-button>
          </el-col>
          <el-col :span="3">
            <el-button @click="delete_dataset(item.dsname)">删除</el-button>
          </el-col>
          <el-col :span="1" v-if="item.dsorg === 'PO'" class="PDS_down">
            <el-button @click="toMember(item.dsname)"><i class="el-icon-arrow-right"></i></el-button>
          </el-col>
        </el-row>
      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="10"
          layout="prev, pager, next, jumper"
          :total="this.$store.state.dataset.length"></el-pagination>
      </div>

    </div>
  </div>
</template>

<script>
  import header_ from './header'
    export default {
        name: "main_",
      data(){
          return {
            input: '',
            pageSize: 9,
            currentPage: 1,
          }
      },
      components:{
          header_
      },
      created: function(){},
      updated: function(){},
      inject: ['reload'],
      methods:{
        handleSearch: function(){
          this.$axios({
            method: 'get',
            url: '/dataset',
            params: {
              pattern: this.input
            }
          }).then((response) => {
            console.log(response);
            this.$store.state.dataset = response.data;
            if(response.data.length <= 10){
              this.$store.state.dataset_page = response.data;
            }else{
              for(let i = 0; i < 10; i++){
                this.$store.state.dataset_page[i] = response.data[i];
              }
            }
          }).catch((err) => {
            console.log(err);
            alert("接口异常")
          })
        },
        getDetail: function(index){
          console.log(index);
          this.$store.state.dataset_detail = index;
          this.$router.push({
            path: `/detail/${index.dsname}`
          })
        },
        toMember: function(name){
          this.$router.push({
            path:`/member/${name}`
          })
        },
        delete_dataset:function(name){
          this.$axios({
            method: 'delete',
            url: '/dataset/'+name
          }).then((response) => {
            if(response.status === 200 && response.data === 'successful'){
              alert("删除成功");
              for(let i = 0; i < this.$store.state.dataset_page.length; i++){
                if(this.$store.state.dataset_page[i].dsname === name){
                  this.$store.state.dataset_page.splice(i, 1);
                  this.reload();
                }
              }
            }
          }).catch(() => {
            alert("接口异常！");
          })
        },
        getDataset:function(name, type){
          if(type === 'PO'){
            this.$router.push({
              path: `/member/${name}`
            })
          }else{
            this.$axios({
              method: 'get',
              url: '/dataset/'+name
            }).then((response) => {
              this.$store.state.code = response.data;
              this.$router.push({
                path: `/edit/${name}`
              })
            }).catch(() => {
              alert("接口异常！");
            });
          }
        },
        handleSizeChange(val){},
        handleCurrentChange(val){
          if(this.$store.state.dataset.length <= 10){
            this.$store.state.dataset_page = this.$store.state.dataset;
          }
          else{
            for(let i = 0; i < 10; i++){
              if((i + (this.currentPage-1)*10) < this.$store.state.dataset.length){
                this.$store.state.dataset_page[i] = this.$store.state.dataset[i + (this.currentPage-1)*10];
              }else{
                this.$store.state.dataset_page.pop();
              }
            }
          }
          console.log(this.$store.state.dataset_page);
          this.reload();
        }
      }
    }
</script>

<style lang="less" scoped>
  .main_{
    background-color: #0a1c1c;
    filter: Alpha(opacity=80);
    position: static;
    *zoom:1;
    height: 100%;
  }
  .search{
    width: 800px;
    top: 50px;
    left: 200px;
    margin: 0 auto;
  }
  .search /deep/ .el-input__inner{
    background-color: transparent;
    border-bottom: 2px solid #ffffff;
    border-top: 0;
    border-left: 0;
    border-right: 0;
    -webkit-border-radius: 0;
    -moz-border-radius: 0;
    border-radius: 0;
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
  .dataset_detail{
    margin-top: 100px;
    margin-left: 300px;
    width: 50%;
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
  .pagination{
    width: 60%;
    height: 30px;
    position: relative;
    margin: 0 auto;
    top: 30px;

  }
  .pagination /deep/ .el-input__inner{
    background-color: #0a1c1c;
    color: white;
    font-size: 16px;
    border-bottom: 1px solid #ffffff;
    border-top: 0;
    border-left: 0;
    border-right: 0;
  }
  .pagination /deep/ .el-pager li{
    background-color: #0a1c1c;
  }
  .pagination /deep/ button{
    background-color: #0a1c1c;
  }
  .pagination /deep/ button:disabled{
    color: orangered;
  }
</style>

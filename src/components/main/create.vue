<template>
  <div class="main_">
    <header_></header_>
    <div class="create">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="200px">
        <el-form-item label="Data Set Name: " prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="Space Unit: " prop="unit">
          <el-input v-model="ruleForm.unit" placeholder="TRK"></el-input>
        </el-form-item>
        <el-form-item label="Primary quantity: " prop="primary">
          <el-input v-model.number="ruleForm.primary" placeholder="1"></el-input>
        </el-form-item>
        <el-form-item label="Secondary quantity: " prop="secondary">
          <el-input v-model.number="ruleForm.secondary" placeholder="1"></el-input>
        </el-form-item>
        <el-form-item label="Record Length: " prop="length">
          <el-input v-model.number="ruleForm.length" placeholder="80"></el-input>
        </el-form-item>
        <el-form-item label="Block Size: " prop="size">
          <el-input v-model.number="ruleForm.size" placeholder="800"></el-input>
        </el-form-item>
        <el-form-item label="Directory blocks: " prop="block">
          <el-col :span="23">
            <el-input v-model.number="ruleForm.block" placeholder="0"></el-input>
          </el-col>
          <el-col :span="1">
            <el-tooltip effect="dark" content="为0或为空表示顺序数据集" placement="top-start">
              <i class="el-icon-question"></i>
            </el-tooltip>
          </el-col>
        </el-form-item>
        <el-form-item label="Date Set Type: " prop="type">
          <el-col :span="23">
            <el-input v-model="ruleForm.type" placeholder="PS"></el-input>
          </el-col>
          <el-col :span="1">
            <el-tooltip effect="dark" content="PS为顺序数据集，PO为分区数据集" placement="top-start">
              <i class="el-icon-question"></i>
            </el-tooltip>
          </el-col>
        </el-form-item>
        <el-form-item label="Record Format: " prop="format">
          <el-input v-model="ruleForm.format" placeholder="FB"></el-input>
        </el-form-item>
        <el-form-item label="Volume Serial: " prop="volumn">
          <el-input v-model="ruleForm.volume" placeholder="BYWK00"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="submitForm('ruleForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import header_ from './header'
    export default {
        name: "create",
      components: {
          header_
      },
      data(){
          return {
            ruleForm: {
              name: '',
              unit: '',
              primary: '',
              block: '',
              secondary: '',
              length: '',
              type:'',
              size: '',
              format: '',
              volume: ''

            },
            rules:{
              unit:[
                { required: true, message: '请输入Space Unit', trigger: 'blur'},
              ],
              primary:[
                { required: true, message: '请输入Primary quantity', trigger: 'blur'},
                { type: 'number', message: '必须为数字'}
              ],
              secondary: [
                { required: true, message: '请输入Secondary quantity', trigger: 'blur'},
                { type: 'number', message: '必须为数字'}
              ],
              length:[
                { required: true, message: '请输入Record Length', trigger: 'blur'},
                { type: 'number', message: '必须为数字'}
              ],
              size: [
                { required: true, message: '请输入Block Size', trigger: 'blur'},
                { type: 'number', message: '必须为数字'}
              ],
              type: [
                { required: true, message: '请输入Data Set Type', trigger: 'blur'},
              ],
              format: [
                { required: true, message: '请输入Record Format', trigger: 'blur'},
              ]
            }
          }
      },
      methods:{
          submitForm(form){
            this.$refs[form].validate((valid) => {
              if(valid){
                this.$axios({
                  method: 'post',
                  url: '/dataset',
                  data: {
                    volser: this.ruleForm.volume,
                    dsname: this.ruleForm.name,
                    unit: "3390",
                    dsorg: this.ruleForm.type,
                    alcunit: this.ruleForm.unit,
                    primary: this.ruleForm.primary,
                    secondary: this.ruleForm.secondary,
                    dirblk: this.ruleForm.block,
                    avgblk: 500,
                    recfm: this.ruleForm.format,
                    blksize: this.ruleForm.size,
                    lrecl: this.ruleForm.length
                  }
                }).then((response) => {
                  if(response.status === 200 && response.data === 'successful'){
                    alert("创建数据集成功");
                  }
                }).catch(() => {
                  alert('接口异常！');
                })
              }else{
                return false;
              }
            });
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
    /*h1{*/
    /*  color: white;*/
    /*  width: 180px;*/
    /*  margin: 0 auto;*/
    /*  padding-left: 30px;*/
    /*}*/
  }
  .create{
    width: 500px;
    margin-left:400px;
    padding-top: 80px;
    .el-button{
      margin-left: 80px;
      margin-top: 30px;
      width: 100px;
      font-size: 22px;
      color: white;
      background-color: transparent;
      border-bottom: 1px solid #a8a8a8;
      border-top: 0;
      border-left: 0;
      border-right: 0;
    }
  }
  .create /deep/ .el-input__inner{
    background-color: transparent;
    border-bottom: 1px solid #a8a8a8;
    border-top: 0;
    border-left: 0;
    border-right: 0;
    -webkit-border-radius: 0;
    -moz-border-radius: 0;
    border-radius: 0;
    color: darkorange;
    text-align: start;
  }

</style>

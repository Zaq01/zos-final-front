<template>
  <div class="login_background">
    <div class="login_main">
      <LoginForm />
    </div>
  </div>

</template>

<script>
  import LoginForm from './loginForm'
    export default {
        name: "login",
      components: {
          LoginForm
      }
    }
</script>

<style lang="less" scoped>
  .login_background{
    height: 100%;
    background-image: url('../../assets/background.jpg');
    background-position: center;
    background-clip: padding-box;
    background-size: cover;
    background-attachment: fixed;
  }
  .login_main{
    width: 400px;
    padding-top: 200px;
    margin: 0 auto;
  }

</style>

<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created () {
    if (sessionStorage.getItem("store") ) {
      this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(sessionStorage.getItem("store"))))
    }
    window.addEventListener("beforeunload",()=>{
      sessionStorage.setItem("store",JSON.stringify(this.$store.state))
    })
  },
  data(){
    return{
      isRouterAlive: true
    }
  },
  provide(){
    return{
      reload: this.reload
    }
  },
  methods: {
    reload(){
      this.isRouterAlive = false;
      this.$nextTick( function () {
        this.isRouterAlive = true
      })
    }
  }
}
</script>

<style lang="less">
html, body, #app, .el-container {
padding: 0;
margin: 0;
height: 100%;
}
  body{
    background-color: #102e2e;
  }
</style>

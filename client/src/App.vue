<template>
  <div id="app">
    <app-stack></app-stack>
    <router-view></router-view>
  </div>
</template>

<script>
  import AppNav from './components/AppNav';
  export default {
    name: 'app',
    components: {
      "app-stack": AppNav
    }
  }
</script>

<style>
#app {
  font-family: 'Lato','Avenir', Helvetica, Arial, sans-serif;
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 60px;*/
}
</style>

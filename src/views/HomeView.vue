<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HomeComponent msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HomeComponent from '@/components/Home.vue'

export default {
  name: 'HomeView',
  components: {
    HomeComponent
  }
}
</script>


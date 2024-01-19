<template>
  <NavbarComponent />
  <router-view />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import NavbarComponent from '@/components/Navbar.vue';

@Options({ name: 'App', components: { NavbarComponent } })
export default class App extends Vue { }

</script>
<style>
html, body {
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}

router-view {
  flex: 1;
  width: 100%; 
}
</style>

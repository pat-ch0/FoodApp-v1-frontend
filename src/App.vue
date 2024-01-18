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
html,
body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0;
  display: flex;
  flex-flow: column nowrap;
}
</style>

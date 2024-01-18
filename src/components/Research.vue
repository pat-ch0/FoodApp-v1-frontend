<!-- Création de la class qui transféreras des informations sur la page View -->
<template>
    <div class="research-class">
      <h1>{{ title }}</h1>
    </div>
  </template>
  
  <script lang="ts">
  import { Options, Vue } from 'vue-class-component';
  
  @Options({
    props: {
      title: String
    }
  })
  
  export default class TitleResearch extends Vue {
    title!: string
  }
  
  </script>
  
  <style scoped> 

  </style>
  
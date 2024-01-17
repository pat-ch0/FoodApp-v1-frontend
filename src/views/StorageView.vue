<template>
    <div class="storage">
      <StorageComponent title="My inventory"/>
    </div>
  </template>
  
  <script>
  // @ is an alias to /src
  import StorageComponent from '@/components/Storage.vue'
  
  export default {
    name: 'StorageView',
    components: {
      StorageComponent
    }
  }
  </script>
  
  
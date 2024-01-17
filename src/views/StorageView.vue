<template>
  <StorageComponent title="My inventory"/>
  <StorageSpaceComponent storageName="Frigo" :storageProdNb="5"/>
</template>
  
  <script>
  // @ is an alias to /src
  import StorageComponent from '@/components/Storage.vue'
  import StorageSpaceComponent from '@/components/StorageSpace.vue'
  
  export default {
    name: 'StorageView',
    components: {
      StorageComponent, StorageSpaceComponent
    }
  }
  </script>

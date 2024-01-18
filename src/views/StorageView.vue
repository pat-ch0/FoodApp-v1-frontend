<template>
  <StorageComponent title="My inventory"/>
  <StorageSpaceComponent storageName="Fridge" :storageProdNb="32" storageImg="fridge.png"/>
  <StorageSpaceComponent storageName="Freezer" :storageProdNb="16" storageImg="freezer.png"/>
  <StorageSpaceComponent storageName="Cellar" :storageProdNb="24" storageImg="cellar.png"/>
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

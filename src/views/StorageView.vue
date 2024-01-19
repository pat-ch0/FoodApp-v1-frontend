<template>
  <StorageComponent title="My inventory" />
  <StorageSpaceComponent storageName="Fridge" :storageProdNb="32" storageImg="fridge.png" />
  <StorageSpaceComponent storageName="Freezer" :storageProdNb="16" storageImg="freezer.png" />
  <StorageSpaceComponent storageName="Cellar" :storageProdNb="24" storageImg="cellar.png" />
</template>
  
<script lang="ts">
// @ is an alias to /src
import StorageComponent from '@/components/Storage.vue'
import StorageSpaceComponent from '@/components/StorageSpace.vue'
import { Options, Vue } from 'vue-class-component'

@Options({
  components: {
    StorageComponent, StorageSpaceComponent
  }
})

export default class StorageView extends Vue {
}
</script>

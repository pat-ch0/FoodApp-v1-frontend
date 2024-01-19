<template>
  <div class="product-detail" v-if="!loading">
    <StorageComponent :title=currentStorage.label btnText="Add Product" />
    <SearchBar/>
    <StorageSpaceComponent storageName="Fridge" :storageProdNb="32" storageImg="fridge.png" />
    <StorageSpaceComponent storageName="Freezer" :storageProdNb="16" storageImg="freezer.png" />
    <StorageSpaceComponent storageName="Cellar" :storageProdNb="24" storageImg="cellar.png" />
  </div>
  <div v-else>
    <img src="../assets/images/loader/loader.webp" class="loader-spinner" alt="Loading...">
  </div>
</template>
    
<script lang="ts">
import StorageComponent from '@/components/Storage.vue'
import StorageSpaceComponent from '@/components/StorageSpace.vue'
import StorageService from '@/services/storage.service'
import Storage from '@/storage/storage';
import { Options, Vue } from 'vue-class-component'
import SearchBar from '@/components/SearchBar.vue';
import { useRoute } from 'vue-router';

@Options({
  components: {
    StorageComponent, 
    StorageSpaceComponent, 
    SearchBar
  }
})

export default class MyStorageView extends Vue {
  loading = true;
  storageService = StorageService.getInstance();
  currentStorage!: Storage;

  async mounted() {
    const route = useRoute();
    const idStorage = route.params.idStorage;
    if (typeof idStorage === 'string') {
      console.log(idStorage);
      this.currentStorage = await this.storageService.getStorageById(idStorage);
      console.log(this.currentStorage);
    } else {
      console.error("idStorage is not a string:", idStorage);
    }
    const storage = await this.storageService.getAllStorages();
    console.log(storage);
    this.loading = false;
  }
}
</script>
  
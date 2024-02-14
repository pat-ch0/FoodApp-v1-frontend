<template>
  <div class="product-detail" v-if="!loading">
    <button class="storage-button" type="button" @click="displayAddStorage">Add inventory space</button>
    <h2>{{ currentStorage.label }}</h2>
    <SearchBar />
    <p v-for="productsDetails in currentStorage.productsDetails" :key="productsDetails.barcode" :imagePath="productsDetails.imageSrc"
      :storage="productsDetails" @delete-storage="handleDeleteRequest">{{ productsDetails.name }} {{ productsDetails.stock }}</p>
  </div>
  <div v-else>
    <img src="../assets/images/loader/loader.webp" class="loader-spinner" alt="Loading...">
  </div>
</template>
    
<script lang="ts">
import StorageSpaceComponent from '@/components/StorageSpace.vue'
import StorageService from '@/services/storage.service'
import StorageType from '@/storage/storage-type';
import { Options, Vue } from 'vue-class-component'
import SearchBar from '@/components/SearchBar.vue';
import { useRoute } from 'vue-router';
import Storage from '@/components/Storage.vue';

@Options({
  components: {
    StorageSpaceComponent,
    SearchBar,
    Storage
  }
})

export default class MyStorageView extends Vue {
  loading = true;
  storageService = StorageService.getInstance();
  currentStorage!: StorageType;

  handleDeleteRequest(barcode: string) {
    console.log("Delete request for barcode:", barcode);
  }
  
  displayAddStorage() {
    // go to research
    this.$router.push({ name: 'research' });
  }

  async mounted() {
    const route = useRoute();
    const idStorage = route.params.idStorage;
    if (typeof idStorage === 'string') {
      this.currentStorage = await this.storageService.getStorageById(idStorage);
      await this.currentStorage.loadAllProductsDetail();
    } else {
      console.error("idStorage is not a string:", idStorage);
    }
    this.loading = false;
  }
}
</script>


<style scoped>
@import '../css/variables.css';


.storage-button {
  background-color: var(--color-primary);
  color: white;
  text-align: center;
  padding: 0.5em 1em;
  border: none;
  display: inline-block;
  font-size: var(--storage-button-font-size);
  border-radius: var(--storage-button-radius);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  margin-left: 3%;
  margin-bottom: 1em;
}

.storage-button:active {
  background-color: #038555;
  box-shadow: 0 5px #777;
  transform: translateY(4px);
}
.product-detail {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 1rem;
  height: 100%;
  padding-top: 4em;
}
</style>
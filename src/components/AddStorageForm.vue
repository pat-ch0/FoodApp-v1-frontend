<template>
  <!-- Form for adding storage with a carousel selector for storage type -->
  <div class="add-storage-form">
    <h2>Add storage</h2>
    <!-- Carousel for selecting storage type -->
    <div class="carousel-container" ref="carousel">
      <!-- Carousel items for each storage type option -->
      <div v-for="(option, index) in storageOptions" :key="option.type" class="carousel-item"
        :class="{ 'active': selectedIndex === index }" @click="selectStorageType(index)">
        <img :src="require(`@/assets/icons/${option.img}`)" :alt="option.type" class="carousel-image">
        <p>{{ option.type }}</p>
      </div>
    </div>
    <!-- Input for entering storage name -->
    <input class="storage-input" type="text" v-model="newStorageName" @keyup.enter="addStorage"
      placeholder="Storage name">
    <!-- Button to submit the form and add storage -->
    <div class="button-bottom">
      <button class="close-button" @click="closeStorage">Close</button>
      <button class="add-button" @click="addStorage">Add</button>
    </div>

  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import StorageService from '@/services/storage.service';

@Options({
  emits: ['storage-added', "close"]
})
export default class AddStorageForm extends Vue {
  newStorageName = '';
  storageService = StorageService.getInstance();
  storageOptions = [
    { type: 'Fridge', img: 'fridge.png' },
    { type: 'Freezer', img: 'freezer.png' },
    { type: 'Cellar', img: 'cellar.png' }
  ];
  selectedIndex = 0;

  selectStorageType(index: number) {
    this.selectedIndex = index;
  }

  // Handles adding of new storage
  async addStorage() {
    const button = document.querySelector('.add-button') as HTMLButtonElement;
    button.disabled = true;
    await this.storageService.createStorage(this.newStorageName, this.storageOptions[this.selectedIndex].type, this.storageOptions[this.selectedIndex].img);
    this.$emit('storage-added');
  }

  async closeStorage() {
    this.$emit('close');
  }
}
</script>
    
<style scoped>
@import '../css/variables.css';

.add-storage-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: var(--add-storage-form-padding);
  background: var(--add-storage-form-bg-color);
  border-radius: var(--add-storage-form-border-radius);
  box-shadow: var(--add-storage-form-box-shadow);
}

.storage-input {
  width: var(--storage-input-width);
  padding: 6px 10px;
  margin-bottom: var(--storage-input-margin-bottom);
  box-sizing: border-box;
  border-radius: var(--storage-input-border-radius);
  border: 2px solid var(--storage-input-border-color);
  transition: 0.5s;
}

.storage-input:focus {
  border: 2px solid var(--storage-input-focus-border-color);
}

.button-bottom {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: var(--button-bottom-margin-top);
}

.add-button, .close-button {
  width: var(--add-button-width);
  background-color: var(--color-primary);
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-left: 1em;
}

.close-button {
  background-color: rgb(235, 38, 38);
  margin-right: var(--close-button-margin-right);
}

.add-button:active {
  filter: var(--add-button-active-filter);
}

.carousel-container {
  display: flex;
  justify-content: center;
  overflow-x: var(--carousel-container-overflow);
  scroll-snap-type: var(--carousel-container-snap-type);
  -webkit-overflow-scrolling: touch;
}

.carousel-item {
  flex: 0 0 auto;
  margin: var(--carousel-container-margin);
  width: var(--carousel-item-width);
  scroll-snap-align: start;
  text-align: center;
  cursor: pointer;
  opacity: var(--carousel-item-opacity);
  transition: opacity 0.3s;
}

.carousel-item.active {
  opacity: var(--carousel-item-active-opacity);
}

.carousel-image {
  width: 100%;
  height: auto;
}
</style>
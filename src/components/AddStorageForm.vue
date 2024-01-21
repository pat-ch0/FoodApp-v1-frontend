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
    <button class="add-button" @click="addStorage">Add</button>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import StorageService from '@/services/storage.service';

@Options({
  emits: ['storage-added']
})
export default class AddStorageForm extends Vue {
  newStorageName = '';
  storageService = new StorageService();
  storageOptions = [
    { type: 'Fridge', img: 'fridge.png' },
    { type: 'Freezer', img: 'freezer.png' },
    { type: 'Cellar', img: 'cellar.png' }
  ];
  selectedIndex = 0;

  // Handles selection of storage type
  selectStorageType(index: number) {
    this.selectedIndex = index;
  }

  // Handles adding of new storage
  async addStorage() {
    if (!this.newStorageName) {
      console.error('Storage name is required');
      return;
    }

    // Prepares storage data for submission
    const selectedStorage = this.storageOptions[this.selectedIndex];
    const storageData = {
      label: this.newStorageName,
      type: selectedStorage.type,
      prodNb: 0,
      img: selectedStorage.img
    };

    try {
      // Calls service to create new storage and emits event
      const newStorage = await this.storageService.createStorage(storageData);
      this.$emit('storage-added', newStorage);
      // Resets the form after successful addition
      this.newStorageName = '';
      this.selectedIndex = 0;
    } catch (error) {
      console.error('Error adding new storage:', error);
    }
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

.add-button {
  width: var(--add-button-width);
  background-color: var(--color-primary);
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
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
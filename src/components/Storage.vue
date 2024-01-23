<template>
  <Swiper @swipe-left="handleSwipeLeft" @swipe-right="handleSwipeRight">
    <template v-slot:left>
      <!-- Left swipe content for "modify" action -->
      <i class="swipe-icon swipe-icon-left"><img src="../assets/icons/pencil.svg" alt="Edit Icon" class="icon" /></i>
    </template>
    <template v-slot:right>
      <!-- Right swipe content for "delete" action -->
      <i class="swipe-icon swipe-icon-right"><img @click="emitDeleteStorage" src="../assets/icons/trash.svg"
          alt="Delete Icon" class="icon" /></i>
    </template>
    <template v-slot:desktop-actions>
      <button @click="handleSwipeLeft" class="desktop-swipe-button left">
        <img src="../assets/icons/pencil.svg" alt="Modify" />
      </button>
      <button @click="emitDeleteStorage" class="desktop-swipe-button right">
        <img src="../assets/icons/trash.svg" alt="Delete" />
      </button>
    </template>
    <div class="storage-item" @click="goToThisStorage">
      <img 
      :src="imagePath"
      class="storage-image">
      <div class="storage-info">
        <h3>{{ storage.label }}</h3>
        <p>Referenced products: {{ storage.getNbProducts() }}</p>
      </div>
    </div>
  </Swiper>
</template>

<script lang="ts">
import StorageType from '@/storage/storage-type';
import { Options, Vue } from 'vue-class-component';
import Swiper from '@/components/Swiper.vue';

@Options({
  components: {
    Swiper
  },
  props: {
    storage: StorageType,
    imagePath: String
  },
  emits: ['delete-storage']
})
export default class Storage extends Vue {
  storage!: StorageType;
  imagePath!: string;


  goToThisStorage() {
    this.$router.push(`/storage/${this.storage.id}`);
  }

  handleSwipeLeft() {
    console.log('Swiped left on', this.storage.label);
  }

  handleSwipeRight() {
    console.log('Swiped right on', this.storage.id, ' ', this.storage.label);
  }

  emitDeleteStorage() {
    console.log(this.storage);
    this.$emit('delete-storage', this.storage.id);
  }
}
</script>

<style scoped>
@import '../css/variables.css';

.swiper {
  width: 100%;
}

.storage-item {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0 0.5em;
}

.storage-image {
  width: var(--storage-view-image-width);
  margin-right: 15px;
}

.storage-info {
  flex: 1;
}

.storage-info h3 {
  margin: 0;
  font-size: var(--storage-view-info-font-size);
}

.storage-info p {
  margin: 0;
}

.swipe-icon {
  color: #fff;
  width: var(--swiper-action-width);
  height: var(--swiper-action-height);
  display: flex;
  align-items: center;
  justify-content: center;
}

.swipe-icon-left {
  background-color: var(--color-background-left-swipe);
}

.swipe-icon-right {
  background-color: var(--color-background-right-swipe);
}

.storage-view .desktop-swipe-button {
  display: none;
  /* Hide by default */
}

@media (min-width: 600px) {
  .storage-view .desktop-swipe-button {
    display: flex;
    width: var(--storage-view-desktop-button-width);
    height: var(--storage-view-desktop-button-height);
    align-items: center;
    justify-content: center;
    margin: 5px;
    padding: 10px;
    background-color: var(--color-primary);
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  .storage-view .desktop-swipe-button.left {
    background-color: var(--color-background-left-swipe);
  }

  .storage-view .desktop-swipe-button.right {
    background-color: var(--color-background-right-swipe);
  }

  .storage-view .desktop-swipe-button img {
    width: var(--storage-view-desktop-button-icon-size);
    height: auto;
  }
}
</style>

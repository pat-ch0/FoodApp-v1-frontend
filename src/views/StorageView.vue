<!-- "My storage" page -->
<template>
  <div class="storage-view">
    <Swiper v-for="item in storageItems" :key="item.label" @swipe-left="handleSwipeLeft(item.label)"
      @swipe-right="handleSwipeRight(item.id, item.label)">
      <template v-slot:left>
        <!-- Left swipe content for "modify" action -->
        <i class="swipe-icon swipe-icon-left"><img src="../assets/icons/pencil.svg" alt="Edit Icon" class="icon" /></i>
      </template>
      <template v-slot:right>
        <!-- Right swipe content for "delete" action -->
        <i class="swipe-icon swipe-icon-right"  ><img @click="emitDeleteStorage(item.id)" src="../assets/icons/trash.svg" alt="Delete Icon" class="icon" /></i>
      </template>
      <template v-slot:desktop-actions>
        <button @click="handleSwipeLeft(item.label)" class="desktop-swipe-button left">
          <img src="../assets/icons/pencil.svg" alt="Modify" />
        </button>
        <button @click="emitDeleteStorage(item.id)" class="desktop-swipe-button right">
          <img src="../assets/icons/trash.svg" alt="Delete" />
        </button>
      </template>
      <div class="storage-item">
        <img :src="require(`@/assets/icons/${item.img}`)" :alt="item.label" class="storage-image">
        <div class="storage-info">
          <h3>{{ item.label }}</h3>
          <p>Referenced products: {{ item.prodNb }}</p>
        </div>
      </div>
    </Swiper>
  </div>
</template>

<script lang="ts">
import Swiper from '@/components/Swiper.vue';
import { Options, Vue } from 'vue-class-component';

@Options({
  components: {
    Swiper
  },
  props: {
    storageItems: Array
  }
})

export default class StorageView extends Vue {
  storageItems!: Array<{ id: string, label: string; prodNb: number; img: string }>;

  handleSwipeLeft(label: string) {
    console.log('Swiped left on', label);
    // Handle left swipe action
  }

  handleSwipeRight(id: string, label: string) {
    console.log('Swiped right on', id, ' ', label);
  }

  emitDeleteStorage(id: string) {
    console.log("emit delete storage");
    
    this.$emit('delete-storage', id);
  }
}
</script>

<style scoped>
@import "../css/variables.css";

.storage-view {
  display: flex;
  flex-direction: column;
  width: 100%;
}

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

<template>
  <!-- Top of the page: Title and "Add storage" button -->
  <div class="storage">
    <h1 class="storage-title">{{ title }}</h1>
    <button class="storage-button" type="button" @click="displayAddStorage">Add inventory space</button>
    <StorageView :storageItems="storageItems" @delete-storage="handleDeleteRequest" />

    <!-- Add storage form in a bottom sheet -->
    <BottomSheet :isOpen="displayAddSheet">
      <AddStorageForm @storage-added="onStorageAdded" />
    </BottomSheet>

    <!-- Delete storage confirmation modal -->
    <DeleteStorage :isOpen="storageDeletion">
      <p>Do you really want to delete this storage?</p>
      <button class="cancelButton" @click="cancelDeletion">Cancel</button>
      <button class="confirmButton" @click="confirmDeletion">Confirm</button>
    </DeleteStorage>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import StorageView from '@/views/StorageView.vue';
import BottomSheet from '@/components/BottomSheet.vue';
import DeleteStorage from '@/components/DeleteStorage.vue';
import AddStorageForm from '@/components/AddStorageForm.vue';
import StorageService from '@/services/storage.service';

@Options({
  components: {
    BottomSheet,
    DeleteStorage,
    StorageView,
    AddStorageForm
  },
  props: {
    title: String
  }
})
export default class Storage extends Vue {
  title!: string;
  displayAddSheet: boolean = false;
  storageService = new StorageService();
  storageToDeleteId = '';

  storageItems = [
    { id: 'defaultFridge', label: 'Fridge', type: 'Fridge', prodNb: 32, img: 'fridge.png' },
    { id: 'defaultFreezer', label: 'Freezer', type: 'Freezer', prodNb: 16, img: 'freezer.png' },
    { id: 'defaultCellar', label: 'Cellar', type: 'Cellar', prodNb: 24, img: 'cellar.png' }
    // More items can be added here
  ];

  handleDeleteRequest(id: string) {
    this.storageToDeleteId = id;
    this.storageDeletion = true;
  }

  onStorageAdded(newStorage:any) {
    this.storageItems.push({
      id: newStorage.id,
      prodNb: newStorage.products.length,
      label: newStorage.label,
      type: newStorage.type || 'Fridge',
      img: newStorage.img || 'fridge.png'
    });
    this.displayAddSheet = false;
  }

  async deleteStorage(id: string) {
    try {
      const success = await this.storageService.deleteStorageById(id);
      if (success) {
        this.storageItems = this.storageItems.filter(item => item.id !== id);
        console.log(`Storage with id ${id} deleted successfully`);
      }
    } catch (error) {
      console.error('Error deleting storage:', error);
    }
  }

  displayAddStorage() {
    this.displayAddSheet = true;
  }

  storageDeletion: boolean = false;

  cancelDeletion() {
    this.storageDeletion = false;
  }

  async confirmDeletion() {
    if (this.storageToDeleteId) {
      await this.deleteStorage(this.storageToDeleteId);
      this.storageToDeleteId = '';
    }
    this.storageDeletion = false;
  }
}
</script>

<style scoped>
@import '../css/variables.css';

.storage {
  display: flex;
  flex-direction: column;
  align-items: start;
}

.storage-title {
  color: var(--color-text-primary);
  float: left;
  font-size: 2em;
  margin-bottom: 15%;
}

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

.storage-input {
  width: var(--storage-input-width);
  padding: 6px 10px;
  margin: 12px 0;
  box-sizing: border-box;
  border-radius: var(--storage-input-border-radius);
  border: 2px solid var(--storage-input-border-color);
  transition: 0.5s;
}

.storage-input:focus {
  border: 2px solid var(--storage-input-focus-border-color);
}

.cancelButton,
.confirmButton {
  display: inline-block;
  font-size: 1em;
  border-radius: 6px;
  border: none;
  padding: 10px;
}

.confirmButton {
  font-weight: bold;
  margin-left: 15%;
  color: white;
  background-color: rgb(255, 0, 0);
}

.cancelButton {
  background-color: rgb(210, 210, 210);
}

.confirmButton:active {
  background-color: rgba(215, 10, 10, 0.7);
}

.cancelButton:active {
  background-color: rgba(26, 222, 12, 0.7);
}

.add-button {
  background-color: var(--color-primary);
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  margin-left: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
}
</style>

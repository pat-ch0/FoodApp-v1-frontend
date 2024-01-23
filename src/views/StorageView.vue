<!-- "My storage" page -->
<template>
  <div class="storage-view">
    <button class="storage-button" type="button" @click="displayAddStorage">Add inventory space</button>
    <div class="storage-list">
      <Storage v-for="storage in storageItems" :key="storage.id" :imagePath="require(`@/assets/icons/${storage.img}`)" :storage="storage"
        @delete-storage="handleDeleteRequest" />
    </div>
    <BottomSheet :isOpen="displayAddSheet">
      <AddStorageForm @close="closeDisplayAddSheet" @storage-added="onStorageAdded" />
    </BottomSheet>
    <DeleteStorage :isOpen="storageDeletion">
      <p>Do you really want to delete this storage?</p>
      <button class="cancelButton" @click="cancelDeletion">Cancel</button>
      <button class="confirmButton" @click="confirmDeletion">Confirm</button>
    </DeleteStorage>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import DeleteStorage from '@/components/DeleteStorage.vue';
import BottomSheet from '@/components/BottomSheet.vue';
import StorageService from '@/services/storage.service';
import StorageType from '@/storage/storage-type';
import Storage from '@/components/Storage.vue';
import AddStorageForm from '@/components/AddStorageForm.vue';

@Options({
  components: {
    Storage,
    DeleteStorage,
    BottomSheet,
    AddStorageForm
  },
  props: {
  }
})

export default class StorageView extends Vue {
  displayAddSheet: boolean = false;
  storageDeletion: boolean = false;
  storageService = StorageService.getInstance();
  storageItems: StorageType[] = [];
  storageToDeleteId: string = '';

  // on mount, fetch all storages
  async mounted() {
    this.storageItems = await this.storageService.getAllStorages();
  }

  async onStorageAdded() {
    this.storageItems = await this.storageService.getAllStorages();
    this.displayAddSheet = false;
  }

  closeDisplayAddSheet() {
    this.displayAddSheet = false;
  }

  displayAddStorage() {
    this.displayAddSheet = true;
  }

  handleDeleteRequest(id: string) {
    this.storageToDeleteId = id;
    this.storageDeletion = true;
  }


  cancelDeletion() {
    this.storageDeletion = false;
  }

  async confirmDeletion() {
    if (this.storageToDeleteId) {
      await this.deleteStorage(this.storageToDeleteId);
    }
    this.storageDeletion = false;
  }

  async deleteStorage(id: string) {
    try {
      const success = await this.storageService.deleteStorageById(id);
      if (success) {
        this.storageItems = this.storageItems.filter(item => item.id !== id);
      }
    } catch (error) {
      console.error('Error deleting storage:', error);
    }
  }

}
</script>

<style scoped>
@import "../css/variables.css";


.storage-view{
  padding-top: 6em;
  overflow: hidden;
}
.storage-list {
  overflow-y: scroll;
  max-height: 73vh;
  min-height: 73vh;
}

@media (min-width: 600px) {
  .storage-list {
    max-height: 100vh;
    min-height: 100vh;
  }
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
</style>

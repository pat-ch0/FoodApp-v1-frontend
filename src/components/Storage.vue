<template>
    <!-- Top of the page : Title and "Add storage" button -->
    <div class="storage">
        <h1>{{ title }}</h1>
        <button type="button" class="button-addStorage" v-on:click="displayAddStorage">Add inventory space</button>
        <button type="button" v-on:click="displayDeleteStorage">Test deletion</button>
    </div>

    <!-- Add a storage sheet -->
    <BottomSheet :isOpen="displayAddSheet">
        <div class="add-bottom-sheet">
            <h2>Add storage</h2>
            <input type="text" id="storageName" name="storageName" placeholder="Storage name">
        </div>
    </BottomSheet>

    <!-- Delete storage notification -->
    <DeleteStorage class="deleteWindow" :isOpen="storageDeletion">
        <p>Do you really want to delete this storage ?</p>
        <button type="button" class="cancelButton" v-on:click="cancelDeletion">Cancel</button>
        <button type="button" class="confirmButton" v-on:click="confirmDeletion">Confirm</button>
    </DeleteStorage>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import BottomSheet from '@/components/BottomSheet.vue';
import DeleteStorage from '@/components/DeleteStorage.vue';

@Options({
    props: {
        title: String
    },
    components: {
        BottomSheet, DeleteStorage
    },
})

export default class HelloWorld extends Vue {
    title!: string

    displayAddSheet: boolean = false
    displayAddStorage() {
        this.displayAddSheet = true
    }

    storageDeletion: boolean = false
    displayDeleteStorage() {
        this.storageDeletion = true
    }

    cancelDeletion() {
        this.storageDeletion = false
        return false
    }

    confirmDeletion() {
        this.storageDeletion = false
        return true
    }
}
</script>
  
<style scoped>
@import '../css/variables.css';

.storage {
    display: flex;
    flex-direction: column;
    align-items: start;
    margin-left: 3%;
}

h1 {
    color: #33065f;
    float: left;
    font-size: 2em;
    margin-bottom: 15%;
}

.button-addStorage {
    background-color: var(--main-click-color);
    color: white;
    text-align: center;
    padding: 0.5em 1em;
    border: none;
    display: inline-block;
    border-radius: 8px;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    font-size: 1.25em;
}
.button-addStorage:active {
  background-color: #038555;
  box-shadow: 0 5px #777;
  transform: translateY(4px);
}

input {
    width: 65%;
    padding: 6px 10px;
    margin: 12px 0;
    box-sizing: border-box;
    border-radius: 14px;
    border: 2px solid #a4a4a4;
    -webkit-transition: 0.5s;
    transition: 0.5s;
}
input:focus {
    border: 2px solid #646464;
}

.cancelButton, .confirmButton {
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
</style>

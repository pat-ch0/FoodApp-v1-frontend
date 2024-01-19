<template>
    <div class="storage">
        <h1>{{ title }}</h1>
        <button type="button" v-on:click="displayAddStorage">Add inventory space</button>
    </div>

    <BottomSheet :isOpen="displayAddSheet">
        <div class="add-bottom-sheet">
            <h2>Add storage</h2>
            <input type="text" id="storageName" name="storageName" placeholder="Storage name">
        </div>
    </BottomSheet>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import BottomSheet from '@/components/BottomSheet.vue';

@Options({
    props: {
        title: String
    },
    components: {
        BottomSheet,
    },
})

export default class HelloWorld extends Vue {
    title!: string

    displayAddSheet: boolean = false
    displayAddStorage() {
        this.displayAddSheet = true
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

button {
    background-color: var(--main-click-color);
    color: white;
    text-align: center;
    padding: 0.5em 1em;
    border: none;
    display: inline-block;
    font-size: 0.5em;
    border-radius: 8px;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    font-size: 1.25em;
}

button:active {
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
</style>

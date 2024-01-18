<template>
    <div class="searchfield">
        <img src="../assets/icons/search.svg" alt="search" class="search-icon">
        <input class="text-search" placeholder="looking for..." v-model="inputText" @input="event => enterText(inputText)">
    </div>
</template>


<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
    props: {
        enterText: {
            type: Function,
            default: (text: string) => {
                console.log("barre recherche" + text)
            }
        }
    },
})

export default class SearchBar extends Vue {
    enterText!: Function
    inputText: string = ''
}
</script>

<style>
@import "../css/variable.css";

.searchfield {
    width: 80%;
    height: 45px;
    margin-left: 10%;
    margin-right: 10%;
    border-radius: 27px;
    border: 1px solid var(--Border, #D9D0E3);
    background: #FFF;
    display: flex;
}

.search-icon { 
    padding: 16px;
}

.text-search {
    color: var(--Text-Secondary, #9586A8);
    border: none;
    padding-top: 12px;
    padding-bottom: 12px;
    margin-right: 22px;
    width: 70%;
}
</style>
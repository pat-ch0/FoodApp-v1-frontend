<template>
    <div class="searchfield">
        <img src="../assets/icons/search.svg" alt="search" class="search-icon" @click="search">
        <input class="input-search" placeholder="looking for..." v-model="inputText" @keyup.enter="search">
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { useRouter } from 'vue-router';

@Options({})
export default class SearchBar extends Vue {
    inputText: string = ''
    router = useRouter();

    search() {
        this.router.push(`/products/${this.inputText}`);
    }
}
</script>

    <style>
    @import "../css/variables.css";

    .searchfield {
        width: 80%;
        height: 45px;
        margin-left: 10%;
        margin-right: 10%;
        padding: 0 1.2em;
        border-radius: 27px;
        border: 1px solid var(--Border, #D9D0E3);
        background: #FFF;
        display: flex;
    }

    .search-icon {
        margin-right: .75em;
        cursor: pointer;
    }

    .input-search {
        font-size: 16px;
        color: var(--Text-Secondary, #9586A8);
        border: none;
        width: 100%;
    }

    .input-search:focus {
        outline: none;
    }
    </style>
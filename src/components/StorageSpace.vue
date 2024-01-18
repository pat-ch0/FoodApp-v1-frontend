<template>
    <div class="storageSpaces-set">
        <!-- :src=require allows to specify the desired image in StorageView.vue -->
        <img alt="Storage logo" :src="require('@/assets/icons/' + storageImg + '')">
        <div class="storagePanel">
            <p>{{ storageName }}</p>
            <p>Referenced products : {{ storageProdNb }}</p>
        </div>
    </div>
</template>


<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
    props: {
        storageName: String,
        storageProdNb: Number,
        storageImg: String
    },
})

export default class Button extends Vue {
    storageName!: string
    storageProdNb!: number
    storageImg!: string
}
</script>

<style>
.storagePanel {
    display: flex;
    flex-direction: column;
    padding-left: 2em;
    font-size: 100%;
}

img {
    height: auto;
    width: 5em;
    float: left;
}

p {
    margin: 0.5em;
    text-align: left;
}

.storageSpaces-set {
    padding: 0.75em 2em;
    display: flex;
}
</style>
<template>
    <div class="storageSpaces-set">
        <img alt="Storage logo" src="@/assets/icons/fridge.png">
        <div class="storagePanel">
            <div class="storagePanel">
                <p>{{ storageName }}</p>
                <p>Produits référencés : {{ storageProdNb }}</p>
            </div>
        </div>
    </div>
</template>


<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
    props: {
        storageName: String,
        storageProdNb: Number,
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
    padding-left: 1em;
}

img {
    height: auto;
    width: 4em;
    float: left;
}

p {
    margin: 0.5em;
    text-align: left;
}

.storageSpaces-set {
    padding: 1em 2em;
    display: flex;
}
</style>
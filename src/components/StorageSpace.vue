<template>
    <div class="storageSpace" :on-touchend="handleSwipe">
        <!-- left swipe -->
        <div class="swipe left">
            <i class="swipeIcons">modify</i>
        </div>

        <!-- swipeable storage -->
        <div class="swipeStorage">
            <!-- :src=require allows to specify the desired image in StorageView.vue -->
            <img alt="Storage logo" class="storageLogo" :src="require('@/assets/icons/' + storageImg + '')">
            <div class="storageInfos">
                <p>{{ storageName }}<br>
                Referenced products : {{ storageProdNb }}</p>
            </div>
        </div>

        <!-- right swipe -->
        <div class="swipe right">
            <i class="swipeIcons">delete</i>
        </div>
    </div>

    <!-- debug output -->
    <p class="output"></p>
</template>


<script lang="ts">
import { Options, Vue } from 'vue-class-component'

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

    // Define actions when a storage is swiped
    // FONCTION A COMPLETER/CORRIGER
    handleSwipe(): unknown {
        // define the minimum distance to trigger the action
        const minDistance = 60
        const container = document.querySelector('.storageSpace')
        const output = document.querySelector('.output')
        // get the distance the user swiped
        if (container != null && output != null) {
            const swipeDistance = container.scrollLeft - container.clientWidth
            // Left swipe : delete
            if (swipeDistance < minDistance * -1) {
                output.innerHTML = 'swiped left'
                // document.querySelector('storageSpace')?.remove()
            }
            // Right swipe : modify
            else if (swipeDistance > minDistance) {
                output.innerHTML = 'swiped right'
            }
            else {
                output.innerHTML = `did not swipe ${minDistance}px`
            }
        }

        return "Swipe couldn't be handled"
    }
}
</script>

<style>
/* scroll snap takes care of restoring scroll position */
.storageSpace {
    margin-top: 4%;
    display: flex;
    overflow: auto;
    overflow-x: scroll;
    scroll-snap-type: x mandatory;
}

/* scrollbar should be hidden */
.storageSpace::-webkit-scrollbar {
    display: none;
}

.swipeStorage {
    scroll-snap-align: start; /* main element should always snap into view */
}

.storageInfos {
    display: flex;
    flex-direction: column;
    text-align: left;
}

/* actions and element should be 100% wide */
.swipe, .swipeStorage {
    min-width: 100%;
}
.swipe {
    display: flex;
    align-items: center;
}

i {
    color: white;
    position: sticky; /* icon should remain sticky */
    left: 16px;
    right: 16px;
}

/* action background colors */
.left {
    background-color: rgb(255, 165, 0);
}
.right {
    justify-content: flex-end;
    background-color: rgb(255, 0, 0);
}

.storageLogo {
    height: auto;
    width: 5em;
    float: left;
    margin-left: 3%;
    margin-right: 15%;
}

.output {
    text-align: left;
}
</style>
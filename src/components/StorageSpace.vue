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
            <div class="storagePanel">
                <p>{{ storageName }}</p>
                <p>Referenced products : {{ storageProdNb }}</p>
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
        const minDistance = 50
        const container = document.querySelector('.storageSpace')
        const output = document.querySelector('.output')
        // get the distance the user swiped
        if (container != null && output != null) {
            const swipeDistance = container.scrollLeft - container.clientWidth
            // Left swipe : modify
            if (swipeDistance < minDistance * -1) {
                output.innerHTML = 'swiped left'
            }
            // Right swipe : delete
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
/* Swipe container */
.storageSpace {
    padding: 0.75em 2em;
    display: flex;
    overflow: auto;
    overflow-x: scroll;
    scroll-snap-type: x mandatory;
}

/* scrollbar should be hidden */
.storageSpace::-webkit-scrollbar {
  display: none;
}

.storagePanel {
    display: flex;
    flex-direction: column;
    padding-left: 2em;
    scroll-snap-align: start; /* main element should always snap into view */
}

/* actions and element should be 100% wide */
.swipe, .storagePanel {
    min-width: 100%;
}
.swipe {
  display: flex;
  align-items: center;
}

/* icon should remain sticky */
i {
  color: white;
  position: sticky;
  left: 16px;
  right: 16px;
}

/* action background colors */
.left {
  background-color: #FC6A03;
}
.right {
  justify-content: flex-end;
  background-color: #FF0000;
}

.storageLogo {
    height: auto;
    width: 5em;
    float: left;
}

.output {
    margin: 0.5em;
    text-align: left;
}
</style>
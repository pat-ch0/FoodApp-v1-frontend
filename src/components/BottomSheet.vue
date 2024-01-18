<template>
    <transition name="bottom-sheet">
        <div v-if="isOpen" class="bottom-sheet">
            <slot></slot>
        </div>
    </transition>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';


@Options({
    props: {
        isOpen: Boolean,
        maxHeight: {
            type: String,
            default: '50vh',
        },
    },
})
export default class BottomSheet extends Vue {
    isOpen!: boolean;
}
</script>


<style scoped>
    .bottom-sheet{
        background-color: white;
        z-index: 1000;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        border-top-left-radius: 30px;
        border-top-right-radius: 30px;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.384);
    }

</style>

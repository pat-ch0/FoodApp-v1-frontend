<!-- Delete storage confirmation notification -->
<template>
    <transition name="delete-storage">
        <div v-if="isOpen" class="delete-storage">
            <slot></slot>
        </div>
    </transition>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
    props: {
        isOpen: Boolean
    },
})

export default class DeleteStorage extends Vue {
    isOpen!: boolean;
}
</script>

<style scoped>
.delete-storage {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(255, 255, 255);
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
    width: 60%;
    padding: 10px;
    border-radius: 12px;
    border: none;
    z-index: 10;
}
</style>
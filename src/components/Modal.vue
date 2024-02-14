<template>
    <div v-if="isOpen" class="modal">
        <div @click="onclickModalBackground" class="modal-background">
        </div>
        <div class="modal-container">
            <slot></slot>
        </div>
    </div>
</template>


<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
    props: {
        isOpen: Boolean,
        onclickModalBackground: {
            type: Function,
            default: () => {

            }
        }
    },
})

export default class Modal extends Vue {
    isOpen!: boolean
    onclickModalBackground!: () => void
}
</script>

<style>
@import "../css/variables.css";


.modal-add-product {
    position: fixed;
}

.modal-background {
    z-index: 1000000;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.185);
}
.modal-container{
    z-index: 1000001;
    position: fixed;
}

</style>
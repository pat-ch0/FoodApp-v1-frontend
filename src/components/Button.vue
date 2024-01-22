<template>
    <button class="button-class" v-on:click="callback"> {{ buttonText }} </button>
</template>


<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
    props: {
        buttonText: String,
        callback: {
            type: Function,
            default: () => {

            }
        }
    },
})

export default class Button extends Vue {
    buttonText!: string
    callback!: () => void
}
</script>

<style>
@import "../css/variables.css";


.button-class {
    color: white;
    text-transform: uppercase;
    border-radius: 8px;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    border: 0;
    line-height: 18px;
    letter-spacing: 3px;
    word-wrap: break-word;
    background-color: var(--color-secondary);
    cursor: pointer;
    padding: 0 2em;
    position: relative;
}

.button-class:hover {
    scale: 1.1;
}
</style>
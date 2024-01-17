<template>
    <div class="storage">
        <h1>{{ title }}</h1>
        <button type="button">Add inventory space</button>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
    props: {
        title: String
    }
})

export default class HelloWorld extends Vue {
    title!: string
}

</script>
  
<style scoped>
@import '../css/variables.css';

.storage {
    display: flex;
    flex-direction: column;
    align-items: start;
}

h1 {
    color: #2107b5;
    float: left;
    font-size: 2em;
}

button {
    background-color: var(--main-click-color);
    color: white;
    text-align: center;
    padding: 0.5em 1em;
    border: none;
    display: inline-block;
    font-size: 0.5em;
    border-radius: 8px;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    font-size: 1.25em;
}

button:active {
  background-color: #038555;
  box-shadow: 0 5px #777;
  transform: translateY(4px);
}
</style>

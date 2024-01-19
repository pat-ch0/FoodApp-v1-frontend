<!-- Création du bouttons retour en arrière -->
<template>
    <!-- v-on:click => lors du click écouter, activé fonction "buttonBack" -->
    <img src="../assets/icons/backbutton.svg" alt="bouton retour" class="back-button" v-on:click="buttonBack">
</template>


<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
    props: {
        // Initialisation d'un objet, de type fonction, par défaut renvoi une page en arrière dans l'historique
        buttonBack: {
            type: Function,
            default: () =>
            {
                history.back()
            }
        }
    },
})

export default class BackButton extends Vue {
    // On retourne buttonBack sans attentes de valeur.
    buttonBack!: () => void
 }
</script>

<style>
@import "../css/variables.css";


.back-button {
    width: 10px;
    cursor: pointer;
    scale: 1.3;
}
</style>
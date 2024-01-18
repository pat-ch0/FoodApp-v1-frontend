
<!-- 
    Templates regroupe l'ensemble HTML qui sera affiché (View) sur la page lors de l'accès rooter ../router/(index.ts)
 -->
<template>
    <div class="research-div-class">
        <BackButton></BackButton>
        <h1 class="title-research">Research</h1>
        <p class="text-info-search">If you want to looking for something on our database, use the research bar.</p>
        <SearchBar></SearchBar>
        <div class="separateur"> separateur </div>
        <p class="text-info-scan">You can use mobile to search your product, take a picture of barcode and u will get your product details. </p>
        <Button buttonText="SCAN" :callback="test"></Button>
    </div>
</template>
  

<!-- On a importé le framework typescript -->
<script lang="ts">
// On importe les modules nécessaire pour la page
import { Options, Vue } from 'vue-class-component';
import Button from '@/components/Button.vue';
import BackButton from '@/components/BackButton.vue';
import SearchBar from '@/components/SearchBar.vue';

// On reçois des composants, @Options traduira les class créer.
@Options({
    props: {

    },
    components:
    {
        Button,
        BackButton,
        SearchBar
    },
})
// On exporte une class avec des informations potentiel.
export default class ResearchView extends Vue {

    // Ici la fonction test qui appelera un console.log pour savoir si le boutons passe dans la fonction. Qui permettra un usage générique.
    test() {
        console.log("Wlh")
    }

}

</script>

<!-- Le CSS est introduit ici, certaines couleurs sont génériques et on été implanté dans un fichier variable.css (../css/variables.css) -->
<style>
/* 
* Positionnement brut 
*/

/* la div regroupant tout (sauf nav) */
.research-div-class {
    position: absolute;
    top: 30%;
    font-size: 14px;
}

/* Titre de la page */
.title-research {
    position: fixed;
    top: 10%;
    left: 10%;
}

/* Text au-dessus de la barre de recherche */
.text-info-search {
    position: fixed;
    top: 30%;
    color: var(--Text-Secondary, #9586A8);
    margin-left: 20%;
    margin-right: 20%;

}
.text-info-search:hover {
    color: black;
    scale: 1.1;
    transition-delay: 170ms;
    transition-property: all;
}

/* div engloblant la barre de recherche */
.searchfield {
    position: fixed;
    top: 42%;
}
.searchfield:hover {
    scale: 1.1;
}

/* Séparateur entre recherche et scan */
.separateur {
    position: fixed;
    bottom: 45%;
    width: 80%;
    left: 10%;
    background-color: black;
    font-size: 0;
    height: 1px;
}

/* Text en-dessous de la barre de recherche */
.text-info-scan {
    position: fixed;
    top: 65%;
    color: var(--Text-Secondary, #9586A8);
    margin-left: 20%;
    margin-right: 20%;

}
.text-info-scan:hover {
    color: black;
    scale: 1.1;
    transition-delay: 170ms;
    transition-property: all;
}

/* Boutton SCAN */
.button-class {
    position: fixed;
    bottom: 15%;
    left: 10%;
    width: 80%;
    height: 56px;
}
.button-class:hover {
    scale: 0.8;

}
</style>
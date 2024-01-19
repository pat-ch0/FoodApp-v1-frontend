
<!-- 
    Templates regroupe l'ensemble HTML qui sera affiché (View) sur la page lors de l'accès rooter ../router/(index.ts)
 -->
<template>
    <div class="research-div-container">
        <BackButton class="fixed-top-left"></BackButton>
        <h1 class="fixed-top-left research-view-title">Research</h1>
        <div class="research-view-content">
            <p class="research-view-paragraph">If you want to looking for something on our database, use the research bar.
            </p>
            <SearchBar></SearchBar>
            <div class="separator"></div>
            <p class="research-view-paragraph">You can use mobile to search your product, take a picture of barcode and u
                will get
                your product details. </p>
            <Button buttonText="SCAN" :callback="test"></Button>
        </div>
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
    props: {},
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

<!-- Le CSS est introduit ici, certaines couleurs sont génériques et on été implanté dans un fichier variables.css (../css/variables.css) -->
<style>
/* 
* Positionnement brut 
*/

/* la div regroupant tout (sauf nav) */
.research-div-container {
    height: calc(100% - 70px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 14px;
}

/* Titre de la page */
.research-view-title {
    margin-top: .75em;
}

.fixed-top-left {
    position: fixed;
    top: calc(5% + 1.5em);
    left: 10%;
}


.research-view-paragraph {
    margin: 2em .5em 0 .5em;
    color: var(--Text-Secondary, #9586A8);
    text-align: center;
    width: 80%;
}

.research-view-content {
    flex-grow: 1;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    gap: 4.2em;
    padding: 0 2em;
}

/* div engloblant la barre de recherche */


/* Séparateur entre recherche et scan */
.separator {
    width: 80%;
    background-color: black;
    font-size: 0;
    height: 1px;
}

/* Boutton SCAN */
.button-class {
    width: 80%;
    height: 56px;
}

.button-class:hover {
    scale: 1.05;
}

.button-class:active {
    scale: 1.02;
}
</style>
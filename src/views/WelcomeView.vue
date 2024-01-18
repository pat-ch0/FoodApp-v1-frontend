<template>
    <div class="welcome-view">
        <img class="welcome-view-image" src="../assets/images/welcomeImage.png" alt="Welcome page" srcset="">
        <BottomSheet :isOpen="true">
            <div class="welcome-view-bottom-sheet">
                <img src="../assets/logo.png" alt="logo of app">
                <h2>Food App</h2>
                <p>Welcome to Food App, the application will make u some profits. This application notificate when need some products, or promotion coming's u..</p>
                <Button class="welcome-view-btn" buttonText="Look for a product"></Button>
                <span>You will use your device, please allowed all need to all working good..</span>
            </div>
        </BottomSheet>
    </div>
</template>
  
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import BottomSheet from '@/components/BottomSheet.vue';
import Button from '@/components/Button.vue';
@Options({
    props: {
    },
    components: {
        BottomSheet,
        Button
    },
})
export default class ProductDetail extends Vue {
    mounted() {
        document.querySelector('nav')?.remove();
    }

    formatData() {
    }
}
</script>

<style scoped>
@media screen and (max-height: 840px) {
    .welcome-view-bottom-sheet * {
        font-size: calc(2vh);
        font-size: clamp(0.5em, calc(2vh), 0.8em);
    }

    .welcome-view-bottom-sheet h2 {
        font-size: calc(3vh);
    }
}

.welcome-view{
    position: relative;
    height: 100vh;
    width: 100vw;
    background-color: #C70039;
    overflow: hidden;
}

.welcome-view-btn{
    margin-top: 2em;
    height: 3.5em;
}

.welcome-view-bottom-sheet{
    text-align: center;
    padding: 0 2em 2em 1em;
}

.welcome-view-bottom-sheet span{
    color: #9586A8;
    font-size: 10px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%;
    letter-spacing: -0.41px;
    display: block;
    margin-top: 1em;
}

.welcome-view-bottom-sheet img{
    width: 12em;
    height: 12em;
    margin: 0 auto;
    display: block;
}

.welcome-view-bottom-sheet h2{
    font-size: 2em;
    font-weight: 400;
    margin-top: 0;
}

.welcome-view-bottom-sheet p{
    color: #9586A8;
    font-size: 17px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%;
    letter-spacing: -0.41px;
}

.welcome-view-image{
    position: absolute;
    top: -171px;
    right: -344px;
    height: 100%;
}

.welcome-view {
    height: 100vh;
    width: 100vw;
    background-color: #C70039;
}
</style>
  
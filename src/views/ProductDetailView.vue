<template>
    <div class="product-detail">
        <img :src="product.imageSrc" alt="Product image">
        <BottomSheet :isOpen="true">
            <div class="product-detail-bottom-sheet">
                <h2 class="product-detail-name">{{ product.name }}</h2>
                <p>{{ formattedPrice }} / Each</p>
                <p><span class="bold">Composition :</span> {{ formattedComposition }}</p>
                <p><span class="bold">Allergens:</span> {{ formattedAllergens }}</p>
                <div class="product-detail-nutriscore-container">
                    <p><span class="bold">Nutrition Score:</span></p>
                    <div class="nutri-scrore" :style="{ backgroundColor: nutriScoreColor }">
                        {{ product.nutriScore.toLocaleUpperCase() }}
                    </div>
                </div>
                <p><span class="bold">Dietary Restrictions:</span></p>
                <p><span class="bold">Carbon Footprint:</span> {{ formattedCarbonFootprint }}</p>
                <div class="product-detail-btn-container">
                    <Button class="product-detail-btn" buttonText="Add to stock"></Button>
                </div>
            </div>
        </BottomSheet>
    </div>
</template>
  
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import BottomSheet from '@/components/BottomSheet.vue';
import Product from '@/product/product';
import Button from '@/components/Button.vue';
@Options({
    props: {
        product: Product,
    },
    components: {
        BottomSheet,
        Button,
    },
})
export default class ProductDetail extends Vue {
    product!: Product
    formattedAllergens: string = '';
    formattedDietaryRestrictions: string = '';
    formattedComposition: string = '';
    formattedPrice: string = '';
    formattedCarbonFootprint: string = '';
    nutriScoreColor: string = 'red';

    private colors: Map<string,string>= new Map([
        ['A', '#038141'],
        ['B', '#85bb2f'],
        ['C', '#fecb02'],
        ['D', '#ee8100'],
        ['E', '#e63e11'],
    ]);

    mounted() {
        // remove the nav bar
        document.querySelector('nav')?.remove();

        this.formatData();
        console.log(this.product.nutriScore);
        console.log(this.colors)
        this.nutriScoreColor = this.colors.get(this.product.nutriScore.toLocaleUpperCase()) || '';
    }

    formatData() {
        this.formattedAllergens = this.product.allergens.join(', ').replace(/en:/g, '');
        this.formattedDietaryRestrictions = this.product.dietaryRestrictions.join(', ').replace(/en:/g, '');
        this.formattedComposition = this.product.composition.join(', ').replace(/en:/g, '');
        this.formattedPrice = `${this.product.price.toFixed(2)}$`;
        this.formattedCarbonFootprint = `${this.product.carbonFootprint} kg CO2e`;
    }
}
</script>

<style scoped>

@media screen and (max-height: 840px) {
    .product-detail-bottom-sheet * {
        font-size: calc(2vh);
        font-size: clamp(0.5em, calc(2vh), 0.8em);
    }

    .product-detail-name {
        font-size: calc(3vh);
    }
}

.product-detail-bottom-sheet {
    padding: 1em 2em 2em 2em;
    text-align: left;
}

.nutri-scrore{
    margin-left: 5px;
    height: 25px;
    width: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    border-radius: 5px;
    font-size:large;
}

.product-detail-nutriscore-container {
    display: flex;
    align-items: center;
}

.bold {
    font-weight: 600;
}

.product-detail-name {
    font-weight: 500;
}
.product-detail-btn-container {
    display: flex;
    justify-content: center;
    margin-top: 2em;
}

.product-detail-btn {
    height: 4em;
}
</style>
  
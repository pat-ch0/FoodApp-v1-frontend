<template>
    <div class="product-detail" v-if="!loading">
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

    <!-- TODO: Make a component of this loader | CSS at bottom -->
    <div v-else>
        <!-- Loading spinner -->
        <img src="../assets/images/loader/loader.webp" class="loader-spinner" alt="Loading...">
    </div>
</template>
  
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { useRoute } from 'vue-router';
import { ProductService } from '@/services/product.service';
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
    product2!: Product
    formattedAllergens: string = '';
    formattedDietaryRestrictions: string = '';
    formattedComposition: string = '';
    formattedPrice: string = '';
    formattedCarbonFootprint: string = '';
    nutriScoreColor: string = 'red';
    loading: boolean = true;
    error:any;

    private colors: Map<string, string> = new Map([
        ['A', '#038141'],
        ['B', '#85bb2f'],
        ['C', '#fecb02'],
        ['D', '#ee8100'],
        ['E', '#e63e11'],
    ]);

    async mounted() {
        const route = useRoute();
        const barcode = route.params.barcode;

        if (typeof barcode === 'string') {
            await this.getProduct(barcode);
        } else {
            console.error("Barcode is not a string:", barcode);
        }

        this.formatData();
        this.nutriScoreColor = this.colors.get(this.product.nutriScore.toLocaleUpperCase()) || '';
    }

    async getProduct(barcode: string) {
        this.loading = true;
        try {
            const productService = ProductService.getInstance();
            const response = await productService.getProductById(barcode);
            console.log(response.data);
            this.product2 = response.data;
        } catch (e) {
            this.error = e;
        } finally {
            this.loading = false;
        }
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
.loader-spinner {
    position: absolute;
    top: 45%;
    left: 50%;
    height: 8em;
    width: 8em;
    margin: 0 auto;
    transform: translate(-50%, -50%);
}

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

.nutri-scrore {
    margin-left: 5px;
    height: 25px;
    width: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    border-radius: 5px;
    font-size: large;
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
  
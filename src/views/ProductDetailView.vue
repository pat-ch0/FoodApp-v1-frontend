<template>
    <div class="product-detail" v-if="!loading">
        <BackButton></BackButton>
        <BottomSheet v-if="showErrorMessage" :isOpen="showErrorMessage">
            <div class="product-detail-bottom-sheet">
                <h2 class="product-detail-name">Error</h2>
                <p>Product not found</p>
            </div>
        </BottomSheet>
        <img class="product-detail-img" v-else :src="product.imageSrc" alt="Product image">
        <BottomSheet :isOpen="!showErrorMessage">
            <div v-if="productDetail" class="product-detail-bottom-sheet">
                <h2 class="product-detail-name">{{ product.name }}</h2>
                <!-- <p>{{ formattedPrice }} / Each</p> -->
                <p><span class="bold">Composition :</span> {{ formattedComposition }}</p>
                <p><span class="bold">Allergens:</span> {{ formattedAllergens }}</p>
                <div v-if="product.nutriScore.toLocaleUpperCase().length == 1" class="product-detail-nutriscore-container">
                    <p><span class="bold">Nutrition Score:</span></p>
                    <div class="nutri-scrore" :style="{ backgroundColor: nutriScoreColor }">
                        {{ product.nutriScore.toLocaleUpperCase() }}
                    </div>
                </div>
                <p><span class="bold">Dietary Restrictions: {{ formattedDietaryRestrictions }}</span></p>
                <!-- <p><span class="bold">Carbon Footprint:</span> {{ formattedCarbonFootprint }}</p> -->
                <div class="product-detail-btn-container">
                    <Button :callback="AddToStock" class="product-detail-btn" buttonText="Add to stock"></Button>
                </div>
                <AddProduct :close="closeModalAddProduct" :isOpen="addProductModal" :storages="storages" :product="product"></AddProduct>
            </div>
        </BottomSheet>
    </div>
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
import ProductDetail from '@/product/product-detail';
import Button from '@/components/Button.vue';
import BackButton from '@/components/BackButton.vue';
import StorageService from '@/services/storage.service';
import Storage from '@/storage/storage-type';
import AddProduct from '@/components/AddProduct.vue';

@Options({
    components: {
        BottomSheet,
        BackButton,
        Button,
        AddProduct
    },
})

export default class ProductDetailView extends Vue {
    product!: ProductDetail;
    showErrorMessage: boolean = false;
    addProductModal: boolean = false;
    formattedAllergens: string = '';
    formattedDietaryRestrictions: string = '';
    formattedComposition: string = '';
    formattedPrice: string = '';
    formattedCarbonFootprint: string = '';
    nutriScoreColor: string = 'red';
    loading: boolean = true;
    error: any;
    storages: Storage[] = [];
    productService: ProductService = ProductService.getInstance();
    productDetail: boolean = true;

    private colors: Map<string, string> = new Map([
        ['A', '#038141'],
        ['B', '#85bb2f'],
        ['C', '#fecb02'],
        ['D', '#ee8100'],
        ['E', '#e63e11'],
    ]);

    AddToStock() {
        this.addProductModal = true;
    }

    closeModalAddProduct() {
        this.addProductModal = false;
    }

    // Hook appelé après que le composant soit monté
    async mounted() {
        const route = useRoute();
        const barcode = route.params.barcode;
        if (typeof barcode === 'string') {
            await this.getProduct(barcode);
            this.storages = await StorageService.getInstance().getAllStorages();
        } else {
            console.error("Barcode is not a string:", barcode);
        }
    }

    // Méthode asynchrone pour récupérer les détails du produit
    async getProduct(barcode: string) {
        this.loading = true;
        try {
            this.product = await this.productService.getProductById(barcode);
            this.formatData();
        } catch (e) {
            this.showErrorMessage = true;
            this.error = e;
        } finally {
            this.loading = false;
        }
    }

    // Méthode pour formater les données du produit pour l'affichage
    formatData() {
        if (this.product == null)
            return;
        this.formattedAllergens = this.product.formatAllergens();
        this.formattedDietaryRestrictions = this.product.composition.formatDietaryRestrictions();
        this.formattedComposition = this.product.composition.formatIngredients();
        this.formattedPrice = this.product.formatPrice();
        this.formattedCarbonFootprint = this.product.formatCarbonFootprint();
        this.nutriScoreColor = this.colors.get(this.product.nutriScore.toLocaleUpperCase()) || 'red';
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

.product-detail .back-button {
    position: absolute;
    top: 10px;
    left: 10px;
    margin: 1em;
}

.product-detail-img {
    width: 100vw;
    height: 100%;
    object-fit: cover;
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
  
<template>
    <Modal :isOpen="isOpen" :onclickModalBackground="closeModal">
        <div class="modal-add-product-container">
            <div class="add-product-container" v-if="storages.length !== 0">
                <h3>Ajouter {{ product.name }}</h3>
                <label for="storage-name">Storage: </label>
                <select name="storage-name" id="product-detail-select">
                    <option v-for="storage in storages" :key="storage.id" :value="storage.id">
                        {{ storage.label }}
                    </option>
                </select>
                <label for="Quantity"></label>
                <input type="number" name="Quantity" id="Quantity" placeholder="Quantity">
                <Button :callback="checkValue" class="add-product-btn" buttonText="Add to stock"></Button>
            </div>
            <router-link to="/">Go add a storage</router-link>
        </div>
</Modal>
</template>


<script lang="ts">
import ProductDetail from '@/product/product-detail';
import { Options, Vue } from 'vue-class-component';
import Modal from './Modal.vue';
import Button from './Button.vue';
import { ProductService } from '@/services/product.service';

@Options({
    props: {
        storages: Array as () => Storage[],
        product: ProductDetail,
        close: Function,
        isOpen: Boolean,
    },
    components: {
        Modal,
        Button
    },
    emits: ['close']
})

export default class AddProduct extends Vue {
    storages!: Storage[]
    product!: ProductDetail
    isOpen!: boolean
    close!: () => void
    
    checkValue(){
        const storageId = (document.getElementById("product-detail-select") as HTMLSelectElement).value;
        const quantity = (document.getElementById("Quantity") as HTMLInputElement).value;
        if (storageId === "" || quantity === "")
            throw new Error("Please fill all the fields");
        if (isNaN(Number(quantity)) || Number(quantity) <= 0)
            throw new Error("Please enter a valid quantity");
        (document.querySelector(".add-product-btn") as HTMLButtonElement).disabled = true;
        this.addProduct(storageId, quantity);
    }

    async addProduct(storageId: string, quantity: string){
        await ProductService.getInstance().addProduct(storageId, Number(quantity), this.product.barcode);
        this.closeModal();
        this.$router.push(`/storage/${storageId}`);

    }

    closeModal() {
        this.close();
    }
}
</script>

<style>
@import "../css/variables.css";

.modal-add-product-container{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1em;
    border-radius: 2em;
}

.add-product-container{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.add-product-container select{
    width: 100%;
    height: 2em;
    border-radius: 0.5em;
    border: 1px solid black;
    margin-bottom: 1em;
}

.add-product-container button{
    width: 100%;
    margin: 1em;
    margin-left: 4em;
    margin-right: 4em;
}

.add-product-container input{
    width: 100%;
    height: 2em;
    border-radius: 0.5em;
    border: 1px solid black;
    margin-bottom: 1em;
}
</style>
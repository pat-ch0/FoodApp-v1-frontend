import Product from "@/product/product";
import ProductBuilder from "@/product/product-builder";

export default class Storage {
    label : string;
    id : string;
    products : Product[];

    constructor(id: string, label: string) {
        this.label = label;
        this.id = id;
        this.products = [];
    }

    setProductsFromJson(productsJson: any[]) {
        this.products = productsJson.map((productJson: any) => {
            return ProductBuilder.productFromJson(productJson);
        });
    }
    
    getLabel() {
        return this.label;
    }

    getId() {
        return this.id;
    }
}
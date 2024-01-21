import Product from "@/product/product";
import ProductBuilder from "@/product/product-builder";

export default class Storage {
    label : string;
    id : string;
    products : Product[];
    // TODO: Add a type property and set the image that matches the type
    type?: string;
    img? : string;

    constructor(id: string, label: string, type?: string, img?: string) {
        this.label = label;
        this.id = id;
        this.type = type;
        this.img = img;
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
import Product from "@/product/product";

export default class Storage {
    label : string;
    id : string;
    products : Product[];

    constructor(id: string, label: string, products: Product[]) {
        this.label = label;
        this.id = id;
        this.products = [];
    }
    
    getLabel() {
        return this.label;
    }

    getId() {
        return this.id;
    }
}
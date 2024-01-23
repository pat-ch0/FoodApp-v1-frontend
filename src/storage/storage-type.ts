import Product from "@/product/product";
import ProductBuilder from "@/product/product-builder";
import ProductDetail from "@/product/product-detail";

export default class StorageType {
    label : string;
    id : string = "";
    products : Product[];
    // TODO: Add a type property and set the image that matches the type
    type: string;
    img: string;
    productsDetails : ProductDetail[] = [];

    constructor(label: string, type: string, img: string, id?: string) {
        this.label = label;
        this.type = type;
        this.img = img;
        if (id) {
            this.id = id;
        }
        this.products = [];
    }
    
    async loadAllProductsDetail(){
        console.log(this.products)
        for (const product of this.products) {
            const productDetail = await product.getProductDetails();
            productDetail.stock = product.stock;
            this.productsDetails.push(productDetail);
        }
    }

    getNbProducts() {
        return this.products.length;
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
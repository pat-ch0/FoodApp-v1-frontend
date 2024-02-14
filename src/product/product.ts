import { ProductService } from "@/services/product.service";
import ProductDetail from "./product-detail";



export default class Product {
    public barcode!: string;
    public stock!: number;
    public storageId!: String;
    static productLoad: Map<string, ProductDetail> = new Map<string, ProductDetail>();

    public async getProductDetails(): Promise<ProductDetail> {
        if (Product.productLoad.has(this.barcode)) {
            const productDetail = Product.productLoad.get(this.barcode);
            return productDetail as ProductDetail;
        } 
        const productService = new ProductService();
        const productDetail = await productService.getProductById(this.barcode) as ProductDetail;
        Product.productLoad.set(this.barcode, productDetail);
        return productDetail;
    }
}

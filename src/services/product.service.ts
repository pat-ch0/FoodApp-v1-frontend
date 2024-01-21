import Product from '@/product/product';
import { ApiService } from './api.service';
import ProductBuilder from '@/product/product-builder';
import ProductDetail from '@/product/product-detail';

export class ProductService extends ApiService<ProductService> {

    private static apiKey: string = 'products';

    public constructor() {
        super(`${ApiService.endpoint}:${ApiService.port}/${ProductService.apiKey}`);
    }

    async getProductById(id: string): Promise<ProductDetail> {
        const response = await this.get(`${id}`);
        const product = response.data as any;
        if (product.error) {
            throw new Error(`[GET /getProductById/${id}] Error while fetching product`);
        }
        return ProductBuilder.productDetailFromJson(product);
    }

    async addProduct(storageId: string, stock: number, barcode: string): Promise<any> {
        return this.put(``, {
            "storageId": storageId,
            "stock": stock,
            "barcode": barcode
        });
    }

    async updateProduct(storageId: string, barcode: string, newStock: number): Promise<any> {
        return this.post(``, { storageId, stock: newStock, barcode });
    }

    async deleteProduct(storageId: string, barcode: string): Promise<any> {
        return this.post("/delete", {
            storageId,
            barcode
        });
    }

}

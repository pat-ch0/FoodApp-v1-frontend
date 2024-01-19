import Product from '@/product/product';
import { ApiService } from './api.service';
import ProductBuilder from '@/product/product-builder';

export class ProductService extends ApiService<ProductService> {

    private static apiKey: string = 'products';

    public constructor() {
        super(`${ApiService.endpoint}:${ApiService.port}/${ProductService.apiKey}`);
    }

    async getProductById(id: string): Promise<Product> {
        const response = await this.get(`${id}`);
        const product = response.data as any;
        if (product.error) {
            throw new Error(`[GET /getProductById/${id}] Error while fetching product`);
        }
        return ProductBuilder.fromJson(product);
    }

    async addProduct(storageId: string, stock: number, barcode: string): Promise<any> {
        return this.put(``, { storageId, stock, barcode });
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

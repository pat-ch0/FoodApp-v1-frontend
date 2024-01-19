import { ApiService } from './api.service';

export class ProductService extends ApiService {
    private static instance: ProductService;
    private static endpoint: string = 'http://localhost';
    private static port: string = '8090';
    private static apiKey: string = 'products';

    private constructor() {
        super(`${ProductService.endpoint}:${ProductService.port}/${ProductService.apiKey}/`);
    }

    static getInstance(): ProductService {
        if (!ProductService.instance) {
            ProductService.instance = new ProductService();
        }
        return ProductService.instance;
    }

    async getProductById(id: string): Promise<any> {
        return this.get(`${id}`);
    }

    // Add other methods related to Product service
}

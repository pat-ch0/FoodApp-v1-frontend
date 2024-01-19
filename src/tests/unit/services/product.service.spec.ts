import { ProductService } from '@/services/product.service';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// TODO: Fix this testing file
describe('ProductService', () => {
    let service: ProductService;

    beforeEach(() => {
        service = ProductService.getInstance();
    });

    it('should fetch product by ID correctly', async () => {
        const testProductId = '123';
        const testData = { data: { id: testProductId, name: 'Test Product' } };
        mockedAxios.get.mockResolvedValue(testData);
        const response = await service.getProductById(testProductId);
        expect(mockedAxios.get).toHaveBeenCalledWith(`${testProductId}`);
        expect(response).toEqual(testData);
    });

    // Additional tests for other ProductService methods
});

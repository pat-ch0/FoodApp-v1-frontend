import axios from 'axios';
import { ApiService } from '@/services/api.service';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// TODO: Fix this testing file
describe('ApiService', () => {
    let service: ApiService;
    const baseUrl = 'http://example.com';

    beforeEach(() => {
        service = new class extends ApiService {
            constructor() {
                super(baseUrl);
            }
        };
    });

    it('should create an instance', () => {
        expect(service).toBeDefined();
    });

    it('should perform GET requests', async () => {
        const endpoint = '/test';
        const responseData = { data: 'response' };
        mockedAxios.get.mockResolvedValue(responseData);

        const result = await service.get<string>(endpoint);
        expect(mockedAxios.get).toHaveBeenCalledWith(`${baseUrl}${endpoint}`);
        expect(result).toEqual(responseData);
    });

    // Add tests for other methods POST, PUT, DELETE etc.
});

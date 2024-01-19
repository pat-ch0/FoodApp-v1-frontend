import { ApiService } from './api.service';
import Storage from '@/storage/storage';
import ApiStorageError from '@/storage/errors/api-storage-error';

export default class StorageService extends ApiService<StorageService> {

    private static apiKey: string = 'storages';

    public constructor() {
        super(`${ApiService.endpoint}:${ApiService.port}/${StorageService.apiKey}`);
    }

    async getAllStorages(): Promise<Storage[]> {
        const response = await this.get(``);
        const storages = response.data as any;
        if (storages.error) {
            throw new ApiStorageError("[GET /getAllStorages] Error while fetching storages");
        }
        return storages.map((storage: any) => {
            return new Storage(storage.id, storage.label, storage.products);
        });
    }

    async getStorageById(id: string): Promise<Storage> {
        const response = await this.get(`${id}`);
        const storage = response.data as any;
        if (storage.error) {
            throw new ApiStorageError(`[GET /getStorageById/${id}] Error while fetching storage`);
        }
        return new Storage(storage.id, storage.label, storage.products);
    }

    async createStorage(label: string): Promise<Storage> {
        const response = await this.put(``, { label });
        const storage = response.data as any;
        if (storage.error) {
            throw new ApiStorageError(`[PUT /createStorage] Error while creating storage`);
        }
        return new Storage(storage.id, storage.label, storage.products);
    }
    
    async deleteStorageById(id: string): Promise<boolean> {
        const response = await this.delete(`${id}`);
        const storage = response.data as any;
        if (storage.error) {
            throw new ApiStorageError(`[DELETE /deleteStorageById/${id}] Error while deleting storage`);
        }
        return true;
    }

}

import { ApiService } from './api.service';
import Storage from '@/storage/storage-type';
import ApiStorageError from '@/storage/errors/api-storage-error';

export default class StorageService extends ApiService<StorageService> {

    private static apiKey: string = 'storages';

    public constructor() {
        super(`${ApiService.endpoint}:${ApiService.port}/${StorageService.apiKey}`);
    }

    async getAllStorages(): Promise<Storage[]> {
        const response = await this.get(``);
        const storages = response.data as any;
        if (((response as any).name == "AxiosError")) {
            throw new ApiStorageError("[GET /getAllStorages] Error while fetching storages");
        }
        return storages.map((storage: any) => {
            const newStorage = new Storage(storage.label, storage.type, storage.img, storage.id);
            newStorage.setProductsFromJson(storage.products);
            return newStorage;
        });
    }

    async getStorageById(id: string): Promise<Storage> {
        const response = await this.get(`${id}`);
        const storage = response.data as any;
        if (((response as any).name == "AxiosError")) {
            throw new ApiStorageError(`[GET /getStorageById/${id}] Error while fetching storage`);
        }
        const storageElem = new Storage(storage.label, storage.type, storage.img, storage.id);
        storageElem.setProductsFromJson(storage.products);
        return storageElem; 
    }

    async createStorage(label: string, type: string, img: string): Promise<Storage> {
        try {
            const response = await this.post('', {
                label: label,
                type: type,
                img: img
            });
            const storage = response.data as any;
            return new Storage(storage.type, storage.label, storage.img, storage.id);
        } catch (error) {
            console.error('Error creating storage:', error);
            throw new ApiStorageError(`[POST /createStorage] Error while creating storage`);
        }
    }
    
    
    async deleteStorageById(id: string): Promise<boolean> {
        const response = await this.delete(`${id}`);
        if (((response as any).name == "AxiosError")) {
            throw new ApiStorageError(`[DELETE /deleteStorageById/${id}] Error while deleting storage`);
        }
        return true;
    }

}

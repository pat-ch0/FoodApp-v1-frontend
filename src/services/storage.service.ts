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
        if (((response as any).name == "AxiosError")) {
            throw new ApiStorageError("[GET /getAllStorages] Error while fetching storages");
        }
        return storages.map((storage: any) => {
            const newStorage = new Storage(storage.id, storage.label);
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
        const storageElem = new Storage(storage.id, storage.label);
        storageElem.setProductsFromJson(storage.products);
        return storageElem; 
    }

    async createStorage(storageData: { label: string; type: string; prodNb: number; img: string }): Promise<Storage> {
        try {
            const response = await this.post('', storageData);
            const storage = response.data as any;
            console.log('Created Storage:', storage);
            return new Storage(storage.id, storage.type, storage.label, storage.img);
        } catch (error) {
            console.error('Error creating storage:', error);
            throw new ApiStorageError(`[POST /createStorage] Error while creating storage`);
        }
    }
    
    // async createStorage(label: string): Promise<Storage> {
    //     const response = await this.put(``, {label : label });
    //     console.log((response as any).name);
    //     if ((response as any).name == "AxiosError") {
    //         throw new ApiStorageError(`[PUT /createStorage] Error while creating storage`);
    //     }
    //     const storage = response.data as any;
    //     const storageElem = new Storage(storage.id, storage.label);
    //     storageElem.setProductsFromJson(storage.products);
    //     return storageElem;
    // }
    
    async deleteStorageById(id: string): Promise<boolean> {
        const response = await this.delete(`${id}`);
        if (((response as any).name == "AxiosError")) {
            throw new ApiStorageError(`[DELETE /deleteStorageById/${id}] Error while deleting storage`);
        }
        return true;
    }

}

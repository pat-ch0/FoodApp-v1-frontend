import axios, { AxiosInstance, AxiosResponse } from 'axios';

export abstract class ApiService {
    protected axiosInstance: AxiosInstance;

    constructor(baseUrl: string) {
        this.axiosInstance = axios.create({
            baseURL: baseUrl,
        });
    }

    async get<T>(id: string): Promise<AxiosResponse<T>> {
        try {
            return await this.axiosInstance.get<T>(id);
        } catch (error : any) {
            return error;
        }
    }

    // Add other methods for POST, PUT, DELETE, etc., with generic types
}

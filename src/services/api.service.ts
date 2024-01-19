import Singleton from '@/designpattern/singleton';
import axios, { AxiosInstance, AxiosResponse } from 'axios';

export abstract class ApiService<T> extends Singleton<T> {

    protected static endpoint: string = 'http://localhost';
    protected static port: string = '8090';
    protected axiosInstance!: AxiosInstance;

    constructor(baseUrl: string) {
        super();
        this.axiosInstance = axios.create({
            baseURL: baseUrl,
        });
    }

    async get<T>(url: string): Promise<AxiosResponse<T>> {
        try {
            return await this.axiosInstance.get<T>(url, { withCredentials: true });
        } catch (error : any) {
            return error;
        }
    }

    async put<T>(url: string, data: any): Promise<AxiosResponse<T>> {
        try {
            return await this.axiosInstance.put<T>(url, data, { withCredentials: true });
        } catch (error : any) {
            return error;
        }
    }

    async post<T>(url: string, data: any): Promise<AxiosResponse<T>> {
        try {
            return await this.axiosInstance.post<T>(url, data, { withCredentials: true });
        } catch (error : any) {
            return error;
        }
    }

    async delete<T>(url: string): Promise<AxiosResponse<T>> {
        try {
            return await this.axiosInstance.delete<T>(url, { withCredentials: true });
        } catch (error : any) {
            return error;
        }
    }
}

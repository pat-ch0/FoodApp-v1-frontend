export default class ApiStorageError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ApiStorageError';
    }
}

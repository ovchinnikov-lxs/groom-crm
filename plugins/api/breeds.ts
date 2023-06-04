import { UseFetchOptions } from '#app';

export class BreedsApi {
    private apiUrl = '/breeds';

    getList<T>(options: UseFetchOptions<T> = {}) {
        return useApi(this.apiUrl, options);
    }
}

import { UseFetchOptions } from '#app';
import { IBreed } from 'assets/ts/types/breeds';

export class BreedsApi {
    private apiUrl = '/breeds';

    getList<T>(options: UseFetchOptions<T> = {}) {
        return useApi(this.apiUrl, options);
    }

    create(body: IBreed) {
        return useApi(this.apiUrl, {
            method: 'POST',
            body,
        });
    }

    update(id: string, body: IBreed) {
        return useApi(`${this.apiUrl}/${id}`, {
            method: 'PATCH',
            body,
        });
    }

    delete(id: string) {
        return useApi(`${this.apiUrl}/${id}`, {
            method: 'DELETE',
        });
    }
}

import { UseFetchOptions } from 'nuxt/app';

export class StaffApi {
    private apiUrl = '/staff';

    getList<T>(options: UseFetchOptions<T> = {}) {
        return useApi(this.apiUrl, options);
    }

    create(body: object) {
        return useApi(this.apiUrl, {
            method: 'POST',
            body,
        });
    }

    update(id: string, body: object) {
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

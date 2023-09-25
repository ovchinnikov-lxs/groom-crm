import type { UseFetchOptions } from 'nuxt/app';
import { ISalonDetail, ISalonSave } from '~/types/salons';

export class SalonsApi {
    getList<T>(options: UseFetchOptions<T> = {}) {
        return useApi('/salons', options);
    }

    getDetail<T>(id: string, options: UseFetchOptions<T> = {}) {
        return useApi<T>(`/salons/${id}`, options);
    }

    create(body: ISalonSave) {
        return useApi<ISalonDetail>('/salons', {
            method: 'POST',
            body,
        });
    }

    update(id: string, body: ISalonSave) {
        return useApi(`/salons/${id}`, {
            method: 'PATCH',
            body,
        });
    }

    delete(id: string) {
        return useApi(`/salons/${id}`, {
            method: 'DELETE',
        });
    }
}

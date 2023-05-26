import type { UseFetchOptions } from 'nuxt/app';

export interface ISalonSave {
    name: string | null;
    preview: string | null;
    openAt: string;
    closeAt: string;
    pricePerMonth: number | null;
    location: {
        lat: number | null;
        lng: number | null;
        address: string | null;
    }
}

export interface ISalonDetail extends ISalonSave {
    id: string;
    name: string;
    pricePerMonth: number;
    location: {
        lat: number;
        lng: number;
        address: string;
    }
}

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

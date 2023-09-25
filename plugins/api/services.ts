import { UseFetchOptions } from '#app';
import { IService, IServiceCategory } from '~/types/services';

export class ServicesApi {
    private apiUrl = '/services';
    private apiCategoryUrl = '/service-categories';

    getCategoryList<T>(options: UseFetchOptions<T> = {}) {
        return useApi(this.apiCategoryUrl, options);
    }

    getCategoryDetail<T>(id: string, options: UseFetchOptions<T> = {}) {
        return useApi(`${this.apiCategoryUrl}/${id}`, options);
    }

    createServiceCategory(body: IServiceCategory) {
        return useApi<IServiceCategory>(this.apiCategoryUrl, {
            method: 'POST',
            body,
        });
    }

    updateServiceCategory(id: string | undefined, body: IServiceCategory) {
        return useApi<IServiceCategory>(`${this.apiCategoryUrl}/${id}`, {
            method: 'PATCH',
            body,
        });
    }

    deleteServiceCategory(id: string) {
        return useApi(`${this.apiCategoryUrl}/${id}`, {
            method: 'DELETE',
        });
    }

    getList<T>(options: UseFetchOptions<T> = {}) {
        return useApi(this.apiUrl, options);
    }

    create(body: IService) {
        return useApi(this.apiUrl, {
            method: 'POST',
            body,
        });
    }

    update(id: string, body: IService) {
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

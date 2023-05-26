import { useApi } from '~/composables/useApi';

export interface IRolesItem {
    id: string;
    name: string;
    value: string;
    description: string;
}

export class RolesApi {
    getList() {
        return useApi<IRolesItem[]>('/roles');
    }
}

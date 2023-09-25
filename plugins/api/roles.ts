import { useApi } from '~/composables/useApi';
import { IRolesItem } from '~/types/roles';

export class RolesApi {
    getList() {
        return useApi<IRolesItem[]>('/roles');
    }
}

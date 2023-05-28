import { useApi } from '~/composables/useApi';
import { IRolesItem } from '~/assets/ts/types/roles';

export class RolesApi {
    getList() {
        return useApi<IRolesItem[]>('/roles');
    }
}

import { TariffsApi } from '~/plugins/api/tariffs';
import { RolesApi } from '~/plugins/api/roles';
import { AuthApi } from '~/plugins/api/auth';
import { UserApi } from '~/plugins/api/user';
import { CompanyApi } from '~/plugins/api/company';
import { SalonsApi } from '~/plugins/api/salons';

export default defineNuxtPlugin(() => ({
    provide: {
        api: {
            tariffs: new TariffsApi(),
            roles: new RolesApi(),
            auth: new AuthApi(),
            user: new UserApi(),
            company: new CompanyApi(),
            salons: new SalonsApi(),
        },
    },
}));

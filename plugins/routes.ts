import routesAuth from '~/plugins/routes/auth';
import routesSalons from '~/plugins/routes/salons';
import routesFinance from '~/plugins/routes/finance';
import routesStaff from '~/plugins/routes/staff';
import routesUser from '~/plugins/routes/user';
import routesServices from '~/plugins/routes/services';

export const routes = {
    landing: '/',

    ...routesAuth,
    ...routesSalons,
    ...routesFinance,
    ...routesStaff,
    ...routesUser,
    ...routesServices,
};

export default defineNuxtPlugin(() => ({
    provide: {
        routes,
    },
}));

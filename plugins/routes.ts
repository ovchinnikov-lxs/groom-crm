import routesAuth from '~/plugins/routes/auth';
import routesSalons from '~/plugins/routes/salons';
import routesFinance from '~/plugins/routes/finance';
import routesStaff from '~/plugins/routes/staff';
import routesUser from '~/plugins/routes/user';

export const routes = {
    index: '/',
    landing: 'https://groom-crm.ru',

    ...routesAuth,
    ...routesSalons,
    ...routesFinance,
    ...routesStaff,
    ...routesUser,
};

export default defineNuxtPlugin(() => ({
    provide: {
        routes,
    },
}));

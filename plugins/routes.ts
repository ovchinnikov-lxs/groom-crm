import routesAuth from '~/plugins/routes/auth';
import routesSalons from '~/plugins/routes/salons';
import routesFinance from '~/plugins/routes/finance';
import routesTeam from '~/plugins/routes/team';
import routesUser from '~/plugins/routes/user';

export const routes = {
    index: '/',
    landing: 'https://groom-crm.ru',

    ...routesAuth,
    ...routesSalons,
    ...routesFinance,
    ...routesTeam,
    ...routesUser,
};

export default defineNuxtPlugin(() => ({
    provide: {
        routes,
    },
}));

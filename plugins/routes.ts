import routesAuth from '~/plugins/routes/auth';

export const routes = {
    index: '/',
    landing: 'https://groom-crm.ru',

    ...routesAuth,
};

export default defineNuxtPlugin(() => ({
    provide: {
        routes,
    },
}));

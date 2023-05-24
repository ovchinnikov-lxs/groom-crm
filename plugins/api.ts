export const api = {
    tariffs: {
        list: '/tariffs',
    },
    roles: {
        list: '/roles',
    },

    auth: {
        login: '/auth/login',
        signup: '/auth/signup',
        password: '/auth/password',
    },

    user: {
        me: '/user/me',
    },

    company: {
        detail: '/company',
    },

    salons: {
        list: '/salons',
        detail: (salonId: string) => `/salons/${salonId}`,
    },
};

export default defineNuxtPlugin(() => ({
    provide: {
        api,
    },
}));

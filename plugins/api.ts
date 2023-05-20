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
};

export default defineNuxtPlugin(() => ({
    provide: {
        api,
    },
}));

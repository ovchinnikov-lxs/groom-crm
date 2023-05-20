export const apiPrefix = 'http://localhost:8000/api';
export const api = {
    tariffs: {
        list: `${apiPrefix}/tariffs`,
    },
    roles: {
        list: `${apiPrefix}/roles`,
    },

    auth: {
        login: `${apiPrefix}/auth/login`,
        signup: `${apiPrefix}/auth/signup`,
    },

    user: {
        me: `${apiPrefix}/user/me`,
    },

    company: {
        detail: `${apiPrefix}/company`,
    },
};

export default defineNuxtPlugin(() => ({
    provide: {
        api,
    },
}));

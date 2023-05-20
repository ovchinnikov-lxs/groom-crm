export const apiPrefix = 'http://localhost:8000/api';
export const api = {
    tariffs: {
        list: `${apiPrefix}/tariffs`,
    },
    roles: {
        list: `${apiPrefix}/roles`,
    },
};

export default defineNuxtPlugin(() => ({
    provide: {
        api,
    },
}));

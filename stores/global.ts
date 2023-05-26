import { defineStore } from 'pinia';

export const useGlobal = defineStore('global', {
    state: () => ({
        locale: 'RU',
    }),

    actions: {
        async fetchInitial() {
            await Promise.all([
                useRoles().fetchInitial(),
                useCompany().fetchInitial(),
            ]);
        },
    },
});

import { defineStore } from 'pinia';

export const useGlobal = defineStore('global', {
    actions: {
        async fetchInitial() {
            await Promise.all([
                useRoles().fetchInitial(),
                useCompany().fetchInitial(),
            ]);
        },
    },
});

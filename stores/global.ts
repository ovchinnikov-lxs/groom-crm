import { defineStore } from 'pinia';

export const useStoreGlobal = defineStore('global', {
    actions: {
        async fetchInitial() {
            const storeProfile = useStoreProfile();
            const storeCompany = useStoreCompany();


            await Promise.all([
                storeProfile.fetchInitial(),
                storeCompany.fetchInitial(),
            ]);
        },
    },
});

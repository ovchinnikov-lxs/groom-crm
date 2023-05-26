import { defineStore } from 'pinia';

interface IState {
    detail: {
        [key: string]: any
    }
}
export const useCompany = defineStore('company', {
    state: (): IState => ({
        detail: {},
    }),

    getters: {
        tariffCompanyIs: state => (key: string) => {
            const tariffs = useTariffs();

            return tariffs.list.find(t => t.id === state.detail.tariffId)?.name === key;
        },
    },

    actions: {
        async fetchDetail() {
            try {
                const { $api } = useNuxtApp();
                const { data } = await $api.company.getInfo();

                this.detail = data.value || {};
            } catch (e) {
                console.log(e);
            }
        },

        async fetchInitial() {
            await Promise.all([
                this.fetchDetail(),
            ]);
        },
    },
});

import { defineStore } from 'pinia';

import { api } from '~/plugins/api';

interface IState {
    detail: {
        [key: string]: any
    }
}
export const useCompany = defineStore('company', {
    state: (): IState => ({
        detail: {},
    }),

    actions: {
        async fetchDetail() {
            try {
                const { data } = await useAxios(api.company.detail);

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

import { defineStore } from 'pinia';
import { ITariffsItem } from '~/plugins/api/tariffs';
export const useTariffs = defineStore('tariffs', {
    state: (): {
        list: Array<ITariffsItem>
    } => ({
        list: [],
    }),

    actions: {
        async fetchList() {
            try {
                const { $api } = useNuxtApp();
                const { data } = await $api.tariffs.getList();
                this.list = data.value || [];
            } catch (e) {
                console.log(e);
            }
        },

        async fetchInitial() {
            await Promise.all([
                this.fetchList(),
            ]);
        },
    },
});

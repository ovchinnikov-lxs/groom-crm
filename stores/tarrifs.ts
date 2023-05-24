import { defineStore } from 'pinia';
import { api } from '~/plugins/api';

export interface ITariffItem {
    id: string;
    name: string;
    description: string;
    price: number;
}

type ListType = Array<ITariffItem>

interface IState {
    list: ListType;
}

export const useTariffs = defineStore('tariffs', {
    state: (): IState => ({
        list: [],
    }),

    actions: {
        async fetchList() {
            try {
                const { data } = await useAxios<ListType>(api.tariffs.list);

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

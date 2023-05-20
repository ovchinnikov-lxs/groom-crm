import { defineStore } from 'pinia';
import { api } from '~/plugins/api';

interface IListItem {
    id: string;
    name: string;
    description: string;
    price: number;
}

type ListType = Array<IListItem>
export const useTariffs = defineStore('tariffs', {
    state: (): {
        list: ListType
    } => ({
        list: [],
    }),

    actions: {
        async fetchList() {
            try {
                const { data } = await useFetch<ListType>(api.tariffs.list);

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

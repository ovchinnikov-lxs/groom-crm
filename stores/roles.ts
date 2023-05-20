import { defineStore } from 'pinia';
import { api } from '~/plugins/api';

interface IRole {
    name: string;
    value: string;
    description: string;
}

type ListType = Array<IRole>

interface IState {
    list: ListType
}

export const useRoles = defineStore('roles', {
    state: (): IState => ({
        list: [],
    }),

    actions: {
        async fetchList() {
            try {
                const { data } = await useAxios<ListType>(api.roles.list);

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

import { defineStore } from 'pinia';
import { IRolesItem } from '~/assets/ts/types/roles';

export const useRoles = defineStore('roles', {
    state: (): {
        list: Array<IRolesItem>
    } => ({
        list: [],
    }),

    actions: {
        async fetchList() {
            try {
                const { $api } = useNuxtApp();

                const { data } = await $api.roles.getList();

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

import { defineStore } from 'pinia';
import type { Tables } from '~/types/supabase';

export const useStoreTariffs = defineStore('tariffs', {
    state: (): { list: Array<Tables<'Tariff'>> } => ({
        list: [],
    }),

    actions: {
        async fetchList() {
            try {
                const data = await $fetch('/api/tariffs', {
                    headers: useRequestHeaders(['cookie']),
                });

                this.list = data || [];
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

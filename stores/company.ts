import { defineStore } from 'pinia';
import type { Tables } from '~/types/supabase';
import type { Nullable } from '~/types';

interface IState {
    detail: Tables<'Company'>
}
export const useStoreCompany = defineStore('company', {
    state: (): IState => ({
        detail: {
            id: '',
            name: null,
            tariff_id: '',
            created_at: 'string',
            end_access_date: null,
        },
    }),

    getters: {
        currentTariff(): Nullable<Tables<'Tariff'>> {
            const tariffs = useStoreTariffs();

            return tariffs.list.find(item => item.id === this.detail.tariff_id) || null;
        },

        tariffCompanyIs() {
            return (key: string): boolean => this.currentTariff?.name === key;
        },
    },

    actions: {
        async fetchDetail() {
            try {
                const data = await $fetch('/api/company', {
                    headers: useRequestHeaders(['cookie']),
                });

                if (!data) {
                    return false;
                }

                this.detail = data;
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

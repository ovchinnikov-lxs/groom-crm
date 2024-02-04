import { defineStore } from 'pinia';
import type { Tables } from '~/types/supabase';

interface IState {
    profile: Tables<'Profile'>
}

export const useStoreProfile = defineStore('profile', {
    state: (): IState => ({
        profile: {
            avatar: '',
            company_id: '',
            created_at: '',
            description: null,
            full_name: null,
            id: '',
            salary: null,
            role: 'owner',
            status: 'active',
        },
    }),

    getters: {
        displayRole(): string {
            return ROLES_LABELS[this.profile.role];
        },

        isOwner(): boolean {
            return this.profile.role.includes(ROLES_KEYS.OWNER);
        },

        isAdmin(): boolean {
            return this.profile.role.includes(ROLES_KEYS.ADMIN);
        },

        isMaster(): boolean {
            return this.profile.role.includes(ROLES_KEYS.MASTER);
        },
    },

    actions: {
        async fetchProfile() {
            try {
                const data = await $fetch('/api/profile', {
                    headers: useRequestHeaders(['cookie']),
                });

                if (!data) {
                    return false;
                }

                this.profile = data;
            } catch (e) {
                console.error('STORE:USER:FETCH_PROFILE', e);
            }
        },

        async fetchInitial() {
            await Promise.all([
                this.fetchProfile(),
            ]);
        },
    },
});

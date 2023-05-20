import { ROLES_KEYS } from 'assets/ts/constants/roles';

export const useUser = defineStore('user', {
    getters: {
        getUserRolesValue: (): Array<string> => {
            const auth = useAuth();

            return auth.user?.roles?.map((r: { value: string }) => r.value) || [];
        },

        isOwner(): boolean {
            return this.getUserRolesValue.includes(ROLES_KEYS.OWNER);
        },

        isAdmin(): boolean {
            return this.getUserRolesValue.includes(ROLES_KEYS.ADMIN);
        },

        isMaster(): boolean {
            return this.getUserRolesValue.includes(ROLES_KEYS.MASTER);
        },
    },
});

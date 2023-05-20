import { api } from '~/plugins/api';
import { AUTH_TOKEN_KEY } from 'assets/ts/constants/auth';

export const useAuth = defineStore('auth', {
    state: () => ({
        loggedIn: false,
        user: {},
    }),

    actions: {
        async setUserToken(value: string) {
            const token = useCookie(AUTH_TOKEN_KEY, {
                path: '/',
            });
            try {
                token.value = value;
                this.loggedIn = true;
            } catch (e) {
                console.log(e);
            }
        },

        async logout() {
            try {
                const token = useCookie(AUTH_TOKEN_KEY, {
                    path: '/',
                });
                token.value = null;
                this.loggedIn = false;
            } catch (e) {
                console.log(e);
            }
        },

        async fetchUser() {
            const token = useCookie(AUTH_TOKEN_KEY, {
                path: '/',
            });

            try {
                if (token.value) {
                    const { data } = await useAxios(api.user.me);

                    this.user = data || {};
                    this.loggedIn = true;
                }
            } catch (e) {
                console.log(e);
            }
        },
    },
});

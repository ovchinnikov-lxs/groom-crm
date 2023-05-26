import { AUTH_TOKEN_KEY } from 'assets/ts/constants/auth';

interface IState {
    loggedIn: boolean;
    user: {
        [key: string]: any
    }
}
export const useAuth = defineStore('auth', {
    state: (): IState => ({
        loggedIn: false,
        user: {},
    }),

    actions: {
        async logout() {
            try {
                useCookie(AUTH_TOKEN_KEY).value = null;
                this.loggedIn = false;
            } catch (e) {
                console.log(e);
            }
        },

        async fetchUser() {
            try {
                if (useCookie(AUTH_TOKEN_KEY).value) {
                    const { $api } = useNuxtApp();
                    const { data } = await $api.user.getInfo();

                    if (data.value) {
                        this.user = data.value || {};
                        this.loggedIn = true;
                    }
                }
            } catch (e) {
                console.log(e);
            }
        },
    },
});

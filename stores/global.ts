export const useGlobal = defineStore('global', {
    state: () => ({}),

    actions: {
        async fetchInitial() {
            const tariffs = useTariffs();
            const roles = useRoles();
            const auth = useAuth();

            await Promise.all([
                tariffs.fetchInitial(),
                roles.fetchInitial(),
                auth.fetchUser(),
            ]);

            if (auth.loggedIn) {
                console.log('fetch initial for auth');
            }
        },
    },
});

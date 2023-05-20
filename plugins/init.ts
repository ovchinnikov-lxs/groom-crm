import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin(async (nuxtApp: any) => {
    const tariffs = useTariffs(nuxtApp.$pinia);
    const roles = useRoles(nuxtApp.$pinia);
    const auth = useAuth(nuxtApp.$pinia);
    const company = useCompany(nuxtApp.$pinia);

    await Promise.all([
        tariffs.fetchInitial(),
        roles.fetchInitial(),
        auth.fetchUser(),
    ]);

    if (auth.loggedIn) {
        await Promise.all([
            company.fetchInitial(),
        ]);
    }
});

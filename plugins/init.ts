import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin(async (nuxtApp: any) => {
    const tariffs = useTariffs(nuxtApp.$pinia);
    const auth = useAuth(nuxtApp.$pinia);
    const global = useGlobal(nuxtApp.$pinia);

    await Promise.all([
        tariffs.fetchInitial(),
        auth.fetchUser(),
    ]);

    if (auth.loggedIn) {
        await Promise.all([
            global.fetchInitial(),
        ]);
    }
});

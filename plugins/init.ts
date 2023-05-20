import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin(async (nuxtApp: any) => {
    const global = useGlobal(nuxtApp.$pinia);

    await Promise.all([
        global.fetchInitial(),
    ]);
});

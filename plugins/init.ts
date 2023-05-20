import { defineNuxtPlugin } from '#app';
import { useTariffs } from '~/stores/tarrifs';

export default defineNuxtPlugin(async (nuxtApp: any) => {
    const todos = useTariffs(nuxtApp.$pinia);

    await Promise.all([
        todos.fetchInitial(),
    ]);
});

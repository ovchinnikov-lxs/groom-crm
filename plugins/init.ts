import { defineNuxtPlugin } from '#app';
import { useTariffs } from '~/stores/tarrifs';
import { useRoles } from '~/stores/roles';

export default defineNuxtPlugin(async (nuxtApp: any) => {
    const todos = useTariffs(nuxtApp.$pinia);
    const roles = useRoles(nuxtApp.$pinia);

    await Promise.all([
        todos.fetchInitial(),
        roles.fetchInitial(),
    ]);
});

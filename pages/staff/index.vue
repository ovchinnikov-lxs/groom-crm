<script setup lang="ts">
import type { Tables } from '~/types/supabase';

useSeoMeta({
    title: 'Команда',
});

const storeBreadcrumbs = useStoreBreadcrumbs();
const storeModal = useStoreModal();
const storeProfile = useStoreProfile();
const storeCompany = useStoreCompany();

const { data, refresh } = await useAsyncData(async () => await $fetch<{
    data: Tables<'Profile'>[];
}>('/api/staff', {
    headers: useRequestHeaders(['cookie']),
    params: {
        company_id: storeCompany.detail.id,
    },
}));

const staff = computed<Tables<'Profile'>[]>(() => data?.value?.data || []);

storeBreadcrumbs.setList([{
    title: 'Команда',
}]);

function openCreateModal() {
    storeModal.open({
        component: defineAsyncComponent(() => import('~/components/staff/Save/StaffSave.vue')),
        onClose: refresh,
    });
}

</script>

<template>
    <UiPage class="StaffPage">
        <template #header>
            <LazyUiButton
                v-if="storeProfile.isOwner"
                :class="$style.button"
                @click="openCreateModal"
            >
                Добавить сотрудника
            </LazyUiButton>
        </template>
        <template #default>
            <LazyUiEmpty v-if="!staff.length">
                <template #text>Вы еще не добавили сотрудников</template>
            </LazyUiEmpty>

            <LazyStaffTable
                v-else
                :list="staff"
                @update="refresh"
            />
        </template>
    </UiPage>
</template>

<style lang="scss" module>
.button {
    margin-left: auto;
}
</style>

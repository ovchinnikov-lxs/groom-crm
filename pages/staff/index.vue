<script setup lang="ts">
const breadcrumbs = useBreadcrumbs();

breadcrumbs.setList([{
    title: 'Команда',
}]);

const { $api } = useNuxtApp();
const { data: staff, refresh } = await $api.staff.getList({
    key: 'staff',
});

function openCreateModal() {
    modal.open({
        component: defineAsyncComponent(() => import('~/components/staff/Save/StaffSave.vue')),
        componentProps: {
        },
        onClose: refresh,
    });
}

const { isOwner } = useUser();
</script>

<template>
    <UiPage class="StaffPage">
        <template #header>
            <UiButton
                v-if="isOwner"
                :class="$style.button"
                @click="openCreateModal"
            >
                Добавить сотрудника
            </UiButton>
        </template>
        <template #default>
            <UiEmpty v-if="!staff.length">
                <template #text>Вы еще не добавили сотрудников</template>
            </UiEmpty>

            <StaffTable
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

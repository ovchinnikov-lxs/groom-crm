<script setup lang="ts">
import { IStaffItem } from 'assets/ts/types/staff';

const breadcrumbs = useBreadcrumbs();

breadcrumbs.setList([{
    title: 'Команда',
}]);

const staff: Array<IStaffItem> = [];

function openCreateModal() {
    modal.open({
        component: defineAsyncComponent(() => import('~/components/staff/StaffSave.vue')),
    });
}
</script>

<template>
    <UiPage class="StaffPage">
        <template #header>
            <UiButton :class="$style.button" @click="openCreateModal">
                Добавить сотрудника
            </UiButton>
        </template>
        <template #default>
            <UiEmpty v-if="!staff.length">
                <template #text>Вы еще не добавили сотрудников</template>
            </UiEmpty>
        </template>
    </UiPage>
</template>

<style lang="scss" module>
.button {
    margin-left: auto;
}
</style>

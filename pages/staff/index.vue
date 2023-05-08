<script setup lang="ts">
import { useBreadCrumbsStore } from '~/stores/bread-crumbs';

const breadCrumbs = useBreadCrumbsStore();

breadCrumbs.changeBreadCrumbs([{
    title: 'Команда',
}]);

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
            StaffPage
        </template>
    </UiPage>
</template>

<style lang="scss" module>
.button {
    margin-left: auto;
}
</style>

<script setup lang="ts">
const { changeBreadCrumbs } = useBreadCrumbsStore();

changeBreadCrumbs([{
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

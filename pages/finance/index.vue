<script setup lang="ts">
const breadcrumbs = useBreadcrumbs();

breadcrumbs.setList([{
    title: 'Финансы',
}]);
</script>

<template>
    <UiPage class="FinancePage">
        <template #default>
            FinancePage
        </template>
    </UiPage>
</template>

<style lang="scss" module>
.wrapper {
    width: 100%;
    height: 100%;
}
</style>

<script setup lang="ts">
const breadcrumbs = useBreadcrumbs();

breadcrumbs.setList([{
    title: 'Список пород',
}]);
</script>

<template>
    <UiPage class="BreedsPage">
        <template #default>
            BreedsPage
        </template>
    </UiPage>
</template>

<style lang="scss" module>
.wrapper {
    width: 100%;
    height: 100%;
}
</style>

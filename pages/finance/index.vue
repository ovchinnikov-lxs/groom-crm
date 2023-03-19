<script setup lang="ts">
import { useBreadCrumbsStore } from '~/stores/bread-crumbs';

const breadCrumbs = useBreadCrumbsStore();

breadCrumbs.changeBreadCrumbs([{
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

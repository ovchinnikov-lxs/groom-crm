<script setup lang="ts">
import { useBreadCrumbsStore } from '~/stores/bread-crumbs';

const breadCrumbs = useBreadCrumbsStore();

breadCrumbs.changeBreadCrumbs([{
    title: 'Команда',
}]);
</script>

<template>
    <UiPage class="TeamPage">
        <template #default>
            TeamPage
        </template>
    </UiPage>
</template>

<style lang="scss" module>
.wrapper {
    width: 100%;
    height: 100%;
}
</style>

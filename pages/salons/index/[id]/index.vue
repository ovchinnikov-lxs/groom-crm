<script setup lang="ts">
import { useBreadCrumbsStore } from '~/stores/bread-crumbs';

const breadCrumbs = useBreadCrumbsStore();
const { $routes } = useNuxtApp();

breadCrumbs.changeBreadCrumbs([
    {
        title: 'Салоны',
        to: $routes.salons.list,
    },
    {
        title: 'Название салона',
    },
]);
</script>


<template>
    <UiPage class="SalonsIndex">
        <template #default>
            <div class="SalonDetailPage">
                <div :class="$style.wrapper">
                    SalonDetailPage
                </div>
            </div>
        </template>
    </UiPage>
</template>

<style lang="scss" module>
.wrapper {
    width: 100%;
    height: 100%;
}
</style>

<script setup lang="ts">
import { modal } from '~/composables/modal';

const breadcrumbs = useBreadcrumbs();
const { isOwner } = useUser();

breadcrumbs.setList([{
    title: 'Услуги',
}]);
const { $api } = useNuxtApp();
const { data: list, refresh } = await $api.services.getCategoryList({
    key: 'service-category',
});

function openCreateModal() {
    modal.open({
        component: defineAsyncComponent(() => import('~/components/services/Categories/ServicesCategoriesSave.vue')),
        onClose: () => {
            refresh();
        },
    });
}

function onUpdate() {
    refresh();
}
</script>

<template>
    <UiPage class="ServicesPage">
        <template #header>
            <UiButton
                v-if="isOwner"
                :class="$style.button"
                @click="openCreateModal"
            >
                Добавить категорию услуг
            </UiButton>
        </template>

        <template #default>
            <ServicesCategoriesTable
                v-if="list.length"
                :list="list"
                @update="onUpdate"
            />

            <UiEmpty v-else>
                <template #text>Вы еще не создали ни одну категорию</template>
            </UiEmpty>
        </template>
    </UiPage>
</template>

<style module lang="scss">
.button {
    margin-left: auto;
}
</style>

<script setup lang="ts">
import { modal } from '~/composables/modal';

const { $routes, $api } = useNuxtApp();
const breadcrumbs = useBreadcrumbs();

const { data: serviceCategory, refresh: categoryRefresh } = await $api.services.getCategoryDetail(String(useRoute().params.categoryId), {
    key: 'serviceCategory',
});
const { data: serviceList, refresh: servicesRefresh } = await $api.services.getList({
    key: 'serviceList',
});

if (!serviceCategory.value) {
    navigateTo($routes.services.list);
}

function updateBreadcrumbs() {
    breadcrumbs.setList([
        {
            title: 'Услуги',
            to: $routes.services.list,
        },
        {
            title: serviceCategory.value.name,
        },
    ]);
}

updateBreadcrumbs();

function onUpdate() {
    modal.open({
        component: defineAsyncComponent(() => import('~/components/services/Categories/ServicesCategoriesSave.vue')),
        componentProps: {
            value: serviceCategory,
        },
        onClose: async () => {
            await categoryRefresh();
            updateBreadcrumbs();
        },
    });
}
async function onDelete() {
    const { $api, $routes } = useNuxtApp();

    await $api.services.deleteServiceCategory(serviceCategory.value.id);
    navigateTo($routes.services.list);
}

function onListUpdate() {
    servicesRefresh();
}

function createService() {
    modal.open({
        component: defineAsyncComponent(() => import('~/components/services/ServicesSave.vue')),
        componentProps: {
            categoryId: serviceCategory.value.id,
        },
        onClose: () => {
            servicesRefresh();
        },
    });
}
</script>

<template>
    <UiPage class="ServiceCategoryDetail">
        <template #default>
            <div :class="$style.wrapper">
                <ServicesCategoriesDetailInfo
                    :category="serviceCategory"
                    @update="onUpdate"
                    @delete="onDelete"
                />

                <div :class="$style.control">
                    <UiHelp type="tutorial">
                        <template #title>Список услуг</template>
                        <template #default>
                            Создавайте услуги по категории с выбором пород
                        </template>
                    </UiHelp>

                    <UiButton :class="$style.button" @click="createService">
                        Добавить услугу
                    </UiButton>
                </div>

                <ServicesTable
                    v-if="serviceList.length"
                    :list="serviceList"
                    :category-id="serviceCategory.id"
                    @update="onListUpdate"
                />

                <UiEmpty v-else>
                    <template #text>Вы еще не создали ни одну услугу</template>
                </UiEmpty>
            </div>
        </template>
    </UiPage>
</template>

<style lang="scss" module>
.wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    row-gap: calc(var(--ui-unit) * 8);
}

.control {
    display: flex;
    align-items: flex-start;
    column-gap: calc(var(--ui-unit) * 3);
}

.button {
    margin-left: auto;
}
</style>

<script setup lang="ts">
const breadcrumbs = useStoreBreadcrumbs();
const storeModal = useStoreModal();
const storeProfile = useStoreProfile();

const { data, refresh } = await useAsyncData(async () => await $fetch('/api/service', {
    headers: useRequestHeaders(['cookie']),
    params: {
        company_id: storeProfile.profile.company_id,
    },
}));


if (!data.value) {
    throw createError({
        statusCode: 404,
        message: 'Такой страницы не существует',
    });
}

breadcrumbs.setList([{
    title: 'Услуги',
}]);

function openCreateModal() {
    storeModal.open({
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
            <LazyUiButton
                v-if="storeProfile.isOwner"
                :class="$style.button"
                @click="openCreateModal"
            >
                Добавить категорию услуг
            </LazyUiButton>
        </template>

        <template #default>
            <LazyServicesCategoriesTable
                v-if="data?.data?.length"
                :list="data.data"
                @update="onUpdate"
            />

            <LazyUiEmpty v-else>
                <template #text>Вы еще не создали ни одну категорию</template>
            </LazyUiEmpty>
        </template>
    </UiPage>
</template>

<style module lang="scss">
.button {
    margin-left: auto;
}
</style>

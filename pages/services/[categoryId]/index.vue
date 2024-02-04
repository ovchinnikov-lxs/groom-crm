<script setup lang="ts">
import type { IServiceDetail } from '~/types/services';

const storeProfile = useStoreProfile();
const storeBreadcrumbs = useStoreBreadcrumbs();
const storeModal = useStoreModal();
const storeToast = useStoreToast();
const route = useRoute();

const { data, refresh } = await useAsyncData(async () => await $fetch(`/api/service/${route.params.categoryId}`, {
    headers: useRequestHeaders(['cookie']),
}));

if (!data?.value) {
    throw createError({
        statusCode: 404,
        message: 'Такой страницы не существует',
    });
}

function setBreadcrumbs() {
    storeBreadcrumbs.setList([
        {
            title: 'Услуги',
            to: '/services',
        },
        {
            title: data?.value?.name || '',
        },
    ]);
}

setBreadcrumbs();

function onUpdate() {
    storeModal.open({
        component: defineAsyncComponent(() => import('~/components/services/Categories/ServicesCategoriesSave.vue')),
        componentProps: {
            value: data.value,
        },
        onClose: async () => {
            await refresh();
            setBreadcrumbs();
        },
    });
}
async function onDelete() {
    storeModal.open({
        type: 'confirm',
        modalProps: {
            title: 'Вы действительно хотите удалить услугу?',
        },
        onClose: async res => {
            if (!res) {
                return false;
            }

            try {
                await $fetch(`/api/service/${data.value?.id}`, {
                    method: 'DELETE',
                });

                navigateTo('/services');

                storeToast.add({
                    type: 'success',
                    text: 'Услуга успешно удалена',
                });
            } catch (e) {
                console.error('PAGE:BREEDS:ON_DELETE:', e);
            }
        },
    });
}

function createService() {
    if (!data?.value?.id) {
        return false;
    }

    storeModal.open({
        component: defineAsyncComponent(() => import('~/components/services/ServicesSave.vue')),
        componentProps: {
            categoryId: data.value.id,
        },
        onClose: () => {
            refresh();
        },
    });
}
</script>

<template>
    <UiPage class="ServiceCategoryDetail">
        <template #default>
            <div :class="$style.wrapper">
                <ServicesCategoriesDetailInfo
                    :category="data!"
                    @update="onUpdate"
                    @delete="onDelete"
                />

                <div v-if="storeProfile.isOwner" :class="$style.control">
                    <LazyUiHelp type="tutorial" :class="$style.help">
                        <template #title>Список услуг</template>
                        <template #default>
                            Создавайте услуги в удобных категориях.
                            Добавляйте подкатегории с породными особенностями,
                            обеспечивая точный выбор для ваших клиентов.
                        </template>
                    </LazyUiHelp>

                    <LazyUiButton :class="$style.button" @click="createService">
                        Добавить услугу
                    </LazyUiButton>
                </div>

                <LazyServicesTable
                    v-if="data?.services?.length"
                    :list="data.services as IServiceDetail[]"
                    :category-id="data.id"
                    @update="refresh"
                />

                <LazyUiEmpty v-else>
                    <template #text>Вы еще не создали ни одну услугу</template>
                </LazyUiEmpty>
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

.help {
    max-width: 600px;
}

.button {
    margin-left: auto;
}
</style>

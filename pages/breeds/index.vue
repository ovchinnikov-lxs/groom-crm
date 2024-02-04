<script setup lang="ts">
import type { Tables } from '~/types/supabase';

const breadcrumbs = useStoreBreadcrumbs();
const storeProfile = useStoreProfile();
const storeModal = useStoreModal();
const storeToast = useStoreToast();

useSeoMeta({
    title: 'Породы',
});

const { data, refresh: fetchBreeds } = await useAsyncData(async () => await $fetch<{data: Tables<'Breed'>[]}>('/api/breeds', {
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
    title: 'Список пород',
}]);

const columns = [
    { id: 'image', name: 'Изображение', width: '15%' },
    { id: 'name', name: 'Название', width: '35%' },
    { id: 'description', name: 'Описание', width: '40%' },
    { id: 'control', name: '', width: '10%' },
];

function openModal(value: Tables<'Breed'> | null) {
    storeModal.open({
        component: defineAsyncComponent(() => import('~/components/breeds/BreedsSave.vue')),
        componentProps: {
            ...value && { value },
        },
        onClose: () => fetchBreeds(),
    });
}

async function onDelete(id: string) {
    storeModal.open({
        type: 'confirm',
        modalProps: {
            title: 'Вы действительно хотите удалить породу?',
        },
        onClose: async res => {
            if (!res) {
                return false;
            }

            try {
                await $fetch(`/api/breeds/${id}`, {
                    method: 'DELETE',
                });

                await fetchBreeds();

                storeToast.add({
                    type: 'success',
                    text: 'Порода успешно удалена',
                });
            } catch (e) {
                console.error('PAGE:BREEDS:ON_DELETE:', e);
            }
        },
    });
}
</script>

<template>
    <UiPage class="BreedsPage">
        <template #header>
            <LazyUiButton
                v-if="storeProfile.isOwner"
                :class="$style.button"
                @click="openModal(null)"
            >
                Добавить породу
            </LazyUiButton>
        </template>

        <template #default>
            <div :class="$style.page">

                <LazyUiTable
                    v-if="data?.data?.length"
                    :columns="columns"
                    :data="data.data"
                    :class="$style.wrapper"
                >
                    <template #image="columnProps">
                        <LazyUiImage
                            :src="columnProps.value"
                            external
                            :class="$style.preview"
                        />
                    </template>

                    <template #control="columnProps">
                        <LazyUiTooltip
                            v-if="storeProfile.isOwner"
                            interactive
                            :class="$style.tooltip"
                        >
                            <template #header>
                                <LazyUiButton size="small" icon>
                                    <LazyUiIcon name="ui/settings"/>
                                </LazyUiButton>
                            </template>
                            <template #bottom>
                                <div :class="$style.tooltipBottom">
                                    <LazyUiButton size="x-small" @click="openModal(columnProps.item)">
                                        Редактировать
                                    </LazyUiButton>
                                    <LazyUiButton size="x-small" @click="onDelete(columnProps.item.id)">
                                        Удалить
                                    </LazyUiButton>
                                </div>
                            </template>
                        </LazyUiTooltip>
                    </template>
                </LazyUiTable>

                <LazyUiEmpty v-else>
                    <template #text>
                        Вы еще не создали ни одну породу
                    </template>
                </LazyUiEmpty>
            </div>
        </template>
    </UiPage>
</template>

<style lang="scss" module>
.button {
    margin-left: auto;
}

.page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 800px;
}

.wrapper {
    width: calc(100% + var(--ui-col) * 2);
    height: 100%;

    :global(.UiTable__item) {
        &:nth-child(4n + 1) {
            padding-left: var(--ui-col);
        }

        &:nth-child(4n) {
            padding-right: var(--ui-col);
        }
    }

    :global(.UiTable__data-value) {
        font-size: calc(var(--ui-unit) * 4);
        line-height: 125%;
    }
}

.preview {
    overflow: hidden;
    width: calc(var(--ui-col) * 2);
    height: calc(var(--ui-col) * 2);
    border-radius: 50%;
    transform: translate3d(0, 0, 0);
}

.tooltip {
    margin-left: auto;
}

.tooltipBottom {
    display: flex;
    flex-direction: column;
    row-gap: calc(var(--ui-unit) * 2);
}
</style>

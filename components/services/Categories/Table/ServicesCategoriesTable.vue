<script setup lang="ts">
import type { Tables } from '~/types/supabase';

defineProps<{
    list: Array<Tables<'ServiceCategory'>>
}>();
const storeProfile = useStoreProfile();
const storeModal = useStoreModal();
const storeToast = useStoreToast();

const columns = [
    { id: 'image', name: 'Изображение категории' },
    { id: 'name', name: 'Название категории' },
    { id: 'description', name: 'Описание категории' },
    { id: 'control', name: '' },
];

const emit = defineEmits<{
    update: [void]
}>();

function onEdit(value: Tables<'ServiceCategory'>) {
    storeModal.open({
        component: defineAsyncComponent(() => import('~/components/services/Categories/ServicesCategoriesSave.vue')),
        componentProps: {
            value,
        },
        onClose: () => {
            emit('update');
        },
    });
}
async function onDelete(id: string) {
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
                await $fetch(`/api/service/${id}`, {
                    method: 'DELETE',
                });

                storeToast.add({
                    type: 'success',
                    text: 'Услуга успешно удалена',
                });
                emit('update');
            } catch (e) {
                console.error('PAGE:BREEDS:ON_DELETE:', e);
            }
        },
    });
}

function onClick(id: string) {
    navigateTo(`/services/${id}`);
}
</script>

<template>
    <div class="ServicesCategoriesTable">
        <UiTable
            interactive
            :columns="columns"
            :data="list"
            :class="$style.wrapper"
            @click-row="onClick($event.id)"
        >
            <template #image="columnProps">
                <UiImage
                    :src="columnProps.item.image"
                    width="80"
                    height="80"
                    :class="$style.image"
                />
            </template>

            <template #description="columnProps">
                <div :class="$style.description" v-html="columnProps.item.description"></div>
            </template>

            <template #control="columnProps">
                <div :class="$style.control">
                    <LazyUiTooltip v-if="storeProfile.isOwner" interactive>
                        <template #header>
                            <LazyUiButton size="small" icon>
                                <UiIcon name="ui/settings"/>
                            </LazyUiButton>
                        </template>
                        <template #bottom>
                            <div :class="$style.tooltipBottom">
                                <LazyUiButton size="x-small" @click="onEdit(columnProps.item)">
                                    Редактировать
                                </LazyUiButton>

                                <LazyUiButton size="x-small" @click="onDelete(columnProps.item.id)">
                                    Удалить
                                </LazyUiButton>
                            </div>
                        </template>
                    </LazyUiTooltip>
                </div>
            </template>
        </UiTable>
    </div>
</template>

<style module lang="scss">
.wrapper {
    width: calc(100% + var(--ui-col) * 2);
    height: 100%;
    margin-left: calc(var(--ui-col) * -1);

    :global(.UiTable__item) {
        &:nth-child(4n + 1) {
            padding-left: var(--ui-col);
        }

        &:nth-child(4n) {
            padding-right: var(--ui-col);
        }
    }
}

.image {
    border-radius: 50%;
    transform: translate3d(0, 0, 0);
}

.description {
    @include text-clamp(2);
}

.control {
    display: flex;
    justify-content: flex-end;
}

.tooltipBottom {
    display: flex;
    flex-direction: column;
    row-gap: calc(var(--ui-unit) * 2);
}
</style>

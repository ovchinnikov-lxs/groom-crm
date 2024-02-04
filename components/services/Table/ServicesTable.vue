<script setup lang="ts">
import type { IServiceDetail } from '~/types/services';

const props = defineProps<{
    list: IServiceDetail[];
    categoryId: string;
}>();

const storeProfile = useStoreProfile();
const storeModal = useStoreModal();
const storeToast = useStoreToast();

const columns = [
    { id: 'image', name: 'Изображение', width: '15%' },
    { id: 'name', name: 'Название', width: '15%' },
    { id: 'description', name: 'Описание', width: '20%' },
    { id: 'price', name: 'Стоимость', width: '10%' },
    { id: 'duration', name: 'Длительность', width: '10%' },
    { id: 'breeds', name: 'Породы', width: '20%' },
    { id: 'control', name: '', width: '10%' },
];
const emit = defineEmits<{
    update: [void]
}>();

function onEdit(value: IServiceDetail) {
    storeModal.open({
        component: defineAsyncComponent(() => import('~/components/services/ServicesSave.vue')),
        componentProps: {
            categoryId: props.categoryId,
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
                await $fetch(`/api/service/${props.categoryId}/detail/${id}`, {
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
</script>

<template>
    <div class="ServicesTable">
        <UiTable
            :data="list"
            :columns="columns"
            :class="$style.wrapper"
        >
            <template #image="columnProps">
                <UiImage :src="columnProps.item.image" :class="$style.image"/>
            </template>

            <template #name="columnProps">
                <b>
                    {{ columnProps.item.name }}
                </b>
            </template>

            <template #price="columnProps">
                {{ splitThousands(columnProps.value) }} ₽
            </template>

            <template #duration="columnProps">
                <template v-if="getHumanTime(columnProps.value).hours">
                    {{ getHumanTime(columnProps.value).hours }} час{{ plural(getHumanTime(columnProps.value).hours, ['', 'а', 'ов']) }}
                </template>
                <template v-if="getHumanTime(columnProps.value).minutes">
                    <template v-if="getHumanTime(columnProps.value).hours">,</template>
                    {{ getHumanTime(columnProps.value).minutes }} минут{{ plural(getHumanTime(columnProps.value).minutes, ['а', 'ы', '']) }}
                </template>
            </template>

            <template #breeds="columnProps">
                <div :class="$style.breeds">
                    <div
                        v-for="item in columnProps.item.breeds"
                        :key="item.id"
                        :class="$style.breedsItem"
                    >
                        <LazyUiTooltip>
                            <template #header>
                                <LazyUiImage :src="item.image" :class="$style.breedsImage"/>
                            </template>
                            <template #bottom>
                                {{ item.name }}
                            </template>
                        </LazyUiTooltip>
                    </div>
                </div>
            </template>

            <template #control="columnProps">
                <div :class="$style.control">
                    <LazyUiTooltip v-if="storeProfile.isOwner" interactive>
                        <template #header>
                            <LazyUiButton size="small" icon>
                                <LazyUiIcon name="ui/settings"/>
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
        &:nth-child(7n + 1) {
            padding-left: var(--ui-col);
        }

        &:nth-child(7n) {
            padding-right: var(--ui-col);
        }
    }
}

.image {
    overflow: hidden;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    transform: translate3d(0, 0, 0);
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

.breeds {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    column-gap: 8px;
    row-gap: 8px;
}

.breedsImage {
    overflow: hidden;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    transform: translate3d(0, 0, 0);
}
</style>

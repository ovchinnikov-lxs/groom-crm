<script setup lang="ts">
import { getHumanTime, plural, splitThousands } from '~/assets/ts/utils/format-utils';

const props = defineProps({
    list: {
        type: Array,
        default: () => [],
    },

    categoryId: {
        type: String,
        required: true,
    },
});
const { isOwner } = useUser();

const columns = [
    { id: 'preview', name: 'Изображение', width: '15%' },
    { id: 'name', name: 'Название', width: '15%' },
    { id: 'description', name: 'Описание', width: '20%' },
    { id: 'price', name: 'Стоимость', width: '10%' },
    { id: 'duration', name: 'Длительность', width: '10%' },
    { id: 'breeds', name: 'Породы', width: '20%' },
    { id: 'control', name: '', width: '10%' },
];
const $emit = defineEmits<{
    update: [void]
}>();

function onEdit(value) {
    modal.open({
        component: defineAsyncComponent(() => import('~/components/services/ServicesSave.vue')),
        componentProps: {
            categoryId: props.categoryId,
            value,
        },
        onClose: () => {
            $emit('update');
        },
    });
}
async function onDelete(id: string) {
    try {
        const { $api } = useNuxtApp();
        await $api.services.delete(id);
        $emit('update');
    } catch (e) {
        console.log(e);
    }
}
</script>

<template>
    <div class="ServicesTable">
        <UiTable
            :data="list"
            :columns="columns"
            :class="$style.wrapper"
        >
            <template #item="itemProps: {columnField: string, value: any, item }">
                <div v-if="itemProps.columnField === 'price'">
                    {{ splitThousands(itemProps.value) }} ₽
                </div>

                <div v-if="itemProps.columnField === 'duration'">
                    <template v-if="getHumanTime(itemProps.value).hours">
                        {{ getHumanTime(itemProps.value).hours }} час{{ plural(getHumanTime(itemProps.value).hours, ['', 'а', 'ов']) }}
                    </template>
                    <template v-if="getHumanTime(itemProps.value).minutes">
                        <template v-if="getHumanTime(itemProps.value).hours">,</template>
                        {{ getHumanTime(itemProps.value).minutes }} минут{{ plural(getHumanTime(itemProps.value).minutes, ['а', 'ы', '']) }}
                    </template>
                </div>

                <div v-if="itemProps.columnField === 'breeds'">
                    <b>{{ itemProps.value.map(i => i.name).join(', ') }}</b>
                </div>

                <div v-if="itemProps.columnField === 'control'" :class="$style.control">
                    <UiTooltip v-if="isOwner" interactive>
                        <template #header>
                            <UiButton size="small" icon>
                                <UiIcon name="ui/settings"/>
                            </UiButton>
                        </template>
                        <template #bottom>
                            <div :class="$style.tooltipBottom">
                                <UiButton size="x-small" @click="onEdit(itemProps.item)">
                                    Редактировать
                                </UiButton>
                                <UiButton size="x-small" @click="onDelete(itemProps.item.id)">
                                    Удалить
                                </UiButton>
                            </div>
                        </template>
                    </UiTooltip>
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
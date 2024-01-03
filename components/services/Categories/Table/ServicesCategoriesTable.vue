<script setup lang="ts">
import { modal } from '~/composables/modal';
import { IServiceCategory } from '~/types/services';

defineProps({
    list: {
        type: Array,
        default: () => [],
    },
});
const { isOwner } = useUser();

const columns = [
    { id: 'preview', name: 'Изображение категории' },
    { id: 'name', name: 'Название категории' },
    { id: 'description', name: 'Описание категории' },
    { id: 'control', name: '' },
];

const $emit = defineEmits<{
    update: [void]
}>();
function onEdit(value: IServiceCategory) {
    modal.open({
        component: defineAsyncComponent(() => import('~/components/services/Categories/ServicesCategoriesSave.vue')),
        componentProps: {
            value,
        },
        onClose: () => {
            $emit('update');
        },
    });
}
async function onDelete(id: string) {
    const { $api } = useNuxtApp();
    await $api.services.deleteServiceCategory(id);
    $emit('update');
}

function onClick(item: any) {
    const { $routes } = useNuxtApp();
    navigateTo($routes.services.detail(item.id));
}
</script>

<template>
    <div class="ServicesCategoriesTable">
        <UiTable
            interactive
            :columns="columns"
            :data="list"
            :class="$style.wrapper"
            @click-row="onClick"
        >
            <template #control="{ item }: { item: IServiceCategory }">
                <div :class="$style.control">
                    <UiTooltip v-if="isOwner" interactive>
                        <template #header>
                            <UiButton size="small" icon>
                                <UiIcon name="ui/settings"/>
                            </UiButton>
                        </template>
                        <template #bottom>
                            <div :class="$style.tooltipBottom">
                                <UiButton size="x-small" @click="onEdit(item)">
                                    Редактировать
                                </UiButton>
                                <UiButton size="x-small" @click="onDelete(item.id)">
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
        &:nth-child(4n + 1) {
            padding-left: var(--ui-col);
        }

        &:nth-child(4n) {
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

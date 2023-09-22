<script setup lang="ts">
import _ from 'lodash';
import { IBreed } from 'assets/ts/types/breeds';

const breadcrumbs = useBreadcrumbs();
const { isOwner } = useUser();

breadcrumbs.setList([{
    title: 'Список пород',
}]);


const breedsQuery = reactive({
    limit: 20,
    offset: 0,
});

const { $api } = useNuxtApp();
const { data, refresh } = await $api.breeds.getList({
    query: breedsQuery,
});

const actualList = ref<IBreed[]>(_.cloneDeep(data.value.rows));

const columns = [
    { id: 'preview', name: 'Изображение', width: '15%' },
    { id: 'name', name: 'Название', width: '35%' },
    { id: 'description', name: 'Описание', width: '40%' },
    { id: 'control', name: '', width: '10%' },
];

function openModal(value: any | null) {
    modal.open({
        component: defineAsyncComponent(() => import('~/components/breeds/BreedsSave.vue')),
        componentProps: {
            ...value && { value },
        },
        onClose: () => {
            refresh();
        },
    });
}

async function onDelete(id: string) {
    try {
        await $api.breeds.delete(id);
        refresh();
    } catch (e) {
        console.log(e);
    }
}

const loadMore = async () => {
    try {
        breedsQuery.offset += 5;
        await refresh();
        actualList.value = actualList.value.concat(data.value.rows);
    } catch (e) {
        console.log(e);
    }
};
</script>

<template>
    <UiPage class="BreedsPage">
        <template #header>
            <UiButton
                v-if="isOwner"
                :class="$style.button"
                @click="openModal(null)"
            >
                Добавить породу
            </UiButton>
        </template>
        <template #default>
            <template v-if="actualList.length">
                <UiTable
                    :columns="columns"
                    :data="actualList"
                    :class="$style.wrapper"
                >
                    <template #preview="{ value }">
                        <UiImage
                            :src="value"
                            :class="$style.preview"
                        />
                    </template>

                    <template #control="{ item }">
                        <UiTooltip
                            v-if="isOwner"
                            interactive
                            :class="$style.tooltip"
                        >
                            <template #header>
                                <UiButton size="small" icon>
                                    <UiIcon name="ui/settings"/>
                                </UiButton>
                            </template>
                            <template #bottom>
                                <div :class="$style.tooltipBottom">
                                    <UiButton size="x-small" @click="openModal(item)">
                                        Редактировать
                                    </UiButton>
                                    <UiButton size="x-small" @click="onDelete(item.id)">
                                        Удалить
                                    </UiButton>
                                </div>
                            </template>
                        </UiTooltip>
                    </template>
                </UiTable>

                <UiButton :class="$style.load" @click="loadMore">Показать еще</UiButton>
            </template>

            <UiEmpty v-else>
                <template #text>
                    Вы еще не создали ни одну породу
                </template>
            </UiEmpty>
        </template>
    </UiPage>
</template>

<style lang="scss" module>
.button {
    margin-left: auto;
}

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

.load {
    width: 100%;
    margin-top: var(--ui-col);
}
</style>

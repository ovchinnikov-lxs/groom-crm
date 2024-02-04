<script setup lang="ts" generic="T">
interface IColumn {
    id: keyof T | string;
    name: string;
    width?: string;
}

interface IProps {
    columns: IColumn[];
    data: Array<T>;
    interactive?: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
    interactive: false,
});

const emit = defineEmits<{
    'click-row': [item: T]
}>();


const classList = computed(() => [{
    '--is-interactive': props.interactive,
}]);

// const styleList = computed(() => [{
// '--columns-count': props.columns.map(i => i.width) || `repeat(${props.columns?.length}, 1fr)`,
// }]);
// const styleList = computed(() => {
//     if (!props.columns) {
//         return [];
//     }
//
//     let columnsCount;
//
//     if (props.columns.every(i => i.width)) {
//         columnsCount = props.columns.map((i: IColumn) => i.width).join(' ');
//     } else {
//         columnsCount = `repeat(${props.columns.length}, 1fr)`;
//     }
//
//     return [{
//         '--columns-count': columnsCount,
//     }];
// });

const columnStyleList = computed(() => (item: IColumn) => ({
    ...item.width && { width: item.width },
}));


const dataItem = computed(() => (item: Record<IColumn['id'], any>, colId: IColumn['id']) => item[colId]);

function onClickRow(item: T) {
    if (!props.interactive) {
        return false;
    }

    emit('click-row', item);
}
</script>

<template>
    <table :class="classList" class="UiTable">
        <thead>
            <tr>
                <th
                    v-for="item in columns"
                    :key="item.id"
                    :style="columnStyleList(item)"
                    class="UiTable__header-cell UiTable__item text-x-small"
                >
                    {{ item.name }}
                </th>
            </tr>
        </thead>

        <tbody>
            <tr
                v-for="(item, index) in data"
                :key="index"
                class="UiTable__row text-x-small"
                @click="onClickRow(item)"
            >
                <td
                    v-for="col in columns"
                    :key="String(col.id) + index"
                    class="UiTable__cell UiTable__item"
                    :style="columnStyleList(col)"
                >
                    <slot
                        :name="col.id"
                        :item="item"
                        :value="dataItem(item as Record<IColumn['id'],any>, col.id)"
                    >
                        <div
                            v-if="dataItem(item as Record<IColumn['id'],any>, col.id)"
                            v-html="dataItem(item as Record<IColumn['id'],any>, col.id)"
                        >
                        </div>

                        <div v-else class="UiTable__data-empty">
                            Не установленно
                        </div>
                    </slot>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<style lang="scss">
.UiTable {
    $table: &;

    &__header-cell {
        padding: calc(var(--ui-unit) * 2);
        text-align: left;
        color: var(--ui-secondary-color);
    }

    &__item {
        border-bottom: 1px solid rgba(var(--ui-secondary-light-color-rgb), .48);
    }

    &__cell {
        padding: calc(var(--ui-unit) * 4) calc(var(--ui-unit) * 2);

        &:last-child {
            text-align: right;
        }
    }

    &__data-empty {
        color: var(--ui-secondary-color);
    }

    &.--is-interactive {
        #{$table} {
            &__row {
                cursor: pointer;
            }
        }
    }
}
</style>

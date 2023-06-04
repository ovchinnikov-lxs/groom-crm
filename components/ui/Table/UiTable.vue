<script setup lang="ts">
import type { PropType } from 'vue';

interface IColumn {
    id: string;
    name: string;
    width?: string;
}

const props = defineProps({
    columns: {
        type: Array as PropType<IColumn[]>,
        required: true,
    },

    data: {
        type: Array,
        default: () => [],
    },

    interactive: {
        type: Boolean,
        default: false,
    },
});

const classList = computed(() => [{
    '--is-interactive': props.interactive,
}]);

// const styleList = computed(() => [{
// '--columns-count': props.columns.map(i => i.width) || `repeat(${props.columns?.length}, 1fr)`,
// }]);
const styleList = computed(() => {
    if (!props.columns) {
        return [];
    }

    let columnsCount;

    if (props.columns.every(i => i.width)) {
        columnsCount = props.columns.map((i: IColumn) => i.width).join(' ');
    } else {
        columnsCount = `repeat(${props.columns.length}, 1fr)`;
    }

    return [{
        '--columns-count': columnsCount,
    }];
});

const $emit = defineEmits<{
    'click-row': [item: object]
}>();

function onClickRow(item: object) {
    if (!props.interactive) {
        return false;
    }

    $emit('click-row', item);
}
</script>

<template>
    <div
        :style="styleList"
        :class="classList"
        class="UiTable"
    >
        <div class="UiTable__wrapper">
            <div
                v-for="item in columns"
                :key="item.id"
                class="UiTable__header-label UiTable__item text-x-small"
            >
                {{ item.name }}
            </div>

            <template v-for="(item, index) in data">
                <div
                    v-for="col in columns"
                    :key="index + col.id"
                    class="UiTable__data-row UiTable__item text-x-small"
                    @click="onClickRow(item)"
                >
                    <slot
                        name="item"
                        :column-field="col.id"
                        :item="item"
                        :value="item[col.id]"
                    >
                        <div
                            v-if="item[col.id]"
                            class="UiTable__data-value"
                            v-html="item[col.id]"
                        >
                        </div>

                        <div v-else class="UiTable__data-empty">
                            Не установленно
                        </div>
                    </slot>
                </div>
            </template>
        </div>
    </div>
</template>

<style lang="scss">
.UiTable {
    $table: &;

    &__wrapper {
        display: grid;
        grid-template-columns: var(--columns-count);
        width: 100%;
        height: 100%;
    }

    &__header-label {
        padding: calc(var(--ui-unit) * 2);
        color: var(--ui-secondary-color);
    }

    &__item {
        border-bottom: 1px solid rgba(var(--ui-secondary-light-color-rgb), .48);
    }

    &__data-row {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: calc(var(--ui-unit) * 4) calc(var(--ui-unit) * 2);
    }

    &__data-empty {
        color: var(--ui-secondary-color);
    }

    &.--is-interactive {
        #{$table} {
            &__data-row {
                cursor: pointer;
            }
        }
    }
}
</style>

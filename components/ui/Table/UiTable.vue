<script setup lang="ts">
import type { PropType } from 'vue';

interface IColumn {
    id: string;
    name: string;
}

const props = defineProps({
    columns: {
        type: Array as PropType<IColumn[]>,
        required: true,
    },

    templateColumns: {
        type: String,
        default: '',
    },

    data: {
        type: Array,
        default: () => [],
    },
});

const styleList = computed(() => [{
    '--columns-count': props.templateColumns || `repeat(${props.columns?.length}, 1fr)`,
}]);
</script>

<template>
    <div :style="styleList" class="UiTable">
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
                >
                    <slot
                        name="item"
                        :column-field="col.id"
                        :item="item"
                        :value="item[col.id]"
                    >
                        <div v-if="item[col.id]" class="UiTable__data-value">

                            {{ item[col.id] }}
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
        border-bottom: 1px solid var(--ui-secondary-light-color);
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
}
</style>

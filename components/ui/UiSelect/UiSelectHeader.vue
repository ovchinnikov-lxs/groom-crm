<script setup lang="ts">
import type { PropType } from 'vue';

// UiKit Components
import { UiSelectHeader } from '@ovchinnikov-lxs-frontend/ui-kit';

defineProps({
    color: {
        type: [String, null] as PropType<string | null>,
        default: 'additional-light',
    },

    size: {
        type: String,
        default: 'medium',
    },
});
</script>

<template>
    <UiSelectHeader
        v-bind="$attrs"
        :color="color"
        :size="size"
    >

        <template v-if="$slots.default" #default>
            <slot></slot>
        </template>

        <template #chevron>
            <UiIcon name="ui/chevron" :size="size"/>
        </template>
    </UiSelectHeader>
</template>

<style lang="scss">
.UiSelectHeader {
    $header: &;

    border-style: solid;

    &.--medium-size {
        padding: calc(var(--ui-unit) * 4) calc(var(--ui-unit) * 5);
        border-radius: calc(var(--ui-unit) * 2.5);
        border-width: 1px;
        font-size: calc(var(--ui-unit) * 3.5);
        line-height: 125%;

        #{$header} {
            &__wrapper {
                display: flex;
                align-items: center;
                column-gap: calc(var(--ui-unit) * 2);
            }

            &__chevron {
                width: calc(var(--ui-unit) * 4);
                height: calc(var(--ui-unit) * 4);
            }
        }
    }

    &.--additional-light-color {
        border-color: var(--ui-white-color);
        background-color: var(--ui-additional-light-color);
        color: var(--ui-secondary-color);

        &.--is-opened {
            border-color: var(--ui-additional-color);
        }
    }
}
</style>

<script setup lang="ts">
// UiKit Components
import { UiInput } from '@ovchinnikov-lxs-frontend/ui-kit';

defineProps({
    color: {
        type: String,
        default: 'additional-light',
    },
});
</script>3

<template>
    <UiInput :color="color" v-bind="$attrs"/>
</template>

<style lang="scss">
.UiInput {
    border-style: solid;

    &.--medium-size {
        padding: calc(var(--ui-unit) * 4) calc(var(--ui-unit) * 5);
        border-radius: calc(var(--ui-unit) * 2.5);
        border-width: 1px;
        font-size: calc(var(--ui-unit) * 3.5);
        line-height: 125%;
    }

    &.--additional-light-color {
        border-color: var(--ui-white-color);
        background-color: var(--ui-additional-light-color);
        color: var(--ui-black-color);

        &:focus {
            border-color: var(--ui-additional-color);

            &.--is-error {
                border-color: var(--ui-error-color);
            }
        }

        &.--is-disabled {
            border-color: var(--ui-additional-light-color);
            background-color: rgba(var(--ui-additional-light-color-rgb), .4);
            color: rgba(var(--ui-black-color-rgb), .4);
        }
    }

    &.--is-error {
        border-color: var(--ui-error-color);
    }
}
</style>

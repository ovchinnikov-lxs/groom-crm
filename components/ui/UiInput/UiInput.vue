<script setup lang="ts">
// UiKit Components
import { UiInput } from '@ovchinnikov-lxs-frontend/ui-kit';

defineProps({
    color: {
        type: String,
        default: 'secondary',
    },
});
</script>

<template>
    <UiInput :color="color" v-bind="$attrs"/>
</template>

<style lang="scss">
.UiInput {
    border-style: solid;

    &.--medium-size {
        padding: calc(var(--ui-unit) * 4) calc(var(--ui-unit) * 6);
        border-radius: calc(var(--ui-unit) * 5);
        border-width: calc(var(--ui-unit) / 2);
        font-size: calc(var(--ui-unit) * 4);
    }

    &.--secondary-color {
        border-color: var(--secondary-color);
        color: var(--secondary-color);

        &:focus {
            border-color: var(--primary-color);
        }
    }
}
</style>

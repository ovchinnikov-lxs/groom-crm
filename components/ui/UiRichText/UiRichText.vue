<script setup lang="ts">
// UiKit Components
import { UiRichText } from '@ovchinnikov-lxs-frontend/ui-kit';

defineProps({
    color: {
        type: String,
        default: 'additional-light',
    },
});
</script>

<template>
    <UiRichText v-bind="$attrs" :color="color"/>
</template>

<style scoped lang="scss">
.UiRichText {
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
        color: var(--ui-secondary-color);

        &:focus {
            border-color: var(--ui-additional-color);

            &.--is-error {
                border-color: var(--ui-error-color);
            }
        }
    }

    &.--is-error {
        border-color: var(--ui-error-color);
    }
}
</style>

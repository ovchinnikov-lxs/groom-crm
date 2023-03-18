<script setup lang="ts">
// UiKit Components
import { UiButton } from '@ovchinnikov-lxs-frontend/ui-kit';

defineProps({
    color: {
        type: String,
        default: 'primary',
    },
});
</script>

<template>
    <UiButton
        :color="color"
        v-bind="$attrs"
    >
        <slot></slot>
    </UiButton>
</template>

<style lang="scss">
.UiButton {
    font-weight: bold;
    line-height: 140%;

    &.--medium-size {
        padding: calc(var(--ui-unit) * 3) calc(var(--ui-unit) * 13);
        border-radius: calc(var(--ui-unit) * 2.5);
        font-size: calc(var(--ui-unit) * 6);
    }

    &.--small-size {
        padding: calc(var(--ui-unit) * 3) calc(var(--ui-unit) * 13);
        border-radius: calc(var(--ui-unit) * 2.5);
        font-size: calc(var(--ui-unit) * 4);
    }

    &.--primary-color {
        &.--is-solid {
            background-color: var(--ui-primary-light-color);
            color: var(--ui-white-color);

            @include hover {
                background-color: var(--ui-primary-color);
            }

            &.--is-disabled {
                opacity: .6;
            }
        }
    }
}
</style>

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
    &.--medium-size {
        padding: calc(var(--ui-unit) * 3) calc(var(--ui-unit) * 13);
        border-radius: calc(var(--ui-unit) * 5);
        font-size: calc(var(--ui-unit) * 6);
    }

    &.--primary-color {
        &.--is-solid {
            background-color: var(--primary-color);
            color: var(--white-color);

            @include hover {
                background-color: var(--primary-light-color);
            }
        }
    }
}
</style>

<script setup lang="ts">
// UiKit Components
import { UiTooltip } from '@ovchinnikov-lxs-frontend/ui-kit';

defineProps({
    color: {
        type: String,
        default: 'white',
    },
});
</script>

<template>
    <UiTooltip v-bind="$attrs" :color="color">
        <template #header>
            <slot name="header"></slot>
        </template>

        <template #bottom>
            <slot name="bottom"></slot>
        </template>
    </UiTooltip>
</template>

<style lang="scss">
.UiTooltip {
    $tooltip: &;

    &__bottom {
        &.--medium-size {
            padding: calc(var(--ui-unit) * 3);

            #{$tooltip} {
                &__wrapper {
                    padding: calc(var(--ui-unit) * 3);
                    border-radius: calc(var(--ui-unit) * 2);
                }
            }
        }

        &.--white-color {
            #{$tooltip} {
                &__wrapper {
                    box-shadow: rgba(var(--ui-black-color-rgb), .04) 0 calc(var(--ui-unit) * 2) calc(var(--ui-unit) * 6) 0;
                    background-color: var(--ui-white-color);
                }
            }
        }
    }

    &__wrapper {
        &.tooltip-enter-active,
        &.tooltip-leave-active {
            opacity: 1;
            transform: translate3d(0, 0, 0);
            transition: transform .1s ease, opacity .1s ease;
        }

        &.tooltip-enter-from,
        &.tooltip-leave-to {
            opacity: 0;
            transform: translate3d(0, -4px, 0);
            transition: transform .1s ease, opacity .1s ease;
        }
    }
}
</style>

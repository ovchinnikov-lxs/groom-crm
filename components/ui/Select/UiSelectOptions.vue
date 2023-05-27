<script setup lang="ts">
import type { PropType } from 'vue';

// UiKit Components
import { UiSelectOptions } from '@ovchinnikov-lxs-frontend/ui-kit';

defineProps({
    color: {
        type: [String, null] as PropType<string | null>,
        default: 'additional-light',
    },
});
</script>

<template>
    <UiSelectOptions v-bind="$attrs" :color="color">
        <template #multiple-icon>
            <span></span>
        </template>
    </UiSelectOptions>
</template>

<style lang="scss">
.UiSelectOption {
    $option: &;

    &__icon {
        transition: all .3s ease;
    }

    &.--medium-size {
        padding: calc(var(--ui-unit) + 2px) calc(var(--ui-unit) * 2);
        border-radius: calc(var(--ui-unit) + 1px);
        font-size: calc(var(--ui-unit) * 3.5);
        line-height: 125%;

        #{$option} {
            &__icon {
                width: calc(var(--ui-unit) * 2);
                height: calc(var(--ui-unit) * 2);
                border-radius: 50%;
            }
        }
    }

    &.--additional-light-color {
        color: var(--ui-additional-color);

        &.--is-active {
            background-color: var(--ui-white-color);

            #{$option} {
                &__icon {
                    background-color: var(--ui-additional-color);
                }
            }
        }

        @include hover {
            background-color: var(--ui-additional-color);
            color: var(--ui-white-color);

            #{$option} {
                &__icon {
                    background-color: var(--ui-white-color);
                }
            }
        }
    }
}
</style>

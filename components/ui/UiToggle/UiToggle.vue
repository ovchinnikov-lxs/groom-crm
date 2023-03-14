<script setup lang="ts">
// Lib Components
import { UiToggle } from '@ovchinnikov-lxs-frontend/ui-kit';

defineProps({
    color: {
        type: String,
        default: 'additional',
    },
});
</script>

<template>
    <UiToggle v-bind="$attrs" :color="color">
        <template v-if="$slots['false-label']" #false-label>
            <slot name="false-label"></slot>
        </template>

        <template v-if="$slots['true-label']" #true-label>
            <slot name="true-label"></slot>
        </template>
    </UiToggle>
</template>

<style lang="scss">
.UiToggle {
    $toggle: &;

    &__button {
        &:after {
            content: '';
            transition: all .3s ease;
        }
    }

    &.--small-size {
        display: flex;
        align-items: center;
        column-gap: var(--ui-unit);

        #{$toggle} {
            &__label {
                font-size: calc(var(--ui-unit) * 3.5);
            }

            &__button {
                width: calc(var(--ui-unit) * 6);
                height: calc(var(--ui-unit) * 3);
                padding: 1px;
                border-radius: calc(var(--ui-unit) * 1.5);

                &:after {
                    width: calc(var(--ui-unit) * 2.5);
                    height: calc(var(--ui-unit) * 2.5);
                    border-radius: 50%;
                }
            }
        }
    }

    &.--additional-color {
        #{$toggle} {
            &__button {
                background-color: var(--ui-additional-light-color);

                &:after {
                    background-color: var(--ui-additional-color);
                }
            }
        }
    }

    &.--is-toggled {
        #{$toggle} {
            &__button {
                &:after {
                    background-color: var(--ui-black-color);
                    transform: translateX(12px);
                }
            }
        }
    }
}
</style>

<script setup lang="ts">
// Lib Components
import { UiPlate } from '@ovchinnikov-lxs-frontend/ui-kit';

defineProps({
    color: {
        type: String,
        default: 'additional-50',
    },
});

</script>

<template>
    <UiPlate v-bind="$attrs" :color="color">
        <slot></slot>
    </UiPlate>
</template>

<style lang="scss">
.UiPlate {
    $plate: &;

    &.--small-size {
        &.--is-rounded {
            #{$plate} {
                &__wrapper {
                    border-radius: calc(var(--ui-unit) * 2.5);
                }
            }
        }
    }

    &.--medium-size {
        &.--is-rounded {
            #{$plate} {
                &__wrapper {
                    border-radius: calc(var(--ui-unit) * 5);
                }
            }
        }
    }

    &.--white-color {
        &.--is-solid {
            #{$plate} {
                &__wrapper {
                    background-color: var(--ui-white-color);
                }
            }
        }
    }

    &.--additional-color {
        &.--is-solid {
            #{$plate} {
                &__wrapper {
                    background-color: var(--ui-additional-color);
                }
            }
        }
    }

    &.--additional-50-color {
        &.--is-solid {
            #{$plate} {
                &__wrapper {
                    background-color: rgba(var(--ui-additional-color-rgb), .5);
                }
            }
        }
    }
}
</style>

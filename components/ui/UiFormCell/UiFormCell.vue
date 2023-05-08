<script setup lang="ts">
// UiKit Components
import { UiFormCell } from '@ovchinnikov-lxs-frontend/ui-kit';

defineProps({
    color: {
        type: String,
        default: 'secondary',
    },
});
</script>

<template>
    <UiFormCell :color="color" v-bind="$attrs">
        <template v-if="$slots.label" #label><slot name="label"></slot></template>

        <template v-if="$slots.default" #default><slot></slot></template>

        <template v-if="$slots.info" #info><slot name="info"></slot></template>
    </UiFormCell>
</template>

<style lang="scss">
.UiFormCell {
    $cell: &;

    &__wrapper {
        display: flex;
        flex-direction: column;
    }

    &__error {
        color: var(--ui-error-color);
    }

    &.--medium-size {
        #{$cell} {
            &__wrapper {
                row-gap: var(--ui-unit);
            }

            &__label,
            &__error {
                padding-left: calc(var(--ui-unit) * 5);
            }

            &__label,
            &__error,
            &__info {
                font-size: calc(var(--ui-unit) * 3);
            }
        }
    }

    &.--secondary-color {
        #{$cell} {
            &__label,
            &__info {
                color: var(--ui-secondary-color);
            }
        }
    }
}
</style>

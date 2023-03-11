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

    &.--medium-size {
        #{$cell} {
            &__wrapper {
                row-gap: calc(var(--ui-unit) * 3);
            }

            &__label {
                font-size: calc(var(--ui-unit) * 4);
            }
        }
    }

    &.--secondary-color {
        #{$cell} {
            &__label {
                color: var(--secondary-color);
            }
        }
    }
}
</style>

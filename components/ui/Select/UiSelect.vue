<script setup lang="ts">
import { UiSelect } from '@ovchinnikov-lxs-frontend/ui-kit';
import type { Nullable } from '~/types';

withDefaults(defineProps<{
    color?: Nullable<string>;
}>(), {
    color: 'additional-light',
});
</script>

<template>
    <UiSelect v-bind="$attrs" :color="color">

        <template #header-component="headerProps: object">
            <slot name="header-component" v-bind="headerProps">
                <UiSelectHeader v-bind="headerProps"/>
            </slot>
        </template>

        <template v-if="$slots['body-header']" #body-header>
            <slot name="body-header"></slot>
        </template>

        <template #option-component="optionProps: object">
            <slot name="option-component" v-bind="optionProps">
                <UiSelectOptions v-bind="optionProps"/>
            </slot>
        </template>

        <template v-if="$slots['body-footer']" #body-footer>
            <slot name="body-footer"></slot>
        </template>
    </UiSelect>
</template>

<style lang="scss">
.UiSelect {
    $select: &;

    &.--is-disabled {
        opacity: .6;
    }

    &__bottom {
        &.--medium-size {
            display: flex;
            flex-direction: column;
            row-gap: calc(var(--ui-unit) * 3);
            margin-top: calc(var(--ui-unit) * 2);
            padding: calc(var(--ui-unit) * 3);
            border-radius: calc(var(--ui-unit) * 2.5);

            #{$select} {
                &__body {
                    display: flex;
                    flex-direction: column;
                    row-gap: calc(var(--ui-unit) * 2);
                }
            }
        }

        &.--additional-light-color {
            box-shadow: var(--ui-box-shadow);
            background-color: var(--ui-additional-light-color);
        }
    }

    &__body-header {
        & > * {
            width: 100%;
        }
    }
}
</style>

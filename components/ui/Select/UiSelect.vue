<script setup lang="ts">
import type { PropType } from 'vue';

// UiKit Components
import { UiSelect } from '@ovchinnikov-lxs-frontend/ui-kit';

defineProps({
    color: {
        type: [String, null] as PropType<string | null>,
        default: 'additional-light',
    },
});
</script>

<template>
    <UiSelect v-bind="$attrs" :color="color">

        <template #header-component="props">
            <slot name="header-component" v-bind="props">
                <UiSelectHeader v-bind="props"/>
            </slot>
        </template>

        <template v-if="$slots['body-header']" #body-header>
            <slot name="body-header"></slot>
        </template>

        <template #option-component="props">
            <slot name="option-component" v-bind="props">
                <UiSelectOptions v-bind="props"/>
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

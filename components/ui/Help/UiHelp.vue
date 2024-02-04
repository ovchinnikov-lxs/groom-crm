<script setup lang="ts">
import type { PropType } from 'vue';
import type { TypeSize } from '~/types';

type HelpType = 'error' | 'info' | 'tutorial' | 'warning';

const props = defineProps({
    type: {
        type: String as PropType<HelpType>,
        default: 'info',
    },

    size: {
        type: String as PropType<TypeSize>,
        default: 'medium',
    },
});

const classList = computed(() => [
    [`--${props.type}-type`],
    [`--${props.size}-size`],
]);

const iconName = computed(() => `ui/${props.type}`);
</script>

<template>
    <div
        v-bind="$attrs"
        :class="classList"
        class="UiHelp"
    >
        <div class="UiHelp__wrapper">

            <div class="UiHelp__header">
                <UiIcon :name="iconName" class="UiHelp__icon"/>

                <h5 class="UiHelp__title">
                    <slot name="title"></slot>
                </h5>
            </div>

            <div class="UiHelp__main">
                <slot></slot>
            </div>

        </div>
    </div>
</template>

<style lang="scss">
.UiHelp {
    $help: &;

    &__wrapper {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
    }

    &__header {
        display: flex;
        align-items: center;
    }

    &__icon {
        flex-shrink: 0;
    }

    &.--medium-size {
        #{$help} {
            &__wrapper {
                row-gap: calc(var(--ui-unit) * 3);
                padding: calc(var(--ui-unit) * 2);
                border-radius: calc(var(--ui-unit) * 2);
            }

            &__header {
                column-gap: calc(var(--ui-unit) * 2);
            }
        }
    }

    &.--tutorial-type {
        #{$help} {
            &__wrapper {
                border: 4px solid rgba(var(--ui-secondary-light-color-rgb), .4);
                background-color: rgba(var(--ui-secondary-light-color-rgb), .4);
                color: rgba(var(--ui-black-color-rgb), .6);
            }

            &__icon {
                color: var(--ui-primary-color);
            }
        }
    }
}
</style>

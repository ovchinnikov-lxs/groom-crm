<script setup lang="ts">
// Lib Components
import { UiLink } from '@ovchinnikov-lxs-frontend/ui-kit';

</script>

<template>
    <UiLink v-bind="$attrs">
        <slot></slot>
    </UiLink>
</template>

<style lang="scss">
.UiLink {
    &.--small-size {
        font-size: calc(var(--ui-unit) * 3.5);
        line-height: 140%;
    }

    &.--secondary-color {
        color: var(--ui-secondary-color);

        &.--is-interactive {
            @include hover {
                color: var(--ui-primary-color);
            }
        }
    }

    &.--primary-light-color {
        color: var(--ui-primary-light-color);

        &.--is-interactive {
            @include hover {
                color: var(--ui-primary-color);
            }
        }
    }

    &.--black-color {
        color: var(--ui-black-color);

        &.--is-interactive {
            @include hover {
                color: var(--ui-primary-color);
            }
        }
    }
}
</style>

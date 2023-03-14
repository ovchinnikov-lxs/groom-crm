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

        @include hover {
            color: var(--ui-primary-color);
        }
    }

    &.--black-color {
        color: var(--ui-black-color);

        @include hover {
            color: var(--ui-primary-color);
        }
    }
}
</style>

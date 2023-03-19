<script setup lang="ts">
// Lib Components
import { UiImage } from '@ovchinnikov-lxs-frontend/ui-kit';

defineProps({
    hasPreview: {
        type: Boolean,
        default: true,
    },
});
</script>

<template>
    <UiImage v-bind="$attrs">
        <template v-if="hasPreview" #preview></template>
    </UiImage>
</template>

<style lang="scss">
.UiImage__preview {
    background-color: var(--ui-additional-color);

    &:after {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-image:
            linear-gradient(
                90deg,
                rgba(var(--ui-white-color-rgb), 0) 0,
                rgba(var(--ui-white-color-rgb), .2) 20%,
                rgba(var(--ui-white-color-rgb), .5) 60%,
                rgba(var(--ui-white-color-rgb), 0)
            );
        transform: translateX(-100%);
        animation: shimmer 2s infinite;
    }

    @keyframes shimmer {
        100% {
            transform: translateX(100%);
        }
    }
}
</style>

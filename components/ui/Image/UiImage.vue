<script setup lang="ts">
// Lib Components
import { UiImage } from '@ovchinnikov-lxs-frontend/ui-kit';

const props = defineProps({
    hasPreview: {
        type: Boolean,
        default: true,
    },

    src: {
        type: String,
        default: '',
    },
});

const imageAttrs = computed(() => ({
    origin: props.src,
    // preview: props.src, todo: imgproxy blured
}));
</script>

<template>
    <UiImage v-bind="{...$attrs, ...imageAttrs}">
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

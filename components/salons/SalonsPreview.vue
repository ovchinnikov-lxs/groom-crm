<script setup lang="ts">
import type { PropType } from 'vue';

defineProps({
    preview: {
        type: [String, null] as PropType<string | null>,
        default: null,
    },
});
</script>

<template>
    <div class="SalonsPreview">
        <div :class="$style.wrapper">
            <UiImage
                v-if="preview"
                :src="preview"
                :class="$style.image"
            />

            <UiIcon
                name="salons/building"
                size="custom"
                :class="$style.icon"
            />
        </div>
    </div>
</template>

<style module lang="scss">
.wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: var(--ui-additional-color);
}

.image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.icon {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 25%;
    height: 25%;
    color: var(--ui-white-color);
    transform: translate3d(-50%, -50%, 0);
}
</style>

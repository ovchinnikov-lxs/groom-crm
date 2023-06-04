<script setup lang="ts">
import type { PropType } from 'vue';

defineProps({
    name: {
        type: String,
        required: true,
    },

    preview: {
        type: [String] as PropType<string>,
        default: '',
    },
});

defineEmits<{
    close: [void]
}>();
</script>

<template>
    <div class="BreedsSelectItem">
        <div :class="$style.wrapper">
            <div :class="$style.previewWrapper">
                <UiImage
                    v-if="preview"
                    :src="preview"
                    :class="$style.preview"
                />
            </div>

            <div :class="$style.name">{{ name }}</div>

            <UiIcon
                name="ui/close-circle"
                size="large"
                :class="$style.icon"
                @click.stop="$emit('close')"
            />
        </div>
    </div>
</template>

<style module lang="scss">
.wrapper {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    column-gap: calc(var(--ui-unit) * 2);
    padding: var(--ui-unit);
    border-radius: calc(var(--ui-unit) * 8);
    background-color: rgba(var(--ui-additional-color-rgb), .32);
}

.previewWrapper {
    overflow: hidden;
    flex-shrink: 0;
    width: calc(var(--ui-unit) * 8);
    height: calc(var(--ui-unit) * 8);
    border-radius: 50%;
    transform: translate3d(0, 0, 0);
}

.preview {
    width: 100%;
    height: 100%;
}

.name {
    font-size: calc(var(--ui-unit) * 4);
}

.icon {
    flex-shrink: 0;
    margin-left: calc(var(--ui-unit) * 2);
    transition: color .3s ease;
    cursor: pointer;

    @include hover {
        color: var(--ui-secondary-color);
    }
}
</style>

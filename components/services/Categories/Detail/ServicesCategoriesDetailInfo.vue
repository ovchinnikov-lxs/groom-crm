<script setup lang="ts">
import type { PropType } from 'vue';
import { IServiceCategory } from 'assets/ts/types/services';

defineProps({
    category: {
        type: Object as PropType<IServiceCategory>,
        default: () => ({}),
    },
});
defineEmits<{
    update: [void];
    delete: [void];
}>();
</script>

<template>
    <UiPlate class="ServicesCategoriesDetailInfo">
        <div :class="$style.wrapper">
            <div :class="$style.previewWrapper">
                <UiImage
                    v-if="category.preview"
                    :src="category.preview"
                    :class="$style.preview"
                />

                <UiIcon name="menu/services" :class="$style.icon"/>
            </div>

            <div :class="$style.info">
                <div
                    class="text-small"
                    :class="$style.description"
                    v-html="category.description"
                >
                </div>
            </div>

            <div :class="$style.controls">
                <UiButton size="small" @click="$emit('update')">
                    Редактировать
                </UiButton>

                <UiButton
                    outline
                    color="error"
                    size="small"
                    @click="$emit('delete')"
                >
                    Удалить
                </UiButton>
            </div>
        </div>
    </UiPlate>
</template>

<style module lang="scss">
.wrapper {
    display: flex;
    align-items: flex-start;
    width: 100%;
    height: 100%;
    column-gap: calc(var(--ui-unit) * 8);
    padding: calc(var(--ui-unit) * 4);
}

.previewWrapper {
    position: relative;
    overflow: hidden;
    display: flex;
    flex-shrink: 0;
    width: calc(var(--ui-unit) * 20);
    height: calc(var(--ui-unit) * 20);
    border-radius: calc(var(--ui-unit) * 2.5);
    background-color: var(--ui-additional-color);
    transform: translate3d(0, 0, 0);
}

.preview {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.icon {
    margin: auto;
    color: var(--ui-white-color);
}

.info {
    display: flex;
    flex-direction: column;
}

.description {
    color: var(--ui-secondary-color);
}

.controls {
    display: flex;
    flex-direction: column;
    row-gap: calc(var(--ui-unit) * 3);
    margin-left: auto;
}
</style>

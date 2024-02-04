<script setup lang="ts">
import type { PropType } from 'vue';

defineProps({
    id: {
        type: String,
        required: true,
    },

    name: {
        type: String,
        required: true,
    },

    preview: {
        type: [String, null] as PropType<string | null>,
        default: null,
    },
});

</script>
<template>
    <UiPlate
        tag="RouterLink"
        size="small"
        :to="`/salons/${id}`"
        rounded
        color="additional"
        :class="$style.SalonsPlate"
    >
        <span :class="$style.wrapper">

            <SalonsPreview :preview="preview" :class="$style.preview"/>

            <span :class="$style.name">
                {{ name }}
            </span>

        </span>
    </UiPlate>
</template>

<style lang="scss" module>
.SalonsPlate {
    :global(.UiPlate__wrapper) {
        overflow: hidden;
        transform: translate3d(0, 0, 0);
    }

    transition: transform .3s ease;

    @include hover {
        transform: scale(1.02);
    }
}

.wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding: calc(var(--ui-unit) * 6) 0;

    span {
        display: flex;
    }
}

.preview {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.name {
    position: relative;
    z-index: 2;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: auto;
    padding: calc(var(--ui-unit) * 2);
    background-color: rgba(var(--ui-additional-color-rgb), .8);
    text-align: center;
    white-space: nowrap;
    font-size: calc(var(--ui-unit) * 6);
    font-weight: bold;
    line-height: 140%;
    color: var(--ui-white-color);
}
</style>

<script setup lang="ts">
import type { PropType } from 'vue';
import type { TypeSize } from '~/types';

const props = defineProps({
    name: {
        type: String,
        required: true,
    },

    size: {
        type: String as PropType<TypeSize>,
        default: 'medium',
        validator: (v: string): boolean => [
            'xx-small',
            'x-small',
            'small',
            'medium',
            'large',
            'x-large',
            'xx-large',
            'custom',
        ].includes(v),
    },

    viewBox: {
        type: String,
        default: '0 0 24 24',
    },
});

const classList = computed(() => [
    [`--${props.size}-size`],
]);
</script>

<template>
    <div :class="classList" class="UiIcon">
        <SvgIcon
            :view-box="viewBox"
            :name="name"
            class="UiIcon__el"
        />
    </div>
</template>

<style lang="scss">
.UiIcon {
    display: inline-block;
    fill: currentColor;

    &.--medium-size {
        width: calc(var(--ui-unit) * 4);
        height: calc(var(--ui-unit) * 4);
    }

    &.--large-size {
        width: calc(var(--ui-unit) * 6);
        height: calc(var(--ui-unit) * 6);
    }

    &.--x-large-size {
        width: calc(var(--ui-unit) * 8);
        height: calc(var(--ui-unit) * 8);
    }

    &__el {
        display: block;
        width: 100%;
        height: 100%;
    }
}
</style>

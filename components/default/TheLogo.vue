<script setup lang="ts">
import { useCssModule } from 'vue';
import type { PropType } from 'vue';

const props = defineProps({
    size: {
        type: String as PropType<'small' | 'medium' | 'large' | 'custom'>,
        default: 'medium',
        validator: (v: string): boolean => [
            'small',
            'medium',
            'large',
            'custom',
        ].includes(v),
    },
});

const $style = useCssModule();

const classList = computed(() => [
    [$style[`--${props.size}-size`]],
]);
</script>

<template>
    <b :class="[$style.TheLogo, classList]">
        GROOM.CRM
    </b>
</template>

<style lang="scss" module>
.TheLogo {
    user-select: none;
    color: var(--ui-white-color);

    &.--medium-size {
        font-size: calc(var(--ui-unit) * 6);
    }

    &.--large-size {
        font-size: calc(var(--ui-unit) * 9);
    }
}
</style>

<script setup lang="ts">
import { PropType } from 'vue';

defineProps({
    id: {
        type: String,
        required: true,
    },

    name: {
        type: String,
        required: true,
    },

    image: {
        type: [String, null] as PropType<string | null>,
        default: null,
    },
});

</script>
<template>
    <UiPlate
        tag="RouterLink"
        size="small"
        :to="$routes.salons.detail(id)"
        rounded
        color="additional"
        :class="$style.SalonsPlate"
    >
        <span :class="$style.wrapper">

            <UiImage
                v-if="image"
                :origin="image"
                :class="$style.image"
            />

            <div :class="$style.iconWrapper">
                <nuxt-icon name="salons/pet" :class="$style.icon"/>
            </div>

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
        transform: scale(1.05);
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

.image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.iconWrapper {
    @include aspect-ratio(140, 140);

    position: absolute;
    top: 20%;
    left: 50%;
    width: 34%;
    color: var(--ui-white-color);
    transform: translate3d(-50%, 0, 0);
}

.icon {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    &:global(.nuxt-icon) {
        svg {
            width: unset;
            height: unset;
        }
    }
}

.name {
    position: relative;
    z-index: 2;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: auto;
    padding: calc(var(--ui-unit) * 4);
    background-color: rgba(var(--ui-additional-color-rgb), .8);
    text-align: center;
    white-space: nowrap;
    font-size: calc(var(--ui-unit) * 9);
    font-weight: bold;
    line-height: 140%;
    color: var(--ui-white-color);
}
</style>

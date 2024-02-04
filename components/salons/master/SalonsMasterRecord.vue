<script setup lang="ts">
import type { PropType } from 'vue';
const $style = useCssModule();

const props = defineProps({
    id: {
        type: String,
        required: true,
    },

    serviceName: {
        type: String,
        required: true,
    },

    petBreed: {
        type: String,
        required: true,
    },

    petName: {
        type: String,
        required: true,
    },

    servicePrice: {
        type: Number,
        required: true,
    },

    serviceTime: {
        type: Number,
        required: true,
    },

    bookedTime: {
        type: String,
        required: true,
    },

    status: {
        type: String as PropType<'active' | 'cancelled' | 'ready'>,
        required: true,
    },

    position: {
        type: String as PropType<'first' | 'middle' | 'last' | 'alone'>,
        default: 'alone',
    },
});

const classList = computed(() => [
    $style[`--${props.status}-status`],
    $style[`--${props.position}-position`],
]);

function onMouseEnter(event: Event) {
    const target = event.target as HTMLDivElement;

    if (target.clientHeight < target.scrollHeight) {
        target.style.height = target.scrollHeight + 'px';

        if (target.parentElement) {
            target.parentElement.style.zIndex = '3';
        }
    }
}

function onMouseLeave(event: Event) {
    const target = event.target as HTMLDivElement;

    target.style.height = 'var(--record-height)';

    if (target.parentElement) {
        target.parentElement.style.zIndex = '';
    }
}
</script>

<template>
    <div class="SalonsMasterRecord">
        <div
            :class="[classList, $style.wrapper]"
            @mouseenter="onMouseEnter"
            @mouseleave="onMouseLeave"
        >
            <div :class="$style.inner">
                <h6>{{ serviceName }}</h6>

                <div class="text-x-small">
                    <b>{{ petName }}</b> {{ petBreed }}
                </div>

                <h5 :class="$style.price">{{ servicePrice }} ₽</h5>
            </div>
        </div>
    </div>
</template>

<style lang="scss" module>
.wrapper {
    overflow: hidden;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: var(--record-height);
    color: var(--ui-white-color);
    cursor: pointer;
    user-select: none;

    &.--active-status {
        background-color: var(--ui-success-color);
    }

    &.--cancelled-status {
        background-color: var(--ui-error-color);
    }

    &.--ready-status {
        background-color: var(--ui-additional-color);
    }

    &.--alone-position {
        border-radius: calc(var(--ui-unit) * 4);
    }

    &.--first-position {
        border-radius: calc(var(--ui-unit) * 4) calc(var(--ui-unit) * 4) 0 0;
    }

    &.--middle-position {
        border-radius: 0;
    }

    &.--last-position {
        border-radius: 0 0 calc(var(--ui-unit) * 4) calc(var(--ui-unit) * 4);
    }
}

.inner {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    row-gap: var(--ui-unit);
    padding: calc(var(--ui-unit) * 5) calc(var(--ui-unit) * 6);
}

.price {
    margin-top: auto;
    padding-top: calc(var(--ui-unit) * 2);
}
</style>

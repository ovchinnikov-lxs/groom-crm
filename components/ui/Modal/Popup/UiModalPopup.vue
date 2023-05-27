<script setup lang="ts">
import { modalProps, useModal } from '~/composables/modal';

defineEmits(['close']);
const props = defineProps({
    ...modalProps,
});

const { classList } = useModal(props);
</script>

<template>
    <div class="UiModalPopup" :class="classList">
        <div class="UiModalPopup__overlay" @click.self="$emit('close')">
        </div>

        <div class="UiModalPopup__inner">
            <slot name="default"></slot>
        </div>
    </div>
</template>

<style lang="scss">
.UiModalPopup {
    $popup: &;

    display: flex;
    align-items: center;
    justify-content: center;

    &.modal-in-enter-from,
    &.modal-in-enter-to,
    &.--is-visible {
        #{$popup} {
            &__overlay {
                opacity: 0;
                animation: overlayIn .2s ease forwards;
            }

            &__inner {
                opacity: 0;
                transform: scale(.8);
                animation: innerIn .3s ease .1s forwards;
            }
        }
    }

    &.modal-in-leave-from,
    &.modal-in-leave-to,
    &.modal-out-in-leave-from,
    &.modal-out-in-leave-to,
    &.--is-hidden {
        #{$popup} {
            &__overlay {
                opacity: 1;
                animation: overlayOut .2s ease forwards;
            }

            &__inner {
                opacity: 1;
                transform: scale(1);
                animation: innerOut .2s ease forwards;
            }
        }
    }

    &.--small-size {
        #{$popup} {
            &__inner {
                width: calc(var(--ui-col) * 14);
            }
        }
    }

    &.--medium-size {
        #{$popup} {
            &__inner {
                width: calc(var(--ui-col) * 25);
            }
        }
    }

    &__overlay {
        position: absolute;
        z-index: 1;
        width: 100%;
        height: 100%;
        background-color: rgba(var(--ui-white-color-rgb), .5);
        will-change: opacity;
    }

    &__inner {
        position: relative;
        z-index: 2;
        overflow: hidden;
        border-radius: calc(var(--ui-unit) * 2.5);
        background-color: var(--ui-white-color);
        will-change: transform;
        box-shadow: var(--ui-box-shadow);
    }
}

@keyframes overlayIn {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

@keyframes overlayOut {
    0% {
        opacity: 1;
    }

    100% {
        opacity: 0;
    }
}

@keyframes innerIn {
    0% {
        opacity: 0;
        transform: scale(.8);
    }

    100% {
        opacity: 1;
        transform: scale(1);
    }
}

@keyframes innerOut {
    0% {
        opacity: 1;
        transform: scale(1);
    }

    100% {
        opacity: 0;
        transform: scale(.8);
    }
}
</style>

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

            <UiIcon
                name="ui/close"
                size="large"
                class="UiModalPopup__close"
                @click="$emit('close')"
            />

            <div class="UiModalPopup__container">
                <slot name="default"></slot>
            </div>

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

    &.--medium-size {
        #{$popup} {
            &__inner {
                width: calc(var(--ui-col) * 25);
                min-height: calc(var(--ui-unit) * 125);
                max-height: calc(var(--ui-col) * 20);
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
        padding: calc(var(--ui-unit) * 8) calc(var(--ui-unit) * 12);
        border-radius: 10px;
        background-color: var(--ui-white-color);
        will-change: transform;
        box-shadow: rgba(var(--ui-black-color-rgb), .04) 0 calc(var(--ui-unit) * 2) calc(var(--ui-unit) * 6) 0;
    }

    &__close {
        position: absolute;
        top: calc(var(--ui-unit) * 6);
        right: calc(var(--ui-unit) * 6);
        transition: transform .3s ease;
        cursor: pointer;

        @include hover {
            transform: rotate(90deg);
        }
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
        transform: scale(1.2);
    }
}
</style>

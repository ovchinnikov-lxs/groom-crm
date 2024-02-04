<script setup lang="ts">
import type { IModalProps } from '~/types/modal';

defineEmits(['close']);
const props = withDefaults(defineProps<IModalProps>(), MODAL_DEFAULT_PROPS);

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
    transition: all .3s var(--ui-cubic-bezier);

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
        background-color: rgba(var(--ui-black-color-rgb), .8);
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

    &.ui-modal-enter-from,
    &.ui-modal-enter-to {
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

    &.ui-modal-leave-from,
    &.ui-modal-leave-to {
        #{$popup} {
            &__overlay {
                opacity: 1;
                animation: overlayOut .2s ease forwards;
            }

            &__inner {
                opacity: 1;
                transform: scale(1);
                animation: innerOut .3s ease forwards;
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
            transform: scale(.8);
        }
    }
}
</style>

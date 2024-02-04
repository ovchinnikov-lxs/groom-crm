<script setup lang="ts">
import type { IModalConfirm } from '~/types/modal';


const emit = defineEmits<{
    close: [boolean];
}>();

const props = withDefaults(defineProps<IModalConfirm>(), {
    ...MODAL_DEFAULT_PROPS,
    buttonYes: 'Да',
    buttonNo: 'Нет',
});

const { classList } = useModal(props);
</script>

<template>
    <div class="UiModalConfirm" :class="classList">
        <div class="UiModalConfirm__overlay" @click.self="emit('close', false)"></div>

        <div class="UiModalConfirm__inner">
            <slot name="default">
                {{ title }}

                <div class="UiModalConfirm__actions">
                    <UiButton class="UiModalConfirm__button" @click="emit('close', true)">
                        {{ buttonYes }}
                    </UiButton>

                    <UiButton
                        outline
                        color="additional"
                        class="UiModalConfirm__button"
                        @click="emit('close', false)"
                    >
                        {{ buttonNo }}
                    </UiButton>
                </div>
            </slot>
        </div>
    </div>
</template>

<style lang="scss">
.UiModalConfirm {
    $confirm: &;

    display: flex;
    align-items: center;
    justify-content: center;
    transition: all .3s var(--ui-cubic-bezier);

    &.--small-size {
        #{$confirm} {
            &__inner {
                width: calc(var(--ui-col) * 10);
            }
        }
    }

    &.--medium-size {
        #{$confirm} {
            &__inner {
                width: calc(var(--ui-col) * 12);
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
        display: flex;
        flex-direction: column;
        row-gap: 12px;
        padding: 12px;
        border-radius: calc(var(--ui-unit) * 2.5);
        background-color: var(--ui-white-color);
        will-change: transform;
        box-shadow: var(--ui-box-shadow);
    }

    &__actions {
        display: flex;
        align-items: center;
        column-gap: 12px;
    }

    &__button {
        flex: 1 1;
    }

    &.ui-modal-enter-from,
    &.ui-modal-enter-to {
        #{$confirm} {
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
        #{$confirm} {
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

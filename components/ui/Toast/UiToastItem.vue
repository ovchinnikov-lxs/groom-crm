<template>
    <div class="UiToastItem" :class="classList">
        <div class="UiToastItem__wrapper">
            <UiIcon
                :name="iconName"
                size="large"
                class="UiToastItem__icon"
            />

            <div class="UiToastItem__info">
                <h5 v-if="title" class="UiToastItem__title">
                    {{ title }}
                </h5>

                <div class="UiToastItem__text">
                    {{ text }}
                </div>
            </div>

            <UiIcon
                v-if="allowClose"
                name="ui/close"
                class="UiToastItem__close"
                @click="onClose"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import type { IToast } from '~/types/toast';

const props = withDefaults(defineProps<IToast>(), {
    allowClose: true,
    time: 5000,
    size: 'medium',
});

const emit = defineEmits<{
    remove: [void]
}>();

const classList = computed(() => [
    `--${props.type}-type`,
]);

const iconName = computed(() => ({
    success: 'ui/info',
    error: 'ui/error',
    warning: 'ui/warning',
    info: 'ui/info',
}[props.type]));

let timeout: NodeJS.Timeout;

function onClose() {
    clearTimeout(timeout);
    emit('remove');
}

onMounted(() => {
    timeout = setTimeout(() => {
        onClose();
    }, props.time);
});

</script>

<style lang="scss">
.UiToastItem {
    $item: &;

    &__wrapper {
        display: flex;
        align-items: stretch;
        width: 100%;
        height: 100%;
        min-height: 42px;
        column-gap: 12px;
        padding: 8px 12px;
        border-top-left-radius: 8px;
        border-bottom-left-radius: 8px;
        background-color: var(--ui-white-color);
        pointer-events: auto;
        user-select: none;
        box-shadow: var(--ui-box-shadow);
    }

    &__icon {
        flex-shrink: 0;
    }

    &__info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        row-gap: 4px;
    }

    &__text {
        font-size: 12px;
    }

    &__close {
        flex-shrink: 0;
        margin-left: auto;
        transition: transform .3s ease;
        cursor: pointer;

        @include hover {
            transform: rotate(90deg);
        }
    }

    &.--success-type {
        #{$item} {
            &__icon {
                color: var(--ui-success-color);
            }
        }
    }

    &.--error-type {
        #{$item} {
            &__icon {
                color: var(--ui-error-color);
            }
        }
    }

    &.--warning-type {
        #{$item} {
            &__icon {
                color: var(--ui-warning-color);
            }
        }
    }

    &.--info-type {
        #{$item} {
            &__icon {
                color: var(--ui-additional-color);
            }
        }
    }
}
</style>

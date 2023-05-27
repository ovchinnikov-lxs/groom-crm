<script setup lang="ts">
// UiKit Components
import { UiFileInput } from '@ovchinnikov-lxs-frontend/ui-kit';

// Types
import type { PropType } from 'vue';
import type { TypeSize } from 'assets/ts/types';
import { getBase64UrlFromImage } from 'assets/ts/utils/image-utils';
type TypeValue = string | null | File;

const props = defineProps({
    isImage: {
        type: Boolean,
        default: false,
    },

    size: {
        type: String as PropType<TypeSize>,
        default: 'medium',
    },

    color: {
        type: String,
        default: 'primary',
    },

    modelValue: {
        type: [String, null] as PropType<TypeValue>,
        default: null,
    },
});

const actualValue = ref<TypeValue>(null);
watch(() => props.modelValue, (val: TypeValue) => {
    actualValue.value = val;
}, {
    immediate: true,
});

const $emit = defineEmits<{(e: 'update:modelValue', value: TypeValue): void }>();

function emitInput() {
    $emit('update:modelValue', actualValue.value);
}

async function onInput(file: File) {
    if (!file) {
        return false;
    }

    const res = await getBase64UrlFromImage(file);

    if (typeof res === 'string') {
        actualValue.value = res;
        emitInput();
    }
}

function onRemove() {
    actualValue.value = null;
    emitInput();
}

const classList = computed(() => [
    {
        '--is-image': props.isImage,
    },
]);

const buttonSize = computed(() => {
    switch (props.size) {
        case 'medium':
            return 'x-small';
    }
});
</script>

<template>
    <UiFileInput
        v-bind="$attrs"
        v-model="actualValue"
        :size="size"
        :color="color"
        :class="classList"
        @update:model-value="onInput"
        @remove="onRemove"
    >
        <template #data="props">
            <template v-if="isImage">
                <div class="UiFileInput__image-placeholder">
                    <UiIcon name="ui/camera" size="x-large"/>
                    <div v-if="props.drop">Drop here</div>
                </div>

                <UiImage
                    v-if="props.urls && props.urls[0]"
                    :src="props.urls[0]"
                    class="UiFileInput__image"
                />
            </template>
        </template>

        <template #input="props">
            <UiButton
                type="button"
                :color="color"
                :size="buttonSize"
                @click="props.onClick"
            >
                {{ props.label }}
            </UiButton>
        </template>

        <template #remove="props">
            <UiButton
                type="button"
                color="error"
                outline
                :disabled="!actualValue"
                :size="buttonSize"
                @click="props.onClick"
            >
                {{ props.label }}
            </UiButton>
        </template>
    </UiFileInput>
</template>

<style lang="scss">
.UiFileInput {
    $input: &;

    &__wrapper {
        display: flex;
        flex-direction: column;
    }

    &__inner {
        display: flex;
    }

    &__control {
        display: flex;
    }

    &.--is-image {
        #{$input} {
            &__data {
                position: relative;
                overflow: hidden;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                transform: translate3d(0, 0, 0);
            }

            &__control {
                flex-direction: column;
                justify-content: flex-end;
            }

            &__image {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
            }
        }
    }

    &.--medium-size {
        #{$input} {
            &__wrapper {
                row-gap: calc(var(--ui-unit) * 2);
            }

            &__inner {
                column-gap: calc(var(--ui-unit) * 2);
            }

            &__data {
                border-radius: calc(var(--ui-unit) * 2);
            }

            &__info {
                padding-left: calc(var(--ui-unit) * 5);
                font-size: calc(var(--ui-unit) * 3);
            }
        }

        &.--is-image {
            #{$input} {
                &__data {
                    width: calc(var(--ui-unit) * 25);
                    height: calc(var(--ui-unit) * 25);
                    row-gap: calc(var(--ui-unit) * 2);
                }

                &__image-placeholder {
                    width: calc(var(--ui-unit) * 8);
                    height: calc(var(--ui-unit) * 8);
                }

                &__control {
                    row-gap: calc(var(--ui-unit) * 2);
                }
            }
        }
    }

    &.--primary-color {
        &.--is-image {
            #{$input} {
                &__data {
                    background-color: var(--ui-additional-light-color);
                    color: var(--ui-light-gray-color);
                }
            }
        }

        #{$input} {
            &__info {
                color: var(--ui-secondary-color);
            }
        }
    }

    &.--size-error {
        #{$input} {
            &__info-size {
                color: var(--ui-error-color);
            }
        }
    }
}
</style>

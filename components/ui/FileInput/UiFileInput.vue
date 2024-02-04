<script setup lang="ts">
// UiKit Components
// import { UiFileInput } from '@ovchinnikov-lxs-frontend/ui-kit';

// Types
import type { PropType } from 'vue';
import type { TypeSize } from '~/types';
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

// const $emit = defineEmits<{(e: 'update:modelValue', value: TypeValue): void }>();

// function emitInput() {
//     $emit('update:modelValue', actualValue.value);
// }

// async function onInput(file: TypeValue) {
//     if (!file) {
//         return false;
//     }
//
//     if (typeof file === 'string') {
//         actualValue.value = file;
//         emitInput();
//         return false;
//     }
//
//     const res = await getBase64UrlFromImage(file);
//
//     if (typeof res === 'string') {
//         actualValue.value = res;
//         emitInput();
//     }
// }
//
// function onRemove() {
//     actualValue.value = null;
//     emitInput();
// }
//
// const classList = computed(() => [
//     {
//         '--is-image': props.isImage,
//     },
// ]);
//
// const buttonSize = computed(() => {
//     switch (props.size) {
//         case 'medium':
//             return 'x-small';
//     }
// });
//
// const imageSrc = computed(() => (urls: (string | File)[]): string | undefined => {
//     const [firstEl] = urls;
//
//     if (!firstEl || typeof firstEl !== 'string') {
//         return undefined;
//     }
//
//     return firstEl;
// });
</script>

<template>
    <!--    <UiFileInput-->
    <!--        v-bind="$attrs"-->
    <!--        v-model="actualValue"-->
    <!--        :size="size"-->
    <!--        :color="color"-->
    <!--        :class="classList"-->
    <!--        @update:model-value="onInput"-->
    <!--        @remove="onRemove"-->
    <!--    >-->
    <!--        <template #data="dataProps">-->
    <!--            <template v-if="isImage">-->
    <!--                <div class="UiFileInput__image-placeholder">-->
    <!--                    <UiIcon name="ui/camera" size="x-large"/>-->
    <!--                    <div v-if="dataProps.drop">Drop here</div>-->
    <!--                </div>-->

    <!--                <UiImage-->
    <!--                    v-if="imageSrc(dataProps.urls)"-->
    <!--                    :src="imageSrc(dataProps.urls)"-->
    <!--                    class="UiFileInput__image"-->
    <!--                />-->
    <!--            </template>-->
    <!--        </template>-->

    <!--        <template #input="inputProps">-->
    <!--            <UiButton-->
    <!--                type="button"-->
    <!--                :color="color"-->
    <!--                :size="buttonSize"-->
    <!--                @click="inputProps.onClick"-->
    <!--            >-->
    <!--                {{ inputProps.label }}-->
    <!--            </UiButton>-->
    <!--        </template>-->

    <!--        <template #remove="removeProps">-->
    <!--            <UiButton-->
    <!--                type="button"-->
    <!--                color="error"-->
    <!--                outline-->
    <!--                :disabled="!actualValue"-->
    <!--                :size="buttonSize"-->
    <!--                @click="removeProps.onClick"-->
    <!--            >-->
    <!--                {{ removeProps.label }}-->
    <!--            </UiButton>-->
    <!--        </template>-->
    <!--    </UiFileInput>-->
    <div>file input</div>
    <!--    TODO: TODO! это ui-kit-->
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

<script setup lang="ts">
// UiKit Components
import { UiPopover } from '@ovchinnikov-lxs-frontend/ui-kit';

import type { PropType } from 'vue';
import type { TypeSize } from 'assets/ts/types';

// Utils
import { leadingZero } from 'assets/ts/utils/format-utils';

const props = defineProps({
    modelValue: {
        type: [String, null] as PropType<string | null>,
        default: null,
    },

    startHour: {
        type: Number,
        default: 0,
        validator: (v: number): boolean => v >= 0 && v < 24,
    },

    endHour: {
        type: Number,
        default: 24,
        validator: (v: number): boolean => v > 0 && v <= 24,
    },

    period: {
        type: Number,
        default: 10,
        validator: (v: number): boolean => v > 0 && v <= 60,
    },

    size: {
        type: String as PropType<TypeSize>,
        default: 'medium',
    },

    color: {
        type: String,
        default: 'additional-light',
    },

    error: {
        type: [String, Number, null, Boolean] as PropType<string | number | null | boolean | Ref<string>>,
        default: null,
    },

    placeholder: {
        type: String,
        default: 'Введите время',
    },
});

const actualValue = reactive<{
    hour: string | number;
    minutes: string | number;
}>({
    hour: '',
    minutes: '',
});
const $emit = defineEmits<{(e: 'update:modelValue', value: string): void }>();


const isOpened = ref(false);

watch(() => props.modelValue, (value: string | null) => {
    const [hour, minutes] = value?.split(':') || ['', ''];

    actualValue.hour = hour;
    actualValue.minutes = minutes;
}, {
    immediate: true,
});

const hourOptions = computed(() => Array.from({ length: props.endHour - props.startHour }, (_, index) => ({ id: props.startHour + index, name: String(leadingZero(props.startHour + index)) })));
const minutesOptions = computed(() => Array.from({ length: Math.floor(60 / props.period) }, (_, index) => ({ id: index * props.period, name: String(leadingZero(index * props.period)) })));

const classList = computed(() => [
    [`--${props.size}-size`],
    [`--${props.color}-color`],
]);

function onEmitInput() {
    $emit('update:modelValue', Object.values(actualValue).join(':'));
}

function onHourSelect(hour: number) {
    actualValue.hour = leadingZero(hour);
    onEmitInput();
}
function onMinuteSelect(minutes: number) {
    actualValue.minutes = leadingZero(minutes);
    onEmitInput();
}
</script>

<template>
    <UiPopover
        v-model="isOpened"
        parent-width
        :size="size"
        :color="color"
        :error="String(error)"
        class="UiTimeSelect"
    >
        <template #top>
            <UiSelectHeader
                :is-opened="isOpened"
                :size="size"
                :color="color"
                :error="error"
            >
                <template #default>
                    <template v-if="!actualValue.hour || !actualValue.minutes">
                        {{ placeholder }}
                    </template>
                    <template v-else>
                        {{ actualValue.hour }}&nbsp;:&nbsp;{{ actualValue.minutes }}
                    </template>
                </template>
            </UiSelectHeader>
        </template>

        <template #bottom>
            <div :class="classList" class="UiTimeSelect__bottom">
                <div class="UiTimeSelect__half">
                    <UiSelectOptions
                        v-for="hour in hourOptions"
                        :key="hour.id"
                        :size="size"
                        :color="color"
                        :option-id="hour.id"
                        :option-name="hour.name"
                        :active="hour.name === actualValue.hour"
                        @click="onHourSelect(hour.id)"
                    />
                </div>
                <div class="UiTimeSelect__half">
                    <UiSelectOptions
                        v-for="minutes in minutesOptions"
                        :key="minutes.id"
                        :size="size"
                        :color="color"
                        :option-id="minutes.id"
                        :option-name="minutes.name"
                        :active="minutes.name === actualValue.minutes"
                        @click="onMinuteSelect(minutes.id)"
                    />
                </div>
            </div>
        </template>
    </UiPopover>
</template>

<style lang="scss">
.UiTimeSelect {
    &.--medium-size {
        width: calc(var(--ui-unit) * 30);

        .UiSelectHeader {
            width: 100%;
        }
    }

    &__bottom {
        position: relative;
        overflow: hidden;
        display: flex;
        column-gap: var(--ui-unit);

        &:before,
        &:after {
            content: '';
            position: absolute;
            left: 0;
            width: 100%;
            pointer-events: none;
        }

        &:before {
            top: 0;
            background: linear-gradient(to bottom, rgba(var(--ui-additional-light-color-rgb), 1), rgba(var(--ui-additional-light-color-rgb), 0));
        }

        &:after {
            bottom: 0;
            background: linear-gradient(to top, rgba(var(--ui-additional-light-color-rgb), 1), rgba(var(--ui-additional-light-color-rgb), 0));
        }

        &.--medium-size {
            height: calc(var(--ui-col) * 6);
            margin-top: calc(var(--ui-unit) * 2);
            padding: 0 calc(var(--ui-unit) * 3);
            border-radius: calc(var(--ui-unit) * 2.5);

            &:before,
            &:after {
                height: calc(var(--ui-unit) * 6);
            }

            .UiTimeSelect__half {
                flex-shrink: 0;
                width: calc(50% - var(--ui-unit) / 2);
            }
        }

        &.--additional-light-color {
            background-color: var(--ui-additional-light-color);
            box-shadow: var(--ui-box-shadow);
        }
    }

    &__half {
        @include hide-scrollbar;

        overflow: auto;
        padding: calc(var(--ui-unit) * 3) 0;

        .UiSelectOption {
            display: flex;
            justify-content: center;
            text-align: center;
        }
    }
}
</style>

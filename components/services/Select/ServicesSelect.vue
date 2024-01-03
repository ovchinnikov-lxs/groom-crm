<script setup lang="ts">
// UiKit
import { UiPopover } from '@ovchinnikov-lxs-frontend/ui-kit';

import type { PropType } from 'vue';
import _ from 'lodash';
import type { IService } from '~/types/services';

const props = defineProps({
    modelValue: {
        type: Array as PropType<string[]>,
        default: () => [],
    },

    breeds: {
        type: Array as PropType<string[]>,
        default: () => [],
    },

    placeholder: {
        type: String,
        default: '',
    },

    disabled: {
        type: Boolean,
        default: false,
    },
});
const emit = defineEmits<{
    'update:modelValue': [value: string[]],
}>();

// const suggestValue = ref('');
// const serviceList = ref<IService[]>([]);
// const actualValue = ref<IService[]>([]);

const suggestValue = ref('');
const actualValue = ref<string[]>([]);

watch(props.modelValue, (val: string[]) => {
    actualValue.value = [...val];
}, { immediate: true });

async function onSelect(id: string) {
    actualValue.value.push(id);
    suggestValue.value = '';
    await fetchServices(true);
    emit('update:modelValue', actualValue.value);
}

function onRemove(id: string) {
    actualValue.value = actualValue.value.filter(i => i !== id);
    emit('update:modelValue', actualValue.value);
}

// STATE SECTION
const inputFocused = ref(false);
const inputRef = ref<HTMLInputElement | null>(null);

function onFocusInput() {
    if (!inputRef.value) {
        return false;
    }

    inputRef.value.focus();
}
function onFocusIn() {
    inputFocused.value = true;
}
function onFocusOut() {
    inputFocused.value = false;
    emit('update:modelValue', actualValue.value);
}

// OPTIONS SECTION
const optionsDict = ref<{
    [key: string]: IService
}>({});
const optionsList = ref <IService[]>([]);
const actualOptionsList = computed(() => optionsList.value.filter(i => !actualValue.value.includes(i.id) && i.name.includes(suggestValue.value)));

async function fetchServices(initial = false) {
    try {
        const [breedId] = props.breeds;
        const { $api } = useNuxtApp();
        const { data } = await $api.services.getList({
            key: 'serviceOptionsList',
            params: {
                ...suggestValue.value && { search: suggestValue.value },
                breedId,
            },
        });
        optionsList.value = data.value;
        if (initial) {
            optionsDict.value = data.value.reduce((acc: object, option: IOption) => ({
                ...acc,
                [option.id]: option,
            }), {});
        }
    } catch (e) {
        console.log(e);
    }
};

onMounted(() => {
    fetchServices(true);
});

watch(() => props.breeds, (val: string[]) => {
    if (val.length) {
        fetchServices(true);
    }
}, {
    deep: true,
});

async function onInput(event: Event) {
    suggestValue.value = (event.target as HTMLInputElement).value;
    await fetchServices();
}

const debouncedInput = _.debounce(onInput, 200);
const actualValueOptions = computed(() => actualValue.value.map(id => optionsDict.value[id]));
</script>

<template>
    <div class="ServicesSelect">
        <div :class="$style.wrapper">

            <UiPopover
                :model-value="Boolean(inputFocused && actualOptionsList.length)"
                parent-width
                prevent-control
                :disabled="disabled"
                :class="$style.popover"
            >
                <template #top>
                    <div :class="$style.header" @click="onFocusInput">
                        <input
                            ref="inputRef"
                            :placeholder="placeholder"
                            :value="suggestValue"
                            :class="$style.input"
                            @input="debouncedInput"
                            @focusin="onFocusIn"
                            @focusout="onFocusOut"
                        />
                    </div>
                </template>
                <template #bottom>
                    <div :class="$style.list">
                        <ServicesSelectItem
                            v-for="item in actualOptionsList"
                            :id="item.id"
                            :key="item.id"
                            :name="item.name"
                            :duration="item.duration"
                            :description="item.description"
                            :preview="item.preview"
                            :price="item.price"
                            :active="actualValue.includes(item.id)"
                            :breeds="item.breeds"
                            :class="$style.listItem"
                            @remove="onRemove"
                            @click="onSelect(item.id)"
                        />
                    </div>
                </template>
            </UiPopover>

            <div v-if="optionsList.length && actualValueOptions.length" :class="$style.selected">
                <ServicesSelectItem
                    v-for="item in actualValueOptions"
                    :id="item.id"
                    :key="item.id"
                    :name="item.name"
                    :duration="item.duration"
                    :description="item.description"
                    :preview="item.preview"
                    :price="item.price"
                    :breeds="item.breeds"
                    active
                    @remove="onRemove"
                />

                <b :class="$style.amount">
                    Итого: {{ actualValueOptions.reduce((acc, cur) => acc+=cur.price, 0) }}&nbsp;₽
                </b>
            </div>

        </div>
    </div>
</template>

<style lang="scss" module>
.wrapper {
    display: flex;
    flex-direction: column;
    row-gap: calc(var(--ui-unit) * 4);
}

.popover {
    &:global(.--is-disabled) {
        opacity: .4;
        pointer-events: none;
    }
}

.header {
    width: 100%;
    padding: calc(var(--ui-unit) * 4) calc(var(--ui-unit) * 5);
    border-radius: calc(var(--ui-unit) * 2.5);
    border-color: var(--ui-white-color);
    border-style: solid;
    border-width: 1px;
    background-color: var(--ui-additional-light-color);
    font-size: calc(var(--ui-unit) * 3.5);
    line-height: 125%;
    color: var(--ui-black-color);
    transition: all .3s ease;
    cursor: text;
}

.input {
    width: 100%;
    margin: 0;
    padding: 0;
    border: none;
    background-color: transparent;
    outline: none;
}

.list {
    @include scrollbar;

    display: flex;
    flex-direction: column;
    max-height: calc(var(--ui-col) * 6);
    row-gap: calc(var(--ui-unit) * 3);
    margin-top: calc(var(--ui-unit) * 2);
    padding: calc(var(--ui-unit) * 4);
    border-radius: calc(var(--ui-unit) * 2.5);
    background-color: var(--ui-additional-light-color);
    box-shadow: var(--ui-box-shadow);
}

.listItem {
    cursor: pointer;
}

.selected {
    display: flex;
    flex-direction: column;
    row-gap: calc(var(--ui-unit) * 3);
}

.amount {
    margin-left: auto;
    padding: calc(var(--ui-unit) * 2) calc(var(--ui-unit) * 3);
    border-radius: calc(var(--ui-unit) * 3);
    background-color: var(--ui-additional-color);
    color: var(--ui-white-color);
}
</style>

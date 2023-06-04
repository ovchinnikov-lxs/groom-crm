<script setup lang="ts">
// UiKit
import { UiPopover } from '@ovchinnikov-lxs-frontend/ui-kit';

import type { PropType } from 'vue';
import _ from 'lodash';

type ValueType = Array<string>;

const props = defineProps({
    modelValue: {
        type: Array as PropType<ValueType>,
        default: () => [],
    },

    placeholder: {
        type: String,
        default: '',
    },

    error: {
        type: String,
        default: '',
    },
});

// VALUE SECTION
const $emit = defineEmits<{
    'update:modelValue': [value: ValueType],
}>();

const suggestValue = ref('');
const actualValue = ref<ValueType>([]);
watch(props.modelValue, (val: ValueType) => {
    actualValue.value = [...val];
}, { immediate: true });

async function onSelect(id: string) {
    actualValue.value.push(id);
    suggestValue.value = '';
    await fetchOptions(true);
    $emit('update:modelValue', actualValue.value);
}

function onRemove(id: string) {
    actualValue.value = actualValue.value.filter(i => i !== id);
    $emit('update:modelValue', actualValue.value);
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
    $emit('update:modelValue', actualValue.value);
}

// OPTIONS SECTION
const optionsDict = ref({});
const optionsList = ref([]);
const actualOptionsList = computed(() => optionsList.value.filter(i => !actualValue.value.includes(i.id) && i.name.includes(suggestValue.value)));
async function fetchOptions(initial = false) {
    const { $api } = useNuxtApp();

    const { data } = await $api.breeds.getList({
        key: 'breedsOptions',
        params: {
            ...suggestValue.value && { search: suggestValue.value },
        },
    });

    optionsList.value = data.value.rows;
    if (initial) {
        optionsDict.value = data.value.rows.reduce((acc: object, option: object) => ({
            ...acc,
            [option.id]: option,
        }), {});
    }
}

onMounted(async () => {
    await fetchOptions(true);
});

async function onInput(event: Event) {
    suggestValue.value = (event.target as HTMLInputElement).value;
    await fetchOptions();
}

const debouncedInput = _.debounce(onInput, 200);
const actualValueOptions = computed(() => actualValue.value.map(id => ({
    id,
    name: optionsDict.value[id]?.name || '',
    preview: optionsDict.value[id]?.preview || '',
})));
</script>

<template>
    <UiPopover
        :error="error"
        :model-value="Boolean(inputFocused && actualOptionsList.length)"
        parent-width
        prevent-control
        :class="$style.BreedsSelect"
    >
        <template #top>
            <div :class="$style.header" @click="onFocusInput">
                <div v-if="actualValueOptions.length" :class="$style.selected">
                    <BreedsSelectItem
                        v-for="item in actualValueOptions"
                        :key="item.id"
                        :preview="item.preview"
                        :name="item.name"
                        @close="onRemove(item.id)"
                    />
                </div>

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
                <div
                    v-for="item in actualOptionsList"
                    :key="item.id"
                    :class="[$style.item, { [$style['--is-active']]: actualValue.includes(item.id) }]"
                    @click="onSelect(item.id)"
                >
                    {{ item.name }}
                </div>
            </div>
        </template>
    </UiPopover>
</template>

<style module lang="scss">
.BreedsSelect {
    &:global(.--is-error) {
        .header {
            border-color: var(--ui-error-color);
        }
    }
}

.header {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    column-gap: calc(var(--ui-unit) * 2);
    row-gap: calc(var(--ui-unit) * 3);
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

.selected {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    column-gap: calc(var(--ui-unit) * 3);
    row-gap: calc(var(--ui-unit) * 2);
}

.input {
    flex-grow: 1;
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
    margin-top: calc(var(--ui-unit) * 2);
    border-radius: calc(var(--ui-unit) * 2.5);
    background-color: var(--ui-additional-light-color);
    box-shadow: var(--ui-box-shadow);
}

.item {
    padding: calc(var(--ui-unit) * 3) calc(var(--ui-unit) * 5);
    cursor: pointer;

    @include hover {
        background-color: rgba(var(--ui-additional-color-rgb), .32);
    }
}
</style>

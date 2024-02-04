<script setup lang="ts">
// UiKit
import { UiPopover } from '@ovchinnikov-lxs-frontend/ui-kit';

import _ from 'lodash';
import type { Tables } from '~/types/supabase';

interface IProps {
    modelValue: string[];
    placeholder?: string;
    error?: string;
    multiple?: boolean;
}

type IOption = Tables<'Breed'>;

const props = withDefaults(defineProps<IProps>(), {
    placeholder: '',
    error: '',
    multiple: false,
});

// VALUE SECTION
const emit = defineEmits<{
    'update:modelValue': [value: IProps['modelValue']],
}>();

const suggestValue = ref('');
const actualValue = ref<IProps['modelValue']>([]);

watch(props.modelValue, (val: IProps['modelValue']) => {
    actualValue.value = [...val];
}, { immediate: true });

async function onSelect(id: string) {
    actualValue.value.push(id);
    suggestValue.value = '';
    await fetchOptions(true);
    emit('update:modelValue', actualValue.value);
}

function onRemove(id: string) {
    actualValue.value = actualValue.value.filter(i => i !== id);
    emit('update:modelValue', actualValue.value);
}

// STATE SECTION
const inputFocused = ref(false);
const inputRef = ref<HTMLInputElement | null>(null);
const listRef = ref<HTMLDivElement>();

function onFocusInput() {
    if (!inputRef.value) {
        return false;
    }

    inputRef.value.focus();
}
function onFocusIn() {
    inputFocused.value = true;
}
function onFocusOut(input: boolean) {
    if (input && props.multiple) {
        return false;
    }

    inputFocused.value = false;
    emit('update:modelValue', actualValue.value);
}

// OPTIONS SECTION
const optionsDict = ref<{
    [key: IOption['id']]: IOption;
}>({});

const optionsList = ref <IOption[]>([]);
const actualOptionsList = computed(() => optionsList.value.filter(i => !actualValue.value.includes(i.id) && i.name.includes(suggestValue.value)));
async function fetchOptions(initial = false) {
    try {
        const storeCompany = useStoreCompany();
        const { data } = await $fetch('/api/breeds/search', {
            params: {
                company_id: storeCompany.detail.id,
                search: suggestValue.value,
            },
        });

        if (!data) {
            return false;
        }

        optionsList.value = data;

        if (initial) {
            optionsDict.value = data.reduce((acc: object, option: IOption) => ({
                ...acc,
                [option.id]: option,
            }), {});
        }
    } catch (e) {
        console.error('BREEDS_SELECT:FETCH_OPTIONS:', e);
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
    image: optionsDict.value[id]?.image || '',
})));
// TODO: Чет тут все плохо с поповеровм, кажется надо переделывать его
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
                    <LazyBreedsSelectItem
                        v-for="item in actualValueOptions"
                        :key="item.id"
                        :image="item.image"
                        :name="item.name"
                        @close="onRemove(item.id)"
                    />
                </div>

                <input
                    v-if="!actualValueOptions.length || multiple && actualValueOptions.length"
                    ref="inputRef"
                    :placeholder="placeholder"
                    :value="suggestValue"
                    :class="$style.input"
                    @input="debouncedInput"
                    @focusin="onFocusIn"
                    @focusout="onFocusOut(true)"
                />
            </div>
        </template>
        <template #bottom>
            <div
                ref="listRef"
                tabindex="0"
                :class="$style.list"
                @focusout="onFocusOut(false)"
            >
                <div
                    v-for="item in actualOptionsList"
                    :key="item.id"
                    :class="[$style.item, { [$style['--is-active']]: actualValue.includes(item.id) }]"
                    @click="onSelect(item.id)"
                >
                    <UiImage :src="item.image" :class="$style.image"/>

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
    display: flex;
    align-items: center;
    column-gap: calc(var(--ui-unit) * 3);
    padding: calc(var(--ui-unit) * 3) calc(var(--ui-unit) * 5);
    cursor: pointer;

    @include hover {
        background-color: rgba(var(--ui-additional-color-rgb), .32);
    }
}

.image {
    overflow: hidden;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    transform: translate3d(0, 0, 0);
}
</style>

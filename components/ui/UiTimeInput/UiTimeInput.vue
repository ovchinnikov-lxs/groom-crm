<script setup lang="ts">
const props = defineProps({
    modelValue: {
        type: String,
        default: '',
    },
});

const actualValue = reactive({
    hour: '',
    minutes: '',
});

watch(() => props.modelValue, (value: string) => {
    const [hour, minutes] = value.split(':');

    actualValue.hour = hour;
    actualValue.minutes = minutes;
}, {
    immediate: true,
});

</script>

<template>
    <UiSelect>
        <template #header-component="headerProps">
            <UiSelectHeader v-bind="headerProps">
                <template #default>
                    09:32
                </template>
            </UiSelectHeader>
        </template>
    </UiSelect>
</template>

<style lang="scss">
.UiTimeInput {
    &__wrapper {
        display: flex;
        align-items: center;
        width: 100%;
        height: 100%;
        column-gap: var(--ui-unit);
    }

    &__input {
        width: calc(var(--ui-unit) * 15);
    }
}
</style>

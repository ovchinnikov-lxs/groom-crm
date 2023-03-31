<script setup lang="ts">
const props = defineProps({
    modelValue: {
        type: Object,
        default: () => ({
            openAt: '',
            closeAt: '',
        }),
    },
});

const actualValue = reactive({
    openAt: [],
    closeAt: [],
});

watch(() => props.modelValue, ({ openAt, closeAt }) => {
    actualValue.openAt = openAt.split(':');
    actualValue.closeAt = closeAt.split(':');
}, {
    immediate: true,
});

</script>

<template>
    <div class="UiTimeInput">
        <div class="UiTimeInput__wrapper">
            <UiInput
                v-model="actualValue.openAt[0]"
                class="UiTimeInput__input"
            />
            :
            <UiInput
                v-model="actualValue.openAt[1]"
                class="UiTimeInput__input"
            />
            -
            <UiInput
                v-model="actualValue.closeAt[0]"
                class="UiTimeInput__input"
            />
            :
            <UiInput
                v-model="actualValue.closeAt[1]"
                class="UiTimeInput__input"
            />
        </div>
    </div>
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

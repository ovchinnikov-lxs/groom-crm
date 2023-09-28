<script setup lang="ts">
const onSubmit = () => {
    try {
        console.log('onSubmit');
    } catch (e) {
        console.log(e);
    }
};
</script>

<template>
    <UiModalPopupWrapper
        tag="form"
        class="BookingCreate"
        @submit.prevent="onSubmit"
    >
        <template #header>
            <h4>Создать запись</h4>
        </template>

        <template #default>
            default
        </template>

        <template #footer>
            <UiButton>Создать</UiButton>
        </template>
    </UiModalPopupWrapper>
</template>

<style module lang="scss">
.form {
    display: flex;
    flex-direction: column;
    row-gap: calc(var(--ui-unit) * 6);
}
</style>

<script setup lang="ts">
definePageMeta({
    layout: 'auth',
});

function onSubmit() {
    console.log('onSubmit');
}
</script>

<template>
    <div class="LoginPage">
        <form :class="$style.wrapper" @submit.prevent="onSubmit">

            <div :class="$style.cells">
                <UiFormCell>
                    <template #label>Номер телефона</template>

                    <template #default>
                        <UiInput/>
                    </template>
                </UiFormCell>

                <UiFormCell>
                    <template #label>Пароль</template>

                    <template #default>
                        <UiInput type="password"/>
                    </template>
                </UiFormCell>
            </div>

            <UiButton :class="$style.button">Войти</UiButton>
        </form>
    </div>
</template>


<style lang="scss" module>
.wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
}

.cells {
    display: flex;
    flex-direction: column;
    row-gap: calc(var(--ui-unit) * 6);
}

.button {
    margin-top: auto;
}
</style>

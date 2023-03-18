<script setup lang="ts">
const router = useRouter();
const { $routes } = useNuxtApp();

definePageMeta({
    layout: 'auth',
    pageTransition: {
        name: 'top',
        mode: 'out-in',
    },
});

const actualValue = reactive({
    phone: '',
});

function onSubmit() {
    console.log('onSubmit');
    router.push($routes.auth.code);
}
</script>

<template>
    <UiPlate rounded :class="$style.RecoveryPage">
        <form :class="$style.wrapper" @submit.prevent="onSubmit">
            <h3>Забыли пароль?</h3>

            <UiFormCell :class="$style.cell">
                <template #default>
                    <UiInput
                        v-model="actualValue.phone"
                        placeholder="Введите телефон"
                    />
                </template>

                <template #info>
                    Мы отправим код на привязанный номер.
                </template>
            </UiFormCell>

            <UiButton :class="$style.button">Получить SMS код</UiButton>
        </form>
    </UiPlate>
</template>

<style lang="scss" module>
.wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    row-gap: calc(var(--ui-unit) * 8);
    padding: calc(var(--ui-unit) * 15) calc(var(--ui-unit) * 26);
}

.button {
    margin-top: auto;
}
</style>

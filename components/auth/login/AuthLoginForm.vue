<script setup lang="ts">
const actualValue = reactive({
    phone: '',
    password: '',
});

function onSubmit() {
    console.log(actualValue, 'onSubmit');
}

const showPassword = ref(false);
const passwordType = computed(() => showPassword.value ? 'text' : 'password');
</script>

<template>
    <UiPlate rounded class="AuthLoginForm">
        <form :class="$style.wrapper" @submit.prevent="onSubmit">
            <h3>Вход</h3>

            <div :class="$style.cells">
                <UiFormCell>
                    <template #default>
                        <UiInput v-model="actualValue.phone" placeholder="Введите телефон"/>
                    </template>
                </UiFormCell>

                <UiFormCell>
                    <template #default>
                        <UiInput
                            v-model="actualValue.password"
                            :type="passwordType"
                            placeholder="Введите пароль"
                        />
                    </template>
                </UiFormCell>

            </div>

            <div :class="$style.info">
                <UiToggle v-model="showPassword" size="small">
                    <template #true-label>Показать пароль</template>
                </UiToggle>

                <UiLink
                    to="/"
                    size="small"
                    color="secondary"
                    :class="$style.restorePassword"
                >
                    Не помню пароль
                </UiLink>
            </div>

            <UiButton :class="$style.button">Войти</UiButton>

        </form>
    </UiPlate>
</template>

<style lang="scss" module>
.wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding: calc(var(--ui-unit) * 15) calc(var(--ui-unit) * 26);
    text-align: center;
}

.cells {
    display: flex;
    flex-direction: column;
    row-gap: calc(var(--ui-unit) * 8);
    margin-top: calc(var(--ui-unit) * 8);
}

.info {
    display: flex;
    align-items: center;
    margin-top: calc(var(--ui-unit) * 5);
}

.restorePassword {
    margin-left: auto;
}

.button {
    margin-top: calc(var(--ui-unit) * 8);
}
</style>

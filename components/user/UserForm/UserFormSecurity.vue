<script setup lang="ts">
// Composables
import { useValidate } from '~/composables/useValidate';

const actualValue = reactive({
    password: '',
    password2: '',
});

const { $v, getError, getInvalidState } = useValidate(computed(() => ({
    password: [
        'required',
    ],
    password2: [
        'required',
        { name: 'sameAsPassword', param: actualValue.password },
    ],
})), actualValue);

const showPassword = ref(false);
const passwordType = computed(() => showPassword.value ? 'text' : 'password');

async function onSubmit() {
    try {
        if (await getInvalidState()) {
            return false;
        }

        console.log('onSubmit');
    } catch (e) {
        console.log(e);
    }
}
</script>

<template>
    <form :class="$style.wrapper" @submit.prevent="onSubmit">
        <h5>Безопасность</h5>

        <UiFormCell :error="getError('password')">
            <template #label>Придумайте новый пароль</template>
            <template #default>
                <UiInput
                    id="password"
                    v-model="$v.password.$model"
                    :type="passwordType"
                    :error="getError('password')"
                    placeholder="Придумайте пароль"
                />
            </template>
        </UiFormCell>

        <UiFormCell :error="getError('password2')">
            <template #label>Повторите новый пароль</template>
            <template #default>
                <UiInput
                    id="password-confirm"
                    v-model="$v.password2.$model"
                    :type="passwordType"
                    :error="getError('password2')"
                    placeholder="Повторите пароль"
                />
            </template>

            <template #info>
                <UiToggle v-model="showPassword" size="small">
                    <template #true-label>Показать пароль</template>
                </UiToggle>
            </template>
        </UiFormCell>

        <UiButton size="small">
            Обновить
        </UiButton>
    </form>
</template>

<style module lang="scss">
.wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    row-gap: calc(var(--ui-unit) * 6);
}
</style>

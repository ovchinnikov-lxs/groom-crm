<script setup lang="ts">
// Composables
import { useValidate } from '~/composables/useValidate';

const { $api, $routes } = useNuxtApp();
const auth = useAuth();

interface ILoginForm {
    phone: string
    password: string
}

const actualValue = reactive<ILoginForm>({
    phone: '',
    password: '',
});

const rules = computed(() => ({
    phone: [
        'required',
        'phone',
    ],
    password: [
        'required',
    ],
}));

const { $v, getError, getInvalidState } = useValidate(rules, actualValue);

async function onSubmit() {
    try {
        if (await getInvalidState()) {
            return false;
        }

        const { data } = await useAxios<{
            user: object;
            token: string;
        }>($api.auth.login, {
            method: 'POST',
            body: actualValue,
        });

        if (data.value) {
            await auth.setUserToken(data.value.token);
            await auth.fetchUser();
            navigateTo($routes.salons.list);
        }
    } catch (e) {
        console.log(e);
    }
}

const showPassword = ref(false);
const passwordType = computed(() => showPassword.value ? 'text' : 'password');
</script>

<template>
    <UiPlate rounded class="AuthLoginForm">
        <form :class="$style.wrapper" @submit.prevent="onSubmit">
            <h3>Вход</h3>

            <div :class="$style.cells">
                <UiFormCell :error="getError('phone')">
                    <template #default>
                        <UiInput
                            id="phone"
                            v-model="$v.phone.$model"
                            :error="getError('phone')"
                            placeholder="Введите телефон"
                        />
                    </template>
                </UiFormCell>

                <UiFormCell :error="getError('password')">
                    <template #default>
                        <UiInput
                            id="password"
                            v-model="$v.password.$model"
                            :error="getError('password')"
                            :type="passwordType"
                            placeholder="Введите пароль"
                        />
                    </template>

                    <template #info>
                        <div :class="$style.info">
                            <UiToggle v-model="showPassword" size="small">
                                <template #true-label>Показать пароль</template>
                            </UiToggle>

                            <UiLink
                                :to="$routes.auth.recovery"
                                size="small"
                                color="secondary"
                                :class="$style.restorePassword"
                            >
                                Не помню пароль
                            </UiLink>
                        </div>

                    </template>
                </UiFormCell>

            </div>

            <UiButton :class="$style.button">
                Войти
            </UiButton>

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
}

.restorePassword {
    margin-left: auto;
}

.button {
    margin-top: calc(var(--ui-unit) * 8);
}
</style>

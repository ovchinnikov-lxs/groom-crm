<script setup lang="ts">
// Composables
import { useValidate } from '~/composables/useValidate';

const router = useRouter();
const { $routes } = useNuxtApp();

const actualValue = reactive({
    phone: '',
    password: '',
    password2: '',
    full_name: '',
    company_name: '',
});

const rules = computed(() => ({
    phone: [
        'required',
        'phone',
    ],
    password: [
        'required',
    ],
    password2: [
        'required',
        { name: 'sameAsPassword', param: actualValue.password },
    ],
    full_name: [
        'required',
    ],
    company_name: [
        'required',
    ],
}));

const { $v, getError, getInvalidState } = useValidate(rules, actualValue);

const showPassword = ref(false);
const passwordType = computed(() => showPassword.value ? 'text' : 'password');

async function onSubmit() {
    try {
        if (await getInvalidState()) {
            return false;
        }

        console.log(actualValue, 'onSubmit');
        router.push({
            path: $routes.auth.code,
            query: { // todo: :)
                register: 1,
                value: JSON.stringify(actualValue),
            },
        });
    } catch (e) {
        console.log(e);
    }
}
</script>

<template>
    <UiPlate
        rounded
        class="RegistrationForm"
        @submit.prevent="onSubmit"
    >
        <form :class="$style.wrapper">
            <h3>Регистрация</h3>

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
                            :type="passwordType"
                            :error="getError('password')"
                            placeholder="Придумайте пароль"
                        />
                    </template>
                </UiFormCell>

                <UiFormCell :error="getError('password2')">
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

                <UiFormCell :error="getError('full_name')">
                    <template #default>
                        <UiInput
                            id="full_name"
                            v-model="$v.full_name.$model"
                            :error="getError('full_name')"
                            placeholder="Введите имя и фамилию"
                        />
                    </template>
                </UiFormCell>

                <UiFormCell :error="getError('company_name')">
                    <template #default>
                        <UiInput
                            id="company_name"
                            v-model="$v.company_name.$model"
                            :error="getError('company_name')"
                            placeholder="Название компании"
                        />
                    </template>
                </UiFormCell>

            </div>

            <UiButton>
                Зарегистрироваться
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
    row-gap: calc(var(--ui-unit) * 8);
    padding: calc(var(--ui-unit) * 15) calc(var(--ui-unit) * 26);
    text-align: center;
}

.cells {
    display: flex;
    flex-direction: column;
    row-gap: calc(var(--ui-unit) * 6);
}
</style>

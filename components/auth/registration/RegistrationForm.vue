<script setup lang="ts">
// Constants
import { TARIFFS_KEY } from 'assets/ts/constants/tariffs';

const route = useRoute();
const tariffs = useTariffs();
const auth = useAuth();

const actualValue = reactive({
    phone: '',
    password: '',
    password2: '',
    fullName: '',
    companyName: '',
});

const rules = computed(() => ({
    phone: [
        'required',
        'phone',
    ],
    password: [
        'required',
        { name: 'minLength', param: 6 },
    ],
    password2: [
        'required',
        { name: 'sameAsPassword', param: actualValue.password },
        { name: 'minLength', param: 6 },
    ],
    fullName: [
        'required',
    ],
    companyName: [
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

        const { $api, $routes } = useNuxtApp();

        const tariffId = route.query.tariffId
            ? route.query.tariffId
            : tariffs.list.find(t => t.name === TARIFFS_KEY.BASIC)?.id;


        await $api.auth.signup({
            ...actualValue,
            tariffId,
        });
        await auth.fetchUser();
        await useGlobal().fetchInitial();
        navigateTo($routes.salons.list);
        // todo: Добавить подтвержение номера телефона по смс и там уже регистрировать
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

                <UiFormCell :error="getError('fullName')">
                    <template #default>
                        <UiInput
                            id="fullName"
                            v-model="$v.fullName.$model"
                            :error="getError('fullName')"
                            placeholder="Введите имя и фамилию"
                        />
                    </template>
                </UiFormCell>

                <UiFormCell :error="getError('companyName')">
                    <template #default>
                        <UiInput
                            id="companyName"
                            v-model="$v.companyName.$model"
                            :error="getError('companyName')"
                            placeholder="Название организации"
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

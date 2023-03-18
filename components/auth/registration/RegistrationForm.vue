<script setup lang="ts">
const router = useRouter();
const { $routes } = useNuxtApp();

const actualValue = reactive({
    phone: '',
    password: '',
    password2: '',
    full_name: '',
    company_name: '',
});

const showPassword = ref(false);
const passwordType = computed(() => showPassword.value ? 'text' : 'password');

function onSubmit() {
    console.log(actualValue, 'onSubmit');
    router.push($routes.auth.code);
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

                <UiFormCell>
                    <template #default>
                        <UiInput
                            v-model="actualValue.phone"
                            placeholder="Введите телефон"
                        />
                    </template>
                </UiFormCell>

                <UiFormCell>
                    <template #default>
                        <UiInput
                            v-model="actualValue.password"
                            :type="passwordType"
                            placeholder="Придумайте пароль"
                        />
                    </template>
                </UiFormCell>

                <UiFormCell>
                    <template #default>
                        <UiInput
                            v-model="actualValue.password2"
                            :type="passwordType"
                            placeholder="Повторите пароль"
                        />
                    </template>

                    <template #info>
                        <UiToggle v-model="showPassword" size="small">
                            <template #true-label>Показать пароль</template>
                        </UiToggle>
                    </template>
                </UiFormCell>

                <UiFormCell>
                    <template #default>
                        <UiInput
                            v-model="actualValue.full_name"
                            placeholder="Введите  имя и фамилию"
                        />
                    </template>
                </UiFormCell>

                <UiFormCell>
                    <template #default>
                        <UiInput
                            v-model="actualValue.company_name"
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

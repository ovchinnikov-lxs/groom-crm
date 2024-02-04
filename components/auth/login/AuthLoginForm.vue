<script setup lang="ts">
const supabase = useSupabaseClient();
const storeToast = useStoreToast();

interface ILoginForm {
    email: string
}

const actualValue = reactive<ILoginForm>({
    email: '',
});

const rules = computed(() => ({
    email: [
        'required',
        'email',
    ],
}));

const { v$, getError, getInvalidState } = useValidate(rules, actualValue);

async function onSubmit() {
    try {
        if (await getInvalidState()) {
            return false;
        }
        const config = useRuntimeConfig();
        const route = useRoute();

        const { error } = await supabase.auth.signInWithOtp({
            email: actualValue.email,
            options: {
                emailRedirectTo: `${config.public.API_BASE_URL}/auth/confirm`,
                data: {
                    ...route.query.tariffId && {
                        tarrif_id: route.query.tariffId,
                    },
                },
            },
        });

        if (error) {
            storeToast.add({
                type: 'error',
                text: error.message,
            });
        } else {
            storeToast.add({
                type: 'success',
                text: 'На вашу почту отправлена ссылка для входа',
            });
        }
    } catch (e) {
        storeToast.add({
            type: 'error',
            text: 'Упс... что-то пошло не так',
        });
    }
}
</script>

<template>
    <UiPlate rounded class="AuthLoginForm">
        <form :class="$style.wrapper" @submit.prevent="onSubmit">
            <h3>Вход</h3>

            <div :class="$style.cells">
                <UiFormCell :error="getError('email')">
                    <template #default>
                        <UiInput
                            id="email"
                            v-model="v$.email.$model"
                            :error="getError('email')"
                            placeholder="Введите почту"
                        />
                    </template>
                </UiFormCell>

                <!--                <UiFormCell :error="getError('password')">-->
                <!--                    <template #default>-->
                <!--                        <UiInput-->
                <!--                            id="password"-->
                <!--                            v-model="v$.password.$model"-->
                <!--                            :error="getError('password')"-->
                <!--                            :type="passwordType"-->
                <!--                            placeholder="Введите пароль"-->
                <!--                        />-->
                <!--                    </template>-->

                <!--                    <template #info>-->
                <!--                        <div :class="$style.info">-->
                <!--                            <UiToggle v-model="showPassword" size="small">-->
                <!--                                <template #true-label>Показать пароль</template>-->
                <!--                            </UiToggle>-->

                <!--                            <UiLink-->
                <!--                                to="auth/recovery"-->
                <!--                                size="small"-->
                <!--                                color="secondary"-->
                <!--                                :class="$style.restorePassword"-->
                <!--                            >-->
                <!--                                Не помню пароль-->
                <!--                            </UiLink>-->
                <!--                        </div>-->

                <!--                    </template>-->
                <!--                </UiFormCell>-->

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

<script setup lang="ts">
// Composables
import { useValidate } from '~/composables/useValidate';

// Utils
import { leadingZero } from 'assets/ts/utils/format-utils';

definePageMeta({
    layout: 'auth',
    pageTransition: {
        name: 'top',
        mode: 'out-in',
    },
});

const router = useRouter();
const { $routes } = useNuxtApp();

const actualValue = reactive({
    code: '',
});

const { $v, getError, getInvalidState } = useValidate(computed(() => ({
    code: [
        'required',
    ],
})), actualValue);

const TIME_COUNT = 60;
const retryTime = ref<number>(TIME_COUNT);
function startTimer() {
    retryTime.value = TIME_COUNT;

    const interval = setInterval(() => {
        retryTime.value--;

        if (retryTime.value === 0) {
            clearInterval(interval);
        }
    }, 1000);
}

onMounted(() => {
    startTimer();
});

function onSendCode() {
    console.log('onSendCode');
    startTimer();
}

async function onSubmit() {
    try {
        if (await getInvalidState()) {
            return false;
        }

        console.log('onSubmit');
        router.push($routes.salons.list);
    } catch (e) {
        console.log(e);
    }
}
</script>

<template>
    <UiPlate rounded class="CodePage">
        <form :class="$style.wrapper" @submit.prevent="onSubmit">
            <h3>Введите код из SMS</h3>

            <div class="text-small" :class="$style.text">
                Мы отправили код на
                <template v-if="!$route.query.register">
                    привязанный номер.
                </template>
                <template v-else>
                    указанный номер, что бы подтвердить регистрацию.
                </template>
            </div>

            <UiFormCell :error="getError('code')" :class="$style.cell">
                <template #default>
                    <UiInput
                        v-model="$v.code.$model"
                        :error="getError('code')"
                        placeholder="Введите код"
                    />
                </template>

                <template #info>
                    <UiLink
                        :disabled="Boolean(retryTime)"
                        size="small"
                        color="secondary"
                        @click="onSendCode"
                    >
                        Запросить код еще раз&nbsp;
                        <transition name="f">
                            <span v-if="retryTime">
                                через 0:{{ leadingZero(retryTime) }}
                            </span>
                        </transition>
                    </UiLink>
                </template>
            </UiFormCell>

            <UiButton :class="$style.button">
                Готово
            </UiButton>

        </form>
    </UiPlate>
</template>

<style lang="scss" module>
.wrapper {
    width: 100%;
    height: 100%;
    padding: calc(var(--ui-unit) * 15) calc(var(--ui-unit) * 20);
}

.text {
    margin-top: calc(var(--ui-unit) * 4);
    color: var(--ui-secondary-color);
}

.cell,
.button {
    margin-top: calc(var(--ui-unit) * 8);
}

.button {
    width: 100%;
}
</style>

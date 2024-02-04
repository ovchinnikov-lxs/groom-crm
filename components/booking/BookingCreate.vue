<script setup lang="ts">
import type { Component } from 'vue';

interface IBookingCreate {
    services: string[];
    date: Date | null;
    salonId: string;
    masterId: string;
    customerId: string;
    petId: string;
    description?: string;
}
const $emit = defineEmits<{(e: 'close'): void }>();

const actualValue = reactive<IBookingCreate>({
    services: [],
    date: null,
    salonId: '',
    masterId: '',
    customerId: '',
    petId: '',
    description: '',
});
// const { v$, getError, getInvalidState } = useValidate(computed(() => ({
//     serviceId: ['required'],
//     date: ['required'],
//     salonId: ['required'],
//     masterId: ['required'],
//     customerId: ['required'],
//     petId: ['required'],
//     description: [],
// })), actualValue);

const actualStep = ref(0);
const actualStepComponent = computed((): Component | undefined => [
    defineAsyncComponent(() => import('~/components/booking/ServiceSelect/BookingServiceSelect.vue')),
    defineAsyncComponent(() => import('~/components/booking/DateSelect/BookingDateSelect.vue')),
    defineAsyncComponent(() => import('~/components/booking/MasterSelect/BookingMasterSelect.vue')),
    defineAsyncComponent(() => import('~/components/booking/Form/BookingForm.vue')),
][actualStep.value]);

const buttonTitle = computed(() => actualStep.value === 3 ? 'Создать' : 'Далее');

const onSubmit = async () => {
    try {
        // if (await getInvalidState()) {
        //     return false;
        // }

        if (actualStep.value === 0 && actualValue.services.length) {
            actualStep.value++;
        }

        console.log('onSubmit', actualValue);
        // $emit('close');
    } catch (e) {
        console.log(e);
    }
};
</script>

<template>
    <UiModalPopupWrapper
        tag="form"
        class="BookingCreate"
        @submit.prevent="onSubmit"
        @close="$emit('close')"
    >
        <template #header>
            <h4>Создать запись</h4>
        </template>

        <template #default>
            <component
                :is="actualStepComponent"
                v-model:services="actualValue.services"
            />
        </template>

        <template #footer>
            <div :class="$style.footer">
                <UiButton
                    v-if="actualStep !== 0"
                    outline
                    :class="$style.button"
                    @click="actualStep--"
                >
                    Назад
                </UiButton>
                <UiButton :class="$style.button">
                    {{ buttonTitle }}
                </UiButton>
            </div>
        </template>
    </UiModalPopupWrapper>
</template>

<style module lang="scss">
.form {
    display: flex;
    flex-direction: column;
    row-gap: calc(var(--ui-unit) * 6);
}

.footer {
    display: flex;
    column-gap: calc(var(--ui-unit) * 3);
}

.button {
    flex-grow: 1;
    flex-shrink: 0;
}
</style>

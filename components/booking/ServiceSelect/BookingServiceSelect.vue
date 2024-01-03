<script setup lang="ts">
defineProps<{
    services: string[]
}>();

interface IActualValue {
    breeds: string[]
}

const actualValue: IActualValue = reactive({
    breeds: [],
});

defineEmits<{
    'update:services': [string[]]
}>();
</script>

<template>
    <div class="BookingServiceSelect">
        <div :class="$style.wrapper">
            <UiFormCell>
                <template #label>Порода</template>
                <template #default>
                    <BreedsSelect
                        v-model="actualValue.breeds"
                        placeholder="Введите название породы"
                    />
                </template>
            </UiFormCell>
            <UiFormCell>
                <template #label>Услуги</template>
                <template #default>
                    <ServicesSelect
                        :model-value="services"
                        :disabled="!actualValue.breeds.length"
                        :breeds="actualValue.breeds"
                        placeholder="Введите название услуги"
                        @update:model-value="val => $emit('update:services', val)"
                    />
                </template>
            </UiFormCell>
        </div>
    </div>
</template>

<style lang="scss" module>
.wrapper {
    display: flex;
    flex-direction: column;
    row-gap: calc(var(--ui-unit) * 8);
}
</style>

<script setup lang="ts">
const actualValue = reactive({
    name: '',
    openAt: '',
    closeAt: '',
    pricePerMonth: '',
    masters: [],
    location: {
        lat: '',
        lng: '',
        address: '',
    },
});

function onSubmit() {
    console.log(actualValue.openAt, actualValue.closeAt);
    console.log('onSubmit');
}
</script>

<template>
    <UiModalPopupWrapper class="SalonCreate">
        <template #header>
            <h4>Добавить салон</h4>
        </template>

        <template #default>
            <form :class="$style.form" @submit.prevent="onSubmit">
                <UiFormCell>
                    <template #label>
                        Название салона
                    </template>

                    <template #default>
                        <UiInput v-model="actualValue.name"/>
                    </template>
                </UiFormCell>

                <UiFormCell>
                    <template #label>
                        Укажите время работы
                    </template>

                    <template #default>
                        <div :class="$style.cellWrapper">
                            <UiTimeInput
                                v-model="actualValue.openAt"
                            />
                            :
                            <UiTimeInput
                                v-model="actualValue.closeAt"
                            />
                        </div>
                    </template>
                </UiFormCell>

                <UiFormCell>
                    <template #label>
                        Стоимость аренды в месяц
                    </template>

                    <template #default>
                        <UiInput/>
                    </template>
                </UiFormCell>

                <UiFormCell>
                    <template #label>
                        Команда салона
                    </template>

                    <template #default>
                        <UiSelect
                            multiple
                            :options="[{id: '1', name: 'ansty'}, {id: '2', name: 'alex'}]"
                        >
                            <template #body-header>
                                <UiButton size="x-small">
                                    Добавить сотрудника
                                </UiButton>
                            </template>
                        </UiSelect>
                    </template>
                </UiFormCell>

                <UiFormCell>
                    <template #label>
                        Адрес салона
                    </template>

                    <template #default>
                        <UiInput/>
                    </template>
                </UiFormCell>

            </form>
        </template>

        <template #footer>
            <UiButton @click="onSubmit">Сохранить</UiButton>
        </template>
    </UiModalPopupWrapper>
</template>

<style lang="scss" module>
.form {
    display: flex;
    flex-direction: column;
    row-gap: calc(var(--ui-unit) * 6);
}

.cellWrapper {
    display: flex;
    align-items: center;
    column-gap: calc(var(--ui-unit) * 4);
}
</style>

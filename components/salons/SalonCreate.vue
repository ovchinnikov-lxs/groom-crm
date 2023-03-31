<script setup lang="ts">
function onSubmit() {
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
                        <UiInput/>
                    </template>
                </UiFormCell>

                <UiFormCell>
                    <template #label>
                        Укажите время работы
                    </template>

                    <template #default>
                        <UiTimeInput :model-value="{openAt: '09:00', closeAt: '19:00'}"/>
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
                        Мастера салона
                    </template>

                    <template #default>
                        <UiInput/>
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
</style>

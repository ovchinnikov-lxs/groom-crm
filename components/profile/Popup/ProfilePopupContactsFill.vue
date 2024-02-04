<script setup lang="ts">
defineEmits<{
    close: [void]
}>();

const storeProfile = useStoreProfile();

const actualValue = reactive({
    full_name: '',
});

const { v$, getError, getInvalidState } = useValidate(computed(() => ({
    full_name: ['required'],
})), actualValue);

async function onSubmit() {
    try {
        if (await getInvalidState()) {
            return false;
        }

        const res = await $fetch('/api/profile', {
            body: actualValue,
            method: 'PATCH',
        });

        if (!res) {
            return false;
        }

        storeProfile.profile = res;
    } catch (e) {
        console.error('PROFILE_POPUP_CONTACTS_FILL:ON_SUBMIT', e);
    }
}
</script>

<template>
    <UiModalPopupWrapper
        tag="form"
        class="ProfilePopupContactsFill"
        :closable="false"
        @close="$emit('close')"
        @submit.prevent="onSubmit"
    >
        <template #header>
            <h4>Спасибо за&nbsp;регистрацию!</h4>
        </template>

        <template #default>
            <p>
                Чтобы предоставить вам лучший сервис, уточните, пожалуйста, ваши контактные данные.
            </p>

            <UiFormCell :error="getError('full_name')" :class="$style.cell">
                <template #label>Имя и Фамилия</template>

                <template #default>
                    <UiInput
                        v-model="v$.full_name.$model"
                        :error="getError('full_name')"
                        placeholder="Введите имя и фамилию"
                    />
                </template>
            </UiFormCell>
        </template>

        <template #footer>
            <UiButton>Сохранить</UiButton>
        </template>
    </UiModalPopupWrapper>
</template>


<style module lang="scss">
.cell {
    margin-top: 32px;
}
</style>

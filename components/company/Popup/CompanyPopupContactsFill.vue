<script setup lang="ts">
defineEmits<{
    close: [void]
}>();

const storeCompany = useStoreCompany();

const actualValue = reactive({
    name: '',
    company_id: storeCompany.detail.id,
});

const { v$, getError, getInvalidState } = useValidate(computed(() => ({
    name: ['required'],
})), actualValue);

async function onSubmit() {
    try {
        if (await getInvalidState()) {
            return false;
        }

        const res = await $fetch('/api/company', {
            body: actualValue,
            method: 'PATCH',
        });

        if (!res) {
            return false;
        }

        storeCompany.detail = res;
    } catch (e) {
        console.error('COMPANY_POPUP_CONTACTS_FILL:ON_SUBMIT', e);
    }
}
</script>

<template>
    <UiModalPopupWrapper
        tag="form"
        class="CompanyPopupContactsFill"
        :closable="false"
        @close="$emit('close')"
        @submit.prevent="onSubmit"
    >
        <template #header>
            <h4>Добавьте вашу компанию в&nbsp;Groom.CRM</h4>
        </template>

        <template #default>
            <UiFormCell :error="getError('name')">
                <template #label>Название</template>

                <template #default>
                    <UiInput
                        v-model="v$.name.$model"
                        :error="getError('name')"
                        placeholder="Введите название"
                    />
                </template>

                <template #info>
                    Название компании или ваше имя (если вы работаете на себя)
                </template>
            </UiFormCell>
        </template>

        <template #footer>
            <UiButton>Сохранить</UiButton>
        </template>
    </UiModalPopupWrapper>
</template>

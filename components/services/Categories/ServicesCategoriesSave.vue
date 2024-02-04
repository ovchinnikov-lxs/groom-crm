<script setup lang="ts">
import { defu } from 'defu';
import type { Tables } from '~/types/supabase';

const props = defineProps<{
    value?: Tables<'ServiceCategory'>
}>();
const emit = defineEmits<{
    close: [void]
}>();

const storeCompany = useStoreCompany();
const storeToast = useStoreToast();

const actualValue = reactive<Tables<'ServiceCategory'>>(defu(props.value, {
    name: '',
    description: '',
    image: '',
}));

const { v$, getError, getInvalidState } = useValidate(computed(() => ({
    name: ['required'],
    description: [],
    image: [],
})), actualValue);

async function onSubmit() {
    try {
        if (await getInvalidState()) {
            return false;
        }

        const text = `Услуга успешно ${props.value ? 'обновлена' : 'созадана'}`;

        if (!props.value) {
            await $fetch('/api/service', {
                method: 'POST',
                body: {
                    ...actualValue,
                    company_id: storeCompany.detail.id,
                },
            });
        } else {
            await $fetch(`/api/service/${props.value.id}`, {
                method: 'PATCH',
                body: actualValue,
            });
        }

        storeToast.add({
            type: 'success',
            text,
        });
        emit('close');
    } catch (e) {
        storeToast.add({
            type: 'error',
            text: 'Упс что то пошло не так',
        });
        console.error('SERVICES_CATEGORIES_SAVE:ON_SUBMIT:', e);
    }
}
</script>

<template>
    <UiModalPopupWrapper
        tag="form"
        class="ServicesCategoriesSave"
        @submit.prevent="onSubmit"
        @close="emit('close')"
    >
        <template #header>
            <h4>
                <template v-if="!props.value">Добавить</template>
                <template v-else>Редактировать</template>
                Категорию
            </h4>
        </template>

        <template #default>
            <div :class="$style.form">
                <UiFormCell :error="getError('name')">
                    <template #label>
                        Название услуги
                    </template>

                    <template #default>
                        <UiInput
                            v-model="v$.name.$model"
                            :error="getError('name')"
                            placeholder="Введите название услуги"
                        />
                    </template>
                </UiFormCell>

                <UiFormCell :error="getError('description')">
                    <template #label>Описание</template>
                    <template #default>
                        <UiRichText
                            v-model="v$.description.$model"
                            rows="4"
                            :error="getError('description')"
                            placeholder="Введите описание услуги"
                        />
                    </template>
                </UiFormCell>

                <UiFormCell :error="getError('image')">
                    <template #label>Изображение услуги</template>
                    <template #default>
                        <UiFileInput
                            v-model="v$.image.$model"
                            :error="getError('image')"
                            is-image
                        />
                    </template>
                </UiFormCell>
            </div>
        </template>

        <template #footer>
            <UiButton>Сохранить</UiButton>
        </template>
    </UiModalPopupWrapper>
</template>

<style module lang="scss">
.form {
    display: flex;
    flex-direction: column;
    row-gap: calc(var(--ui-unit) * 6);
}
</style>

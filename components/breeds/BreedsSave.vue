<script setup lang="ts">
import { defu } from 'defu';
import type { Tables } from '~/types/supabase';

const props = defineProps<{
    value?: Tables<'Breed'>
}>();
const emit = defineEmits<{
    close: [void]
}>();

const storeCompany = useStoreCompany();
const storeToast = useStoreToast();

const actualValue = reactive<Tables<'Breed'>>(defu(props.value, {
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

        if (!props.value) {
            await $fetch('/api/breeds', {
                method: 'POST',
                body: {
                    ...actualValue,
                    company_id: storeCompany.detail.id,
                },
            });
            storeToast.add({
                type: 'success',
                text: 'Порода успешно создана',
            });
        } else {
            await $fetch(`/api/breeds/${props.value.id}`, {
                method: 'PATCH',
                body: actualValue,
            });
            storeToast.add({
                type: 'success',
                text: 'Порода успешно обновлена',
            });
        }
        emit('close');
    } catch (e) {
        storeToast.add({
            type: 'error',
            text: 'Упс что то пошло не так',
        });
        console.error('BREEDS_SAVE:ON_SUBMIT:', e);
    }
}
</script>

<template>
    <UiModalPopupWrapper
        tag="form"
        @close="emit('close')"
        @submit.prevent="onSubmit"
    >
        <template #header>
            <h4>
                <template v-if="!props.value">Добавить</template>
                <template v-else>Редактировать</template>
                Породу
            </h4>
        </template>

        <template #default>
            <div :class="$style.form">
                <UiFormCell :error="getError('name')">
                    <template #label>
                        Название породы
                    </template>

                    <template #default>
                        <UiInput
                            v-model="v$.name.$model"
                            :error="getError('name')"
                            placeholder="Введите название породы"
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
                            placeholder="Введите описание породы"
                        />
                    </template>
                </UiFormCell>

                <UiFormCell :error="getError('image')">
                    <template #label>Изображение породы</template>
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

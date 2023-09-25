<script setup lang="ts">
import { PropType } from 'vue';
import _ from 'lodash';
import { IBreed } from '~/types/breeds';

const props = defineProps({
    value: {
        type: Object as PropType<IBreed>,
        default: () => ({
            name: '',
            description: '',
            preview: '',
        }),
    },
});
const $emit = defineEmits<{
    close: [void]
}>();

const actualValue = reactive<IBreed>(_.cloneDeep(props.value));
const { $v, getError, getInvalidState } = useValidate(computed(() => ({
    name: ['required'],
    description: [],
    preview: [],
})), actualValue);

async function onSubmit() {
    try {
        if (await getInvalidState()) {
            return false;
        }

        const { $api } = useNuxtApp();

        if (!Object.keys(props.value).length) {
            await $api.breeds.create(actualValue);
        } else {
            await $api.breeds.update(props.value?.id, actualValue);
        }

        $emit('close');
    } catch (e) {
        // TODO: Добавить логирование ошибок(sentry?) и уведомление об ошибках
        console.log(e);
    }
}
</script>

<template>

    <UiModalPopupWrapper
        tag="form"
        @close="$emit('close')"
        @submit.prevent="onSubmit"
    >
        <template #header>
            <h4>
                <template v-if="!Object.keys(value).length">Добавить</template>
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
                            v-model="$v.name.$model"
                            :error="getError('name')"
                            placeholder="Введите название породы"
                        />
                    </template>
                </UiFormCell>

                <UiFormCell :error="getError('description')">
                    <template #label>Описание</template>
                    <template #default>
                        <UiRichText
                            v-model="$v.description.$model"
                            rows="4"
                            :error="getError('description')"
                            placeholder="Введите описание породы"
                        />
                    </template>
                </UiFormCell>

                <UiFormCell :error="getError('preview')">
                    <template #label>Изображение породы</template>
                    <template #default>
                        <UiFileInput
                            v-model="$v.preview.$model"
                            :error="getError('preview')"
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

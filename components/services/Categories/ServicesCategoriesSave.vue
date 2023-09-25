<script setup lang="ts">
import { PropType } from 'vue';
import { IServiceCategory } from '~/types/services';


const props = defineProps({
    value: {
        type: Object as PropType<IServiceCategory>,
        default: () => ({}),
    },
});
const $emit = defineEmits<{
    close: [void]
}>();

const actualValue = reactive<IServiceCategory>({
    name: '',
    description: '',
    preview: '',
});

watch(() => props.value, (val: IServiceCategory) => {
    if (!Object.keys(val).length) {
        return false;
    }

    actualValue.name = val.name;
    actualValue.description = val.description;
    actualValue.preview = val.preview;
}, { immediate: true });

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
            await $api.services.createServiceCategory(actualValue);
        } else {
            await $api.services.updateServiceCategory(props.value?.id, actualValue);
        }

        $emit('close');
    } catch (e) {
        console.log(e);
    }
}
</script>

<template>
    <UiModalPopupWrapper
        tag="form"
        class="ServicesCategoriesSave"
        @submit.prevent="onSubmit"
        @close="$emit('close')"
    >
        <template #header>
            <h4>
                <template v-if="!Object.keys(value).length">Добавить</template>
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
                            v-model="$v.name.$model"
                            :error="getError('name')"
                            placeholder="Введите название услуги"
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
                            placeholder="Введите описание услуги"
                        />
                    </template>
                </UiFormCell>

                <UiFormCell :error="getError('preview')">
                    <template #label>Изображение услуги</template>
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

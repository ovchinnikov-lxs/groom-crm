<script setup lang="ts">
import type { PropType } from 'vue/dist/vue';
import { getHumanTime, leadingZero } from 'assets/ts/utils/format-utils';

interface IServiceSave {
    name: string;
    description: string;
    preview: string;
    price: number;
    duration: number;
    breeds: Array<string>;
}

interface IServiceValue extends IServiceSave {
    id: string;
}

const props = defineProps({
    value: {
        type: Object as PropType<IServiceValue>,
        default: () => ({}),
    },

    categoryId: {
        type: String,
        required: true,
    },
});
const actualValue = reactive<IServiceSave>({
    name: '',
    description: '',
    preview: '',
    price: '',
    duration: '00:00',
    breeds: [],
});

watch(() => props.value, (val: IServiceValue) => {
    if (!Object.keys(val).length) {
        return false;
    }

    const { hours, minutes } = getHumanTime(val.duration);

    actualValue.name = val.name;
    actualValue.description = val.description;
    actualValue.preview = val.preview;
    actualValue.price = val.price;
    actualValue.duration = `${leadingZero(hours)}:${leadingZero(minutes)}`;
    actualValue.breeds = val.breeds.map(i => i.id);
}, { immediate: true });

const { $v, getError, getInvalidState } = useValidate(computed(() => ({
    name: ['required'],
    description: [],
    preview: [],
    price: ['required'],
    duration: ['required'],
    breeds: ['required'],
})), actualValue);

const $emit = defineEmits<{
    close: [void]
}>();
async function onSubmit() {
    try {
        if (await getInvalidState()) {
            return false;
        }

        const { $api } = useNuxtApp();
        const [hours, minutes] = actualValue.duration.split(':').map(i => Number(i));

        const duration = hours * 60 + minutes;

        if (!Object.keys(props.value).length) {
            await $api.services.create({
                ...actualValue,
                duration,
            });
        } else {
            await $api.services.update(props.value?.id, {
                ...actualValue,
                duration,
            });
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
        class="ServicesSave"
        @submit.prevent="onSubmit"
        @close="$emit('close')"
    >
        <template #header>
            <h4>
                <template v-if="!Object.keys(value).length">Добавить</template>
                <template v-else>Редактировать</template>
                Услугу
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

                <UiFormCell :error="getError('breeds')">
                    <template #label>Породы</template>
                    <template #default>
                        <BreedsSelect
                            v-model="$v.breeds.$model"
                            placeholder="Введите название пород"
                            :error="getError('breeds')"
                        />
                    </template>
                </UiFormCell>

                <UiFormCell :error="getError('price')">
                    <template #label>
                        Стоимость
                    </template>

                    <template #default>
                        <UiInput
                            v-model="$v.price.$model"
                            placeholder="Введите стоимость услуги"
                            :error="getError('price')"
                        />
                    </template>
                </UiFormCell>

                <UiFormCell :error="getError('duration')">
                    <template #label>
                        Длительность <span>часы, минуты</span>
                    </template>

                    <template #default>
                        <UiTimeSelect
                            v-model="$v.duration.$model"
                            placeholder="Введите длительность услуги"
                            :end-hour="12"
                            :period="5"
                            :error="getError('duration')"
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

<style lang="scss" module>
.form {
    display: flex;
    flex-direction: column;
    row-gap: calc(var(--ui-unit) * 6);
}
</style>

<script setup lang="ts">
import { getHumanTime, leadingZero } from '~/utils/format';
import type { Tables } from '~/types/supabase';

interface IPropsValue extends Tables<'ServiceDetail'> {
    breeds: Tables<'Breed'>[];
}

interface IValue {
    name: string;
    description: string;
    image: string;
    price: number;
    duration: string;
    breeds: string[];
}

const props = defineProps<{
    value?: IPropsValue;
    categoryId: string;
}>();


const { hours, minutes } = getHumanTime(props.value?.duration || 0);

const actualValue: IValue = reactive({
    name: props.value?.name || '',
    description: props.value?.description || '',
    image: props.value?.image || '',
    price: props.value?.price || 0,
    duration: `${leadingZero(hours)}:${leadingZero(minutes)}` || '00:00',
    breeds: props.value?.breeds.map(b => b.id) || [],
});

const { v$, getError, getInvalidState } = useValidate(computed(() => ({
    name: ['required'],
    description: [],
    image: [],
    price: ['required'],
    duration: ['required'],
    breeds: ['required'],
})), actualValue);

const emit = defineEmits<{
    close: [void]
}>();


const storeToast = useStoreToast();
const storeCompany = useStoreCompany();

async function onSubmit() {
    try {
        if (await getInvalidState()) {
            return false;
        }

        const text = `Услуга успешно ${props.value ? 'обновлена' : 'созадана'}`;


        const [hours, minutes] = actualValue.duration
            .split(':')
            .map((i: string) => Number(i));

        const body = {
            ...actualValue,
            duration: hours * 60 + minutes,
            company_id: storeCompany.detail.id,
        };

        if (!props.value) {
            await $fetch(`/api/service/${props.categoryId}/detail`, {
                method: 'POST',
                body,
            });
        } else {
            await $fetch(`/api/service/${props.categoryId}/detail/${props.value.id}`, {
                method: 'PATCH',
                body,
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
        console.error('SERVICES_SAVE:ON_SUBMIT:', e);
    }
}
</script>

<template>
    <UiModalPopupWrapper
        tag="form"
        class="ServicesSave"
        @submit.prevent="onSubmit"
        @close="emit('close')"
    >
        <template #header>
            <h4>
                <template v-if="!props.value">Добавить</template>
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

                <UiFormCell :error="getError('breeds')">
                    <template #label>Породы</template>
                    <template #default>
                        <BreedsSelect
                            v-model="v$.breeds.$model"
                            placeholder="Введите название пород"
                            multiple
                            :error="getError('breeds')"
                        />
                    </template>
                </UiFormCell>

                <UiFormCell :error="getError('duration')">
                    <template #label>
                        Длительность <span>часы, минуты</span>
                    </template>

                    <template #default>
                        <UiTimeSelect
                            v-model="v$.duration.$model"
                            placeholder="Введите длительность услуги"
                            :end-hour="12"
                            :period="5"
                            :error="getError('duration')"
                        />
                    </template>
                </UiFormCell>

                <UiFormCell :error="getError('price')">
                    <template #label>
                        Стоимость
                    </template>

                    <template #default>
                        <UiInput
                            v-model="v$.price.$model"
                            placeholder="Введите стоимость услуги"
                            :error="getError('price')"
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

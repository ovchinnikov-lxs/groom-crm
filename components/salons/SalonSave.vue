<script setup lang="ts">
// Composables
import type { PropType } from 'vue';
import { useValidate } from '~/composables/useValidate';

const props = defineProps({
    type: {
        type: String as PropType<'create' | 'update'>,
        default: 'create',
    },
});

const actualValue = reactive({
    name: null,
    preview: null,
    openAt: '10:00',
    closeAt: '19:00',
    pricePerMonth: null,
    staff: [],
    location: {
        lat: null,
        lng: null,
        address: null,
    },
});


const { $v, getError, getInvalidState } = useValidate(computed(() => ({
    name: ['required'],
    preview: ['required'],
    openAt: ['required'],
    closeAt: ['required'],
    pricePerMonth: ['required'],
    staff: [],
    location: {
        lat: ['required'],
        lng: ['required'],
        address: ['required'],
    },
})), actualValue);


const staffOptions = [];

async function onSubmit() {
    try {
        if (await getInvalidState()) {
            return false;
        }
        // todo: Change the path relative to the type
        console.log(actualValue, 'onSubmit', props.type);
    } catch (e) {
        console.log(e);
    }
}
</script>

<template>
    <UiModalPopupWrapper class="SalonSave">
        <template #header>
            <h4>
                <template v-if="type === 'create'">Добавить</template>
                <template v-else>Обновить</template>
                салон
            </h4>
        </template>

        <template #default>
            <form :class="$style.form" @submit.prevent="onSubmit">
                <UiFormCell :error="getError('name')">
                    <template #label>
                        Название салона
                    </template>

                    <template #default>
                        <UiInput
                            v-model="$v.name.$model"
                            :error="getError('name')"
                            placeholder="Введите название салона"
                        />
                    </template>
                </UiFormCell>

                <UiFormCell :error="getError('preview')">
                    <template #label>Изображение салона</template>
                    <template #default>
                        <UiFileInput
                            v-model="$v.preview.$model"
                            :error="getError('preview')"
                            is-image
                        />
                    </template>
                </UiFormCell>

                <UiFormCell :error="getError('openAt') || getError('closeAt')">
                    <template #label>
                        Укажите время работы
                    </template>

                    <template #default>
                        <div :class="$style.cellWrapper">
                            <UiTimeSelect
                                v-model="$v.openAt.$model"
                                placeholder="Открытие"
                                :error="getError('openAt')"
                            />
                            -
                            <UiTimeSelect
                                v-model="$v.closeAt.$model"
                                placeholder="Закрытие"
                                :error="getError('closeAt')"
                            />
                        </div>
                    </template>
                </UiFormCell>

                <UiFormCell :error="getError('pricePerMonth')">
                    <template #label>
                        Стоимость аренды в месяц
                    </template>

                    <template #default>
                        <UiInput
                            v-model="$v.pricePerMonth.$model"
                            placeholder="Введите стоимость арендной платы"
                            :error="getError('pricePerMonth')"
                        />
                    </template>
                </UiFormCell>

                <UiFormCell :error="getError('staff')">
                    <template #label>
                        Команда салона
                    </template>

                    <template #default>
                        <UiSelect
                            v-model="$v.staff.$model"
                            multiple
                            :error="getError('staff')"
                            placeholder="Выберете сотрундиков"
                            :options="staffOptions"
                        >
                            <template #body-header>
                                <UiButton size="x-small">
                                    Добавить сотрудника
                                </UiButton>
                            </template>
                        </UiSelect>
                    </template>
                </UiFormCell>

                <UiFormCell :error="getError('location.lat') || getError('location.lng') || getError('location.address')">
                    <template #label>
                        Адрес салона
                    </template>

                    <template #default>
                        <UiCoordsInput
                            v-model="actualValue.location"
                            :error="getError('location.lat') || getError('location.lng') || getError('location.address')"
                            placeholder="Введите адрес салона"
                        />
                    </template>
                </UiFormCell>

            </form>
        </template>

        <template #footer>
            <UiButton size="small" @click="onSubmit">Сохранить</UiButton>
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

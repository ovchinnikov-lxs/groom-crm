<script setup lang="ts">
import { defu } from 'defu';
import type { Tables } from '~/types/supabase';

const props = defineProps<{
    value?: Tables<'Profile'>
}>();
const emit = defineEmits<{
    close: [void];
}>();

type ValueType = Pick<Tables<'Profile'>, 'full_name' | 'description' | 'role' | 'salary'>;

interface IActualValue extends ValueType {
    email: string;
}

// TODO: Добавить выбор услуг для мастера (это букинг)
const actualValue: IActualValue = reactive(defu(props.value, {
    full_name: '',
    description: '',
    email: '',
    role: null,
    salary: null,
}));

const { v$, getError, getInvalidState } = useValidate(computed(() => ({
    full_name: ['required'],
    role: ['required'],
    description: [],
    salary: [],
    email: !props.value
        ? ['required', 'email']
        : [],

    ...actualValue.role === ROLES_KEYS.MASTER && {
        description: ['required'],
        salary: ['required', { name: 'maxLength', param: 100 }, { name: 'minLength', param: 1 }],
        // services: ['required'],
    },

    ...actualValue.role === ROLES_KEYS.ADMIN && {
        salary: ['required'],
    },
})), actualValue);

const displaySalary = computed(() => {
    if (actualValue.role === ROLES_KEYS.MASTER) {
        return {
            label: 'Процент от стрижки',
            placeholder: 'Введите процент выручки от стрижки',
        };
    }

    return {
        label: 'Ежемесячная оплата',
        placeholder: 'Введите зарплату',
    };
});

/**
 * TODO: Схема прикрепления пород и услуг к мастеру
 * 1) По породам
 *      1) Выбор породы (в селекторе, а при выборе появляется карточка породы с закрытым списком услуг по этой породе
 *      2) Выбор услуг относительно выбранной породы, открываешь список, и можешь через поиск фильтровать услуги, и выбирать точечно или "Выбрать все"
 *      Итог: Получаем массив с объектами {id: 'breedId', services: ['serviceId']}
 *      На беке:
 *
 */

async function onSubmit() {
    const storeToast = useStoreToast();
    try {
        if (await getInvalidState()) {
            return false;
        }


        if (!props.value) {
            const storeCompany = useStoreCompany();


            await $fetch('/api/staff', {
                method: 'POST',
                body: {
                    ...actualValue,
                    company_id: storeCompany.detail.id,
                },
            });
            storeToast.add({
                type: 'success',
                text: 'Сотрудник добавлен',
            });
        } else {
            await $fetch('/api/staff', {
                method: 'PATCH',
                body: actualValue,
            });

            storeToast.add({
                type: 'success',
                text: 'Сотрудник обновлен',
            });
        }

        emit('close');
    } catch (e: any) {
        console.error('STAFF_SAVE:ON_SUBMIT', e);
        storeToast.add({
            type: 'error',
            text: e.message,
        });
    }
}
</script>

<template>
    <UiModalPopupWrapper
        tag="form"
        class="StaffSave"
        @submit.prevent="onSubmit"
        @close="$emit('close')"
    >
        <template #header>
            <h4>
                <template v-if="!value">
                    Добавить
                </template>
                <template v-else>
                    Редактировать
                </template>
                сотрудника
            </h4>
        </template>

        <template #default>
            <div :class="$style.form">
                <UiFormCell :error="getError('role')">
                    <template #label>Позиция</template>

                    <template #default>
                        <UiSelect
                            v-model="v$.role.$model"
                            :options="ROLES_OPTIONS"
                            :error="getError('role')"
                        />
                    </template>
                </UiFormCell>

                <UiFormCell :error="getError('full_name')">
                    <template #label>Имя и Фамилия</template>

                    <template #default>
                        <UiInput
                            v-model="v$.full_name.$model"
                            :error="getError('full_name')"
                            placeholder="Введите имя и фамилию"
                        />
                    </template>
                </UiFormCell>

                <UiFormCell v-if="!props.value" :error="getError('email')">
                    <template #label>Почта</template>

                    <template #default>
                        <UiInput
                            v-model="v$.email.$model"
                            :error="getError('email')"
                            placeholder="Введите почту"
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
                            placeholder="Введите описание"
                        />
                    </template>
                </UiFormCell>

                <!--                <transition name="bottom">-->
                <!--                    <div v-if="actualValue.role === ROLES_KEYS.MASTER" :class="$style.form">-->
                <!--                        <UiFormCell :error="getError('services')">-->
                <!--                            <template #label>Услуги мастера</template>-->
                <!--                            <template #default>-->
                <!--                                <StaffSaveMasterServices-->
                <!--                                    v-model="v$.services.$model"-->
                <!--                                    :error="getError('services')"-->
                <!--                                />-->
                <!--                            </template>-->
                <!--                        </UiFormCell>-->

                <!--                        <UiFormCell :error="getError('breeds')">-->
                <!--                            <template #label>Породы</template>-->
                <!--                            <template #default>-->
                <!--                                <UiSelect-->
                <!--                                    v-model="v$.breeds.$model"-->
                <!--                                    :error="getError('breeds')"-->
                <!--                                    placeholder="Выберите породы"-->
                <!--                                    multiple-->
                <!--                                    :options="breedOptions"-->
                <!--                                    @update:model-value="onBreedSelect"-->
                <!--                                />-->
                <!--                            </template>-->
                <!--                        </UiFormCell>-->

                <!--                        <UiFormCell :error="getError('services')">-->
                <!--                            <template #label>Услуги</template>-->
                <!--                            <template #default>-->
                <!--                                <UiSelect-->
                <!--                                    v-model="v$.services.$model"-->
                <!--                                    :error="getError('services')"-->
                <!--                                    placeholder="Выберите услуги"-->
                <!--                                    multiple-->
                <!--                                    :options="servicesOptions"-->
                <!--                                />-->
                <!--                            </template>-->
                <!--                        </UiFormCell>-->
                <!--                    </div>-->
                <!--                </transition>-->

                <UiFormCell :error="getError('salary')">
                    <template #label>{{ displaySalary.label }}</template>
                    <template #default>
                        <UiInput
                            v-model="v$.salary.$model"
                            :placeholder="displaySalary.placeholder"
                            :error="getError('salary')"
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

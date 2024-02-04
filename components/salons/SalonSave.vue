<script setup lang="ts">
import { defu } from 'defu';
import type { Tables } from '~/types/supabase';
import type { Nullable } from '~/types';

interface IValue extends Tables<'Salon'> {
    location: {
        lat: Nullable<number>;
        lng: Nullable<number>;
        address: Nullable<string>;
    }
    staff: string[],
}

type ValueType = Pick<IValue, 'avatar' | 'close_at' | 'location' | 'name' | 'open_at' | 'price' | 'staff'>;

const props = defineProps<{ value?: IValue }>();
const emit = defineEmits<{
    close: [void];
}>();

const storeCompany = useStoreCompany();
const storeModal = useStoreModal();

const actualValue: ValueType = reactive(defu(props.value, {
    name: '',
    avatar: '',
    open_at: '',
    close_at: '',
    price: null,
    location: {
        lat: null,
        lng: null,
        address: null,
    },
    staff: [],
}));

const { v$, getError, getInvalidState } = useValidate(computed(() => ({
    name: ['required'],
    avatar: [],
    open_at: ['required'],
    close_at: ['required'],
    price: ['required'],
    location: {
        lat: ['required'],
        lng: ['required'],
        address: ['required'],
    },
    staff: [],
})), actualValue);

async function onSubmit() {
    try {
        if (await getInvalidState()) {
            return false;
        }

        if (!props.value) {
            const data = await $fetch('/api/salons', {
                method: 'POST',
                body: {
                    ...actualValue,
                    company_id: storeCompany.detail.id,
                },
            });

            if (data?.id) {
                navigateTo(`/salons/${data.id}`);
            }
        } else {
            await $fetch(`/api/salons/${props.value.id}`, {
                method: 'PATCH',
                body: actualValue,
            });
        }
        emit('close');
    } catch (e) {
        console.error('SALON_SAVE:ON_SUBMIT:', e);
    }
}

const isLoading = ref(false);
const staffList = ref <{id: string, name: Nullable<string>}[]>([]);

async function fetchStaff() {
    try {
        isLoading.value = true;

        const { data } = await $fetch('/api/staff', {
            params: {
                company_id: storeCompany.detail.id,
            },
        });

        if (!data) {
            return false;
        }

        staffList.value = data.map(item => ({
            id: item.id,
            name: item.full_name,
        }));
    } catch (e) {
        console.error('SALON_SAVE:FETCH_STAFF:', e);
    } finally {
        isLoading.value = false;
    }
}


onMounted(() => {
    fetchStaff();
});

function onCreateStaff() {
    storeModal.open({
        component: defineAsyncComponent(() => import('~/components/staff/Save/StaffSave.vue')),
        onClose: fetchStaff,
    });
}
</script>

<template>
    <UiModalPopupWrapper
        tag="form"
        :loading="isLoading"
        class="SalonSave"
        @submit.prevent="onSubmit"
        @close="$emit('close')"
    >
        <template #header>
            <h4>
                <template v-if="!value">Добавить</template>
                <template v-else>Редактировать</template>
                салон
            </h4>
        </template>

        <template #default>
            <div :class="$style.form">
                <UiFormCell :error="getError('name')">
                    <template #label>
                        Название салона
                    </template>

                    <template #default>
                        <UiInput
                            v-model="v$.name.$model"
                            :error="getError('name')"
                            placeholder="Введите название салона"
                        />
                    </template>
                </UiFormCell>

                <UiFormCell :error="getError('avatar')">
                    <template #label>Изображение салона</template>
                    <template #default>
                        <UiFileInput
                            v-model="v$.avatar.$model"
                            :error="getError('avatar')"
                            is-image
                        />
                    </template>
                </UiFormCell>

                <UiFormCell :error="getError('open_at') || getError('close_at')">
                    <template #label>
                        Укажите время работы
                    </template>

                    <template #default>
                        <div :class="$style.cellWrapper">
                            <UiTimeSelect
                                v-model="v$.open_at.$model"
                                placeholder="Открытие"
                                :error="getError('open_at')"
                            />
                            -
                            <UiTimeSelect
                                v-model="v$.close_at.$model"
                                placeholder="Закрытие"
                                :error="getError('close_at')"
                            />
                        </div>
                    </template>
                </UiFormCell>

                <UiFormCell :error="getError('price')">
                    <template #label>
                        Ежемесячная аренда
                    </template>

                    <template #default>
                        <UiInput
                            v-model="v$.price.$model"
                            placeholder="Введите стоимость арендной платы"
                            :error="getError('price')"
                        />
                    </template>
                </UiFormCell>

                <UiFormCell :error="getError('staff')">
                    <template #label>
                        Команда салона
                    </template>

                    <template #default>
                        <UiSelect
                            v-model="v$.staff.$model"
                            multiple
                            :error="getError('staff')"
                            placeholder="Выберете сотрундиков"
                            :options="staffList"
                        >
                            <template #body-header>
                                <UiButton
                                    type="button"
                                    size="x-small"
                                    @click="onCreateStaff"
                                >
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

.cellWrapper {
    display: flex;
    align-items: center;
    column-gap: calc(var(--ui-unit) * 4);
}
</style>

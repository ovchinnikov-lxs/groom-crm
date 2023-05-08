<script setup lang="ts">
// Types
import type { PropType } from 'vue';

// Composables
import { useValidate } from '~/composables/useValidate';

// Constants
import { ROLES_KEYS, ROLES_OPTIONS } from 'assets/ts/constants/roles';
import UiRichText from '~/components/ui/UiRichText/UiRichText.vue';

const props = defineProps({
    type: {
        type: String as PropType<'create' | 'update'>,
        default: 'create',
    },
});

const actualValue = reactive<{
    full_name: string | null
    phone: string | null
    roles: Array<string>
    preview: string | null
    description: string | null
    commission: number | null
    breeds: Array<string>
    services: Array<string>
    hourly_rates: number | null
}>({
    full_name: '',
    phone: '',
    roles: [],
    preview: '',
    description: '',
    commission: null,
    breeds: [],
    services: [],
    hourly_rates: null,
});
const { $v, getError, getInvalidState } = useValidate(computed(() => ({
    full_name: ['required'],
    phone: ['required', 'phone'],
    roles: ['required'],

    ...actualValue.roles.includes(ROLES_KEYS.MASTER) && {
        preview: ['required'],
        description: ['required'],
        commission: ['required', { name: 'maxLength', param: 100 }, { name: 'minLength', param: 1 }],
        breeds: [],
        services: ['required'],
    },

    ...actualValue.roles.includes(ROLES_KEYS.ADMIN) && !actualValue.roles.includes(ROLES_KEYS.MASTER) && {
        hourly_rates: ['required'],
    },
})), actualValue);

// todo: from backend
const breedOptions = [
    {
        id: '1',
        name: 'Чихуахуа',
    },
    {
        id: '2',
        name: 'Мальтез',
    },
];

/**
 *  todo: from backend - Список услуг - базовые по типу - чистка зубов и тд,
 *  остальные услуги будут подгружаться с бэка относительно выбранных пород
 */
const servicesOptions = ref([
    {
        id: '1',
        name: 'Спа процедуры',
    },
    {
        id: '2',
        name: 'Чистка зубов',
    },
]);
async function onBreedSelect() {
    try {
        console.log('fetch services by selected breeds and add to servicesOptions');
    } catch (e) {
        console.log(e);
    }
}

async function onSubmit() {
    try {
        if (await getInvalidState()) {
            return false;
        }

        console.log(actualValue, props.type);
    } catch (e) {
        console.log(e);
    }
}
</script>

<template>
    <UiModalPopupWrapper
        tag="form"
        class="StaffSave"
        @submit.prevent="onSubmit"
    >
        <template #header>
            <h4>
                <template v-if="type === 'create'">
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
                <UiFormCell :error="getError('roles')">
                    <template #label>Роли</template>

                    <template #default>
                        <UiSelect
                            v-model="$v.roles.$model"
                            :options="ROLES_OPTIONS"
                            :error="getError('roles')"
                            multiple
                        />
                    </template>
                </UiFormCell>

                <UiFormCell :error="getError('full_name')">
                    <template #label>Имя и Фамилия</template>

                    <template #default>
                        <UiInput
                            v-model="$v.full_name.$model"
                            :error="getError('full_name')"
                            placeholder="Введите имя и фамилию"
                        />
                    </template>
                </UiFormCell>

                <UiFormCell :error="getError('phone')">
                    <template #label>Номер телефона</template>

                    <template #default>
                        <UiInput
                            v-model="$v.phone.$model"
                            :error="getError('phone')"
                            placeholder="Введите номер телефона"
                        />
                    </template>
                </UiFormCell>

                <transition name="bottom">
                    <div v-if="actualValue.roles.includes(ROLES_KEYS.MASTER)" :class="$style.form">
                        <UiFormCell :error="getError('preview')">
                            <template #label>Аватар</template>
                            <template #default>
                                <UiFileInput
                                    v-model="$v.preview.$model"
                                    :error="getError('preview')"
                                    is-image
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
                                    placeholder="Введите описание мастера"
                                />
                            </template>
                        </UiFormCell>

                        <UiFormCell :error="getError('commission')">
                            <template #label>Процент от стрижки</template>
                            <template #default>
                                <UiInput
                                    v-model="$v.commission.$model"
                                    placeholder="Введите процент выручки от стрижки"
                                    :error="getError('commission')"
                                />
                            </template>
                        </UiFormCell>

                        <UiFormCell :error="getError('breeds')">
                            <template #label>Породы</template>
                            <template #default>
                                <UiSelect
                                    v-model="$v.breeds.$model"
                                    :error="getError('breeds')"
                                    placeholder="Выберите породы"
                                    multiple
                                    :options="breedOptions"
                                    @update:model-value="onBreedSelect"
                                />
                            </template>
                        </UiFormCell>

                        <UiFormCell :error="getError('services')">
                            <template #label>Услуги</template>
                            <template #default>
                                <UiSelect
                                    v-model="$v.services.$model"
                                    :error="getError('services')"
                                    placeholder="Выберите услуги"
                                    multiple
                                    :options="servicesOptions"
                                />
                            </template>
                        </UiFormCell>
                    </div>
                </transition>

                <transition name="bottom">
                    <UiFormCell
                        v-if="actualValue.roles.includes(ROLES_KEYS.ADMIN) && !actualValue.roles.includes(ROLES_KEYS.MASTER)"
                        :error="getError('hourly_rates')"
                        :class="$style.form"
                    >
                        <template #label>Почасовая оплата</template>
                        <template #default>
                            <UiInput
                                v-model="$v.hourly_rates.$model"
                                :error="getError('hourly_rates')"
                                placeholder="Введите почасовую оплату"
                            />
                        </template>
                    </UiFormCell>
                </transition>
            </div>
        </template>

        <template #footer>
            <UiButton size="small">Сохранить</UiButton>
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

<script setup lang="ts">
// Types
import type { PropType } from 'vue';

// Constants
import { ROLES_KEYS } from 'assets/ts/constants/roles';
import { IStaffItem, IStaffSave } from 'assets/ts/types/staff';

const props = defineProps({
    method: {
        type: String as PropType<'POST' | 'PATCH'>,
        default: 'POST',
    },

    value: {
        type: Object as PropType<IStaffItem>,
        default: () => ({}),
    },

    onCloseModal: {
        type: Function,
        default: () => ({}),
    },
});

const actualValue = reactive<IStaffSave>({
    fullName: '',
    phone: '',
    roles: [],
    preview: '',
    description: '',
    salary: 0,
    // breeds: [],
    // services: [],
});

watch(() => props.value, (val: IStaffItem) => {
    if (!Object.keys(val).length) {
        return false;
    }

    actualValue.fullName = val.fullName;
    actualValue.phone = val.phone;
    actualValue.roles = val.roles.map(r => r.id);
    actualValue.preview = val.preview;
    actualValue.description = val.description;
    actualValue.salary = val.salary;
}, { immediate: true });
const { list: rolesOptions } = useRoles();

const roleIs = computed(() => (key: string) => {
    const keyRole = rolesOptions.find(r => r.value === key);

    if (!keyRole) {
        return false;
    }

    return actualValue.roles.includes(keyRole.id);
});

const { $v, getError, getInvalidState } = useValidate(computed(() => ({
    fullName: ['required'],
    phone: ['required', 'phone'],
    roles: ['required'],

    ...roleIs.value(ROLES_KEYS.MASTER) && {
        preview: [],
        description: ['required'],
        salary: ['required', { name: 'maxLength', param: 100 }, { name: 'minLength', param: 1 }],
        // breeds: [],
        // services: ['required'],
    },

    ...roleIs.value(ROLES_KEYS.ADMIN) && !roleIs.value(ROLES_KEYS.MASTER) && {
        salary: ['required'],
    },
})), actualValue);

// todo: from backend
// const breedOptions = [
//     {
//         id: '1',
//         name: 'Чихуахуа',
//     },
//     {
//         id: '2',
//         name: 'Мальтез',
//     },
// ];

/**
 *  todo: from backend - Список услуг - базовые по типу - чистка зубов и тд,
 *  остальные услуги будут подгружаться с бэка относительно выбранных пород
 */
// const servicesOptions = ref([
//     {
//         id: '1',
//         name: 'Спа процедуры',
//     },
//     {
//         id: '2',
//         name: 'Чистка зубов',
//     },
// ]);
// async function onBreedSelect() {
//     try {
//         console.log('fetch services by selected breeds and add to servicesOptions');
//     } catch (e) {
//         console.log(e);
//     }
// }
const $emit = defineEmits<{(e: 'close'): void }>();


async function onSubmit() {
    try {
        if (await getInvalidState()) {
            return false;
        }

        const { $api } = useNuxtApp();

        if (props.method === 'POST') {
            await $api.staff.create(actualValue);
        } else if (props.value) {
            await $api.staff.update(props.value.id, actualValue);
        }

        if (props.onCloseModal) {
            props.onCloseModal();
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
        class="StaffSave"
        @submit.prevent="onSubmit"
    >
        <template #header>
            <h4>
                <template v-if="method === 'POST'">
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
                            :options="rolesOptions"
                            :error="getError('roles')"
                            multiple
                        />
                    </template>
                </UiFormCell>

                <UiFormCell :error="getError('fullName')">
                    <template #label>Имя и Фамилия</template>

                    <template #default>
                        <UiInput
                            v-model="$v.fullName.$model"
                            :error="getError('fullName')"
                            placeholder="Введите имя и фамилию"
                        />
                    </template>
                </UiFormCell>

                <UiFormCell :error="getError('phone')">
                    <template #label>Номер телефона</template>

                    <template #default>
                        <UiInput
                            id="phone"
                            v-model="$v.phone.$model"
                            :error="getError('phone')"
                            placeholder="Введите номер телефона"
                        />
                    </template>
                </UiFormCell>

                <transition name="bottom">
                    <div v-if="roleIs(ROLES_KEYS.MASTER)" :class="$style.form">
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

                        <UiFormCell :error="getError('salary')">
                            <template #label>Процент от стрижки</template>
                            <template #default>
                                <UiInput
                                    v-model="$v.salary.$model"
                                    placeholder="Введите процент выручки от стрижки"
                                    :error="getError('salary')"
                                />
                            </template>
                        </UiFormCell>

                        <!--                        <UiFormCell :error="getError('breeds')">-->
                        <!--                            <template #label>Породы</template>-->
                        <!--                            <template #default>-->
                        <!--                                <UiSelect-->
                        <!--                                    v-model="$v.breeds.$model"-->
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
                        <!--                                    v-model="$v.services.$model"-->
                        <!--                                    :error="getError('services')"-->
                        <!--                                    placeholder="Выберите услуги"-->
                        <!--                                    multiple-->
                        <!--                                    :options="servicesOptions"-->
                        <!--                                />-->
                        <!--                            </template>-->
                        <!--                        </UiFormCell>-->
                    </div>
                </transition>

                <transition name="bottom">
                    <UiFormCell
                        v-if="roleIs(ROLES_KEYS.ADMIN) && !roleIs(ROLES_KEYS.MASTER)"
                        :error="getError('salary')"
                        :class="$style.form"
                    >
                        <template #label>Ежемесячная оплата</template>
                        <template #default>
                            <UiInput
                                v-model="$v.salary.$model"
                                :error="getError('salary')"
                                placeholder="Введите зарплату"
                            />
                        </template>
                    </UiFormCell>
                </transition>
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

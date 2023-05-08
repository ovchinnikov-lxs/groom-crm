<script setup lang="ts">
// Composables
import { useValidate } from '~/composables/useValidate';

// Constants
import { ROLES_KEYS } from 'assets/ts/constants/roles';

const actualValue = reactive<{
    full_name: string | null
    phone: string | null
    roles: Array<string>
    preview: string | null
    description: string | null
    breeds: Array<string>
    services: Array<string>
    company_name: string
}>({
    full_name: '',
    phone: '',
    roles: ['owner', 'master'],
    preview: '',
    description: '',
    breeds: [],
    services: [],
    company_name: 'Милана',
});

const { $v, getError, getInvalidState } = useValidate(computed(() => ({
    full_name: ['required'],
    phone: ['required', 'phone'],
    roles: ['required'],

    ...actualValue.roles.includes(ROLES_KEYS.MASTER) && {
        preview: ['required'],
        description: ['required'],
        breeds: [],
        services: ['required'],
    },

    ...actualValue.roles.includes(ROLES_KEYS.OWNER) && {
        company_name: ['required'],
    },
})), actualValue);

async function onSubmit() {
    try {
        if (await getInvalidState()) {
            return false;
        }

        console.log('onSubmit');
    } catch (e) {
        console.log(e);
    }
}
</script>

<template>
    <div class="UserFormInfo">
        <form :class="$style.wrapper" @submit.prevent="onSubmit">

            <h5>Общая информация</h5>

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

            <template v-if="actualValue.roles.includes(ROLES_KEYS.OWNER)">
                <UiFormCell :error="getError('company_name')">
                    <template #label>Название компании</template>

                    <template #default>
                        <UiInput
                            v-model="$v.company_name.$model"
                            :error="getError('company_name')"
                            placeholder="Введите название компании"
                        />
                    </template>
                </UiFormCell>
            </template>

            <template v-if="actualValue.roles.includes(ROLES_KEYS.MASTER)">
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
                        <!--todo: Проблем с гидратацией, надо выявить и поправить-->
                        <ClientOnly>
                            <UiRichText
                                v-model="$v.description.$model"
                                rows="4"
                                :error="getError('description')"
                                placeholder="Введите описание мастера"
                            />
                        </ClientOnly>
                    </template>
                </UiFormCell>
            </template>

            <UiButton size="small">
                Сохранить
            </UiButton>
        </form>
    </div>
</template>

<style module lang="scss">
.wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    row-gap: calc(var(--ui-unit) * 6);
}
</style>

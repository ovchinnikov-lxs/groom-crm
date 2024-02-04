<script setup lang="ts">
const storeProfile = useStoreProfile();
const storeCompany = useStoreCompany();
const storeToast = useStoreToast();

const actualValue = reactive({
    full_name: storeProfile.profile.full_name,
    avatar: storeProfile.profile.avatar,
    description: storeProfile.profile.description,
    company: {
        name: storeCompany.detail.name,
        company_id: storeCompany.detail.id,
    },
});

const { v$, getError, getInvalidState, updateValue } = useValidate(computed(() => ({
    full_name: ['required'],
    avatar: storeProfile.isMaster ? ['required'] : [],
    description: storeProfile.isMaster ? ['required'] : [],
    company: {
        name: storeProfile.isOwner ? ['required'] : [],
        company_id: [],
    },
})), actualValue);

async function onSubmit() {
    try {
        if (await getInvalidState()) {
            return false;
        }

        const promiseList = [];

        promiseList.push($fetch('/api/profile', {
            body: actualValue,
            method: 'PATCH',
        }));

        if (storeProfile.isOwner) {
            promiseList.push($fetch('/api/company', {
                body: actualValue.company,
                method: 'PATCH',
            }));
        }

        await Promise.all(promiseList);
        updateValue();

        storeToast.add({
            type: 'success',
            text: 'Данные успешно обновлены',
        });
    } catch (e) {
        storeToast.add({
            type: 'error',
            text: 'Упс что то пошло не так',
        });
        console.error('USER_FORM_INFO:ON_SUBMIT', e);
    }
}
</script>

<template>
    <div class="ProfileFormInfo">
        <form :class="$style.wrapper" @submit.prevent="onSubmit">

            <h5>Общая информация</h5>

            <UiFormCell v-if="storeProfile.isOwner" :error="getError('company.name')">
                <template #label>Название компании</template>
                <template #default>
                    <UiInput
                        v-model="v$.company.name.$model"
                        :error="getError('company.name')"
                        placeholder="Введите название организации"
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

            <UiFormCell :error="getError('avatar')">
                <template #label>Аватар</template>
                <template #default>
                    <UiFileInput
                        v-model="v$.avatar.$model"
                        :error="getError('avatar')"
                        is-image
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
                        placeholder="Введите описание мастера"
                    />
                </template>
            </UiFormCell>

            <UiButton>
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

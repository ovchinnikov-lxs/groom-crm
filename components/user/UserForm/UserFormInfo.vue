<script setup lang="ts">
const auth = useAuth();
const { isMaster, isOwner } = useUser();
const company = useCompany();

const actualValue = reactive<{
    fullName: string | null
    phone: string | null
    preview: string | null
    description: string | null
    // breeds: Array<string>
    // services: Array<string>
    companyName: string
}>({
    fullName: auth.user.fullName,
    phone: auth.user.phone,
    preview: auth.user.preview,
    description: auth.user.description,
    // breeds: [],
    // services: [],
    companyName: company.detail.name,
});

const { $v, getError, getInvalidState, updateValue } = useValidate(computed(() => ({
    fullName: ['required'],
    phone: ['required', 'phone'],

    ...isMaster && {
        preview: [],
        description: [],
        // breeds: [],
        // services: [],
    },

    ...isOwner && {
        companyName: ['required'],
    },
})), actualValue);

async function onSubmit() {
    try {
        if (await getInvalidState()) {
            return false;
        }

        const { $api } = useNuxtApp();

        await $api.user.updateInfo({
            fullName: actualValue.fullName,
            preview: actualValue.preview,
            description: actualValue.description,
        });
        await auth.fetchUser();

        if (isOwner) {
            await $api.company.updateInfo({
                name: actualValue.companyName,
            });
        }

        updateValue();
    } catch (e) {
        console.log(e);
    }
}
</script>

<template>
    <div class="UserFormInfo">
        <form :class="$style.wrapper" @submit.prevent="onSubmit">

            <h5>Общая информация</h5>

            <UiFormCell v-if="isOwner" :error="getError('companyName')">
                <template #label>Название организации</template>

                <template #default>
                    <UiInput
                        v-model="$v.companyName.$model"
                        :error="getError('companyName')"
                        placeholder="Введите название организации"
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
                        v-model="$v.phone.$model"
                        disabled
                        :error="getError('phone')"
                        placeholder="Введите номер телефона"
                    />
                </template>
            </UiFormCell>

            <template v-if="isMaster">
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

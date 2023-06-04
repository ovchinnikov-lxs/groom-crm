<script setup lang="ts">
import type { PropType } from 'vue';
import { ISalonDetail, ISalonSave } from 'assets/ts/types/salons';

const props = defineProps({
    value: {
        type: Object as PropType<ISalonDetail>,
        default: () => ({}),
    },
});

const actualValue = reactive<ISalonSave>({
    name: null,
    preview: null,
    openAt: '10:00',
    closeAt: '19:00',
    pricePerMonth: null,
    location: {
        lat: null,
        lng: null,
        address: null,
    },
});

watch(() => props.value, (val: ISalonDetail | null) => {
    if (val) {
        actualValue.name = val.name;
        actualValue.preview = val.preview;
        actualValue.openAt = val.openAt;
        actualValue.closeAt = val.closeAt;
        actualValue.pricePerMonth = val.pricePerMonth;
        actualValue.location = val.location;
    }
}, { immediate: true });

const { $v, getError, getInvalidState } = useValidate(computed(() => ({
    name: ['required'],
    preview: [],
    openAt: ['required'],
    closeAt: ['required'],
    pricePerMonth: ['required'],
    location: {
        lat: ['required'],
        lng: ['required'],
        address: ['required'],
    },
})), actualValue);


// const staffOptions = [];
const $emit = defineEmits<{(e: 'close'): void }>();

async function onSubmit() {
    try {
        if (await getInvalidState()) {
            return false;
        }

        const { $api, $routes } = useNuxtApp();

        if (!Object.keys(props.value).length) {
            const { data } = await $api.salons.create(actualValue);

            if (data.value) {
                navigateTo($routes.salons.detail(data.value.id));
            }
        } else if (props.value) {
            await $api.salons.update(props.value.id, actualValue);
        }
        $emit('close');
    } catch (e) {
        console.log(e);
    }
}

// function onCreateStaff() {
//     document.body.click();
//     modal.open({
//         component: defineAsyncComponent(() => import('~/components/staff/StaffSave.vue')),
//     });
// }
</script>

<template>
    <UiModalPopupWrapper
        tag="form"
        class="SalonSave"
        @submit.prevent="onSubmit"
        @close="$emit('close')"
    >
        <template #header>
            <h4>
                <template v-if="!Object.keys(value).length">Добавить</template>
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

                <!--                <UiFormCell :error="getError('staff')">-->
                <!--                    <template #label>-->
                <!--                        Команда салона-->
                <!--                    </template>-->

                <!--                    <template #default>-->
                <!--                        <UiSelect-->
                <!--                            v-model="$v.staff.$model"-->
                <!--                            multiple-->
                <!--                            :error="getError('staff')"-->
                <!--                            placeholder="Выберете сотрундиков"-->
                <!--                            :options="staffOptions"-->
                <!--                        >-->
                <!--                            <template #body-header>-->
                <!--                                <UiButton-->
                <!--                                    type="button"-->
                <!--                                    size="x-small"-->
                <!--                                    @click="onCreateStaff"-->
                <!--                                >-->
                <!--                                    Добавить сотрудника-->
                <!--                                </UiButton>-->
                <!--                            </template>-->
                <!--                        </UiSelect>-->
                <!--                    </template>-->
                <!--                </UiFormCell>-->

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

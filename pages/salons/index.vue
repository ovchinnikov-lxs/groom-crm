<script setup lang="ts">
import type { Tables } from '~/types/supabase';

useSeoMeta({
    title: 'Салоны',
});

const storeBreadcrumbs = useStoreBreadcrumbs();
const storeModal = useStoreModal();
const storeProfile = useStoreProfile();
const storeCompany = useStoreCompany();

const { data } = await useAsyncData(async () => await $fetch<{data: Tables<'Salon'>[]}>('/api/salons', {
    headers: useRequestHeaders(['cookie']),
}));

if (!data.value) {
    throw createError({
        statusCode: 404,
        message: 'Такой страницы не существует',
    });
}

storeBreadcrumbs.setList([{
    title: 'Салоны',
}]);

const actualList = computed(() => data?.value?.data || []);

function openCreateModal() {
    storeModal.open({
        component: defineAsyncComponent(() => import('~/components/salons/SalonSave.vue')),
    });
}

const disableCreateSalon = computed(() => {
    if (storeCompany.tariffCompanyIs(TARIFFS_KEY.PREMIUM)) {
        return false;
    }

    return Boolean(storeCompany.tariffCompanyIs(TARIFFS_KEY.BASIC) && actualList.value.length);
});
</script>

<template>
    <UiPage>
        <template #header>
            <LazyUiTooltip
                v-if="storeProfile.isOwner"
                :disabled="!disableCreateSalon"
                :class="$style.button"
            >
                <template #header>
                    <LazyUiButton :disabled="disableCreateSalon" @click="openCreateModal">
                        Добавить салон
                    </LazyUiButton>
                </template>
                <template #bottom>
                    <div :class="$style.tooltipBottom">
                        Для того чтобы создать больше одного салона,
                        оформите подписку <b>{{ TARIFFS_KEY.PREMIUM }}</b>
                    </div>
                </template>
            </LazyUiTooltip>
        </template>

        <template #default>
            <div class="SalonsList">
                <div v-if="actualList.length" :class="$style.wrapper">
                    <div
                        v-for="item in actualList"
                        :key="item.id"
                        :class="$style.plateWrapper"
                    >
                        <LazySalonsPlate
                            :id="item.id"
                            :name="item.name"
                            :preview="item.avatar"
                            :class="$style.plate"
                        />
                    </div>
                </div>

                <LazyUiEmpty v-else>
                    <template #text>Вы еще не создали ни один салон</template>
                </LazyUiEmpty>
            </div>
        </template>
    </UiPage>
</template>

<style lang="scss" module>
.button {
    margin-left: auto;
}

.tooltipBottom {
    width: calc(var(--ui-col) * 6);
    text-align: center;

    b {
        color: var(--ui-primary-color);
    }
}

.wrapper {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: calc(var(--ui-unit) * 10);
    grid-row-gap: calc(var(--ui-unit) * 10);
    width: 100%;
    height: 100%;
}

.plateWrapper {
    @include aspect-ratio(410, 360);
}

.plate {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
</style>

<script setup lang="ts">
import type { IScheduleMaster } from '~/components/salons/detail/SalonsDetailSchedule.vue';
import type { ISalonDetail } from '~/types/salons';

const route = useRoute();

const { data, refresh } = await useAsyncData(async () => await $fetch<ISalonDetail>(`/api/salons/${route.params.salonId}`, {
    headers: useRequestHeaders(['cookie']),
}));

if (!data.value) {
    throw createError({
        statusCode: 404,
        message: 'Такой страницы не существует',
    });
}

useSeoMeta({
    title: data?.value?.name,
});

const storeModal = useStoreModal();
const storeBreadcrumbs = useStoreBreadcrumbs();

watch(() => data?.value?.name, value => {
    storeBreadcrumbs.setList([
        {
            title: 'Салоны',
            to: '/salons',
        },
        {
            title: String(value),
        },
    ]);
}, { immediate: true });

function onUpdate() {
    storeModal.open({
        component: defineAsyncComponent(() => import('~/components/salons/SalonSave.vue')),
        componentProps: {
            value: {
                ...data.value,
                staff: data.value?.staff.map(i => i.user.id),
            },
        },
        onClose: () => refresh(),
    });
}

async function onDelete() {
    try {
        if (!data?.value?.id) {
            return false;
        }

        await $fetch(`/api/salons/${data.value.id}`, {
            method: 'DELETE',
        });
        navigateTo('/salons');
    } catch (e) {
        console.log(e);
    }
}

const scheduleMock = computed(() => data.value?.staff
    .filter(item => [ROLES_KEYS.OWNER, ROLES_KEYS.MASTER].includes(item.user.role))
    .map(item => ({
        id: item.user.id,
        name: item.user.full_name,
        schedule: [
            {
                id: '1',
                service_name: 'Полный комплекс',
                pet_breed: 'Йорк.Терьер',
                pet_name: 'Федя',
                service_price: 2500,
                service_time: 120,
                booked_time: '10:00',
                status: 'active',
            },
            {
                id: '2',
                service_name: 'Полный комплекс',
                pet_breed: 'Йорк.Терьер',
                pet_name: 'Федя',
                service_price: 2500,
                service_time: 120,
                booked_time: '12:00',
                status: 'ready',
            },
            {
                id: '3',
                service_name: 'Полный комплекс',
                pet_breed: 'Йорк.Терьер',
                pet_name: 'Федя',
                service_price: 2500,
                service_time: 15,
                booked_time: '15:00',
                status: 'cancelled',
            },

            {
                id: '4',
                service_name: 'Полный комплекс',
                pet_breed: 'Йорк.Терьер',
                pet_name: 'Федя',
                service_price: 2500,
                service_time: 15,
                booked_time: '15:30',
                status: 'ready',
            },
            {
                id: '5',
                service_name: 'Полный комплекс',
                pet_breed: 'Йорк.Терьер',
                pet_name: 'Федя',
                service_price: 2500,
                service_time: 15,
                booked_time: '15:45',
                status: 'cancelled',
            },
            {
                id: '6',
                service_name: 'Полный комплекс',
                pet_breed: 'Йорк.Терьер',
                pet_name: 'Федя',
                service_price: 2500,
                service_time: 15,
                booked_time: '16:00',
                status: 'ready',
            },
        ],
    })));
</script>

<template>
    <LazyUiPage v-if="data" class="SalonDetailPage">
        <template #default>
            <div :class="$style.wrapper">
                <LazySalonsDetailInfo
                    :salon="data"
                    :class="$style.info"
                    @update="onUpdate"
                    @delete="onDelete"
                />

                <LazySalonsDetailSchedule
                    :open-at="data?.open_at"
                    :close-at="data?.close_at"
                    :schedule="scheduleMock as IScheduleMaster[]"
                    :class="$style.schedule"
                />
            </div>
        </template>
    </LazyUiPage>
</template>

<style lang="scss" module>
.wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    height: 100%;
    row-gap: calc(var(--ui-unit) * 6);
}

.info {
    width: 100%;
}

.schedule {
    width: 100%;
    height: 100%;
}
</style>

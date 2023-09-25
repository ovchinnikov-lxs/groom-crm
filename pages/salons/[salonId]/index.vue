<script setup lang="ts">
import { modal } from '~/composables/modal';
import { IScheduleMaster } from '~/components/salons/detail/SalonsDetailSchedule.vue';
import { ISalonDetail } from '~/types/salons';

const { $routes, $api } = useNuxtApp();

const { data: salon, refresh } = await $api.salons.getDetail<ISalonDetail>(String(useRoute().params.salonId), {
    key: 'salon',
});

if (!salon.value) {
    navigateTo($routes.salons.list);
}

function updateBreadcrumbs() {
    const breadcrumbs = useBreadcrumbs();

    breadcrumbs.setList([
        {
            title: 'Салоны',
            to: $routes.salons.list,
        },
        {
            title: salon.value?.name || '',
        },
    ]);
}

updateBreadcrumbs();

function onUpdate() {
    modal.open({
        component: defineAsyncComponent(() => import('~/components/salons/SalonSave.vue')),
        componentProps: {
            value: salon,
        },
        onClose: async () => {
            await refresh();
            updateBreadcrumbs();
        },
    });
}

async function onDelete() {
    try {
        await $api.salons.delete(String(useRoute().params.salonId));
        navigateTo($routes.salons.list);
    } catch (e) {
        console.log(e);
    }
}

const scheduleMock: IScheduleMaster[] = [
    // {
    //     id: '1',
    //     name: 'Анастасия Молькова',
    //     schedule: [
    //         {
    //             id: '1',
    //             service_name: 'Полный комплекс',
    //             pet_breed: 'Йорк.Терьер',
    //             pet_name: 'Федя',
    //             service_price: 2500,
    //             service_time: 120,
    //             booked_time: '10:00',
    //             status: 'active',
    //         },
    //         // {
    //         //     id: '2',
    //         //     service_name: 'Полный комплекс',
    //         //     pet_breed: 'Йорк.Терьер',
    //         //     pet_name: 'Федя',
    //         //     service_price: 2500,
    //         //     service_time: 120,
    //         //     booked_time: '12:00',
    //         //     status: 'ready',
    //         // },
    //         // {
    //         //     id: '3',
    //         //     service_name: 'Полный комплекс',
    //         //     pet_breed: 'Йорк.Терьер',
    //         //     pet_name: 'Федя',
    //         //     service_price: 2500,
    //         //     service_time: 15,
    //         //     booked_time: '15:00',
    //         //     status: 'cancelled',
    //         // },
    //         //
    //         // {
    //         //     id: '4',
    //         //     service_name: 'Полный комплекс',
    //         //     pet_breed: 'Йорк.Терьер',
    //         //     pet_name: 'Федя',
    //         //     service_price: 2500,
    //         //     service_time: 15,
    //         //     booked_time: '15:30',
    //         //     status: 'ready',
    //         // },
    //         // {
    //         //     id: '5',
    //         //     service_name: 'Полный комплекс',
    //         //     pet_breed: 'Йорк.Терьер',
    //         //     pet_name: 'Федя',
    //         //     service_price: 2500,
    //         //     service_time: 15,
    //         //     booked_time: '15:45',
    //         //     status: 'cancelled',
    //         // },
    //         // {
    //         //     id: '6',
    //         //     service_name: 'Полный комплекс',
    //         //     pet_breed: 'Йорк.Терьер',
    //         //     pet_name: 'Федя',
    //         //     service_price: 2500,
    //         //     service_time: 15,
    //         //     booked_time: '16:00',
    //         //     status: 'ready',
    //         // },
    //     ],
    // },
];
</script>

<template>
    <UiPage class="SalonDetailPage">
        <template #default>
            <div :class="$style.wrapper">
                <SalonsDetailInfo
                    v-bind="salon"
                    :class="$style.info"
                    @update="onUpdate"
                    @delete="onDelete"
                />

                <SalonsDetailSchedule
                    :open-at="salon.openAt"
                    :close-at="salon.closeAt"
                    :schedule="scheduleMock"
                    :class="$style.schedule"
                />

            </div>
        </template>
    </UiPage>
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

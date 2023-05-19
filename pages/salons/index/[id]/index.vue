<script setup lang="ts">
import { useBreadCrumbsStore } from '~/stores/bread-crumbs';

const breadCrumbs = useBreadCrumbsStore();
const { $routes } = useNuxtApp();


const salonMock = {
    id: '1',
    name: 'Название салона',
    image: 'https://avatars.mds.yandex.net/get-tycoon/1654178/2a0000017b64d0ab711bf1342c01628c4af3/priority-headline-main-narrow',
    openAt: '10:00',
    closeAt: '19:00',
    masters: [
        {
            id: '1',
            name: 'Анастасия Молькова',
        },
        {
            id: '2',
            name: 'Анастасия',
        },
        {
            id: '3',
            name: 'Ольга',
        },
        {
            id: '4',
            name: 'Олеся',
        },
        {
            id: '5',
            name: 'Надежда',
        },
    ],
};


breadCrumbs.changeBreadCrumbs([
    {
        title: 'Салоны',
        to: $routes.salons.list,
    },
    {
        title: salonMock.name,
    },
]);

const scheduleMock = [
    {
        id: '1',
        name: 'Анастасия Молькова',
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
    },
];
</script>


<template>
    <UiPage class="SalonDetailPage">
        <template #default>
            <div :class="$style.wrapper">

                <SalonsDetailInfo v-bind="salonMock" :class="$style.info"/>

                <SalonsDetailSchedule
                    :open-at="salonMock.openAt"
                    :close-at="salonMock.closeAt"
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

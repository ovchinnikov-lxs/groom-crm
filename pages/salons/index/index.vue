<script setup lang="ts">
import { modal } from '~/composables/modal';
import { useBreadCrumbsStore } from '~/stores/bread-crumbs';
import SalonsPlate from '~/components/salons/SalonsPlate.vue';

const breadCrumbs = useBreadCrumbsStore();

breadCrumbs.changeBreadCrumbs([{
    title: 'Салоны',
}]);

const mockList = [
    {
        id: '1',
        name: 'м. Сокол',
        image: '',
    },
    {
        id: '2',
        name: 'м. Новаторская',
        image: 'https://avatars.mds.yandex.net/get-tycoon/1654178/2a0000017b64d0ab711bf1342c01628c4af3/priority-headline-main-narrow',
    },
    {
        id: '3',
        name: 'м. Сокол',
        image: '',
    },
];

function openCreateModal() {
    modal.open({
        component: shallowRef(defineAsyncComponent(() => import('~/components/salons/SalonCreate.vue'))),
    });
}
</script>

<template>
    <UiPage>
        <template #header>
            <UiButton :class="$style.button" @click="openCreateModal">Создать салон</UiButton>
        </template>

        <template #default>
            <div class="SalonsList">
                <div :class="$style.wrapper">
                    <div
                        v-for="item in mockList"
                        :key="item.id"
                        :class="$style.plateWrapper"
                    >
                        <SalonsPlate
                            :id="item.id"
                            :name="item.name"
                            :image="item.image"
                            :class="$style.plate"
                        />
                    </div>
                </div>
            </div>
        </template>
    </UiPage>
</template>

<style lang="scss" module>
.button {
    margin-left: auto;
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

.modal {
    position: fixed;
    top: 50px;
    left: 50%;
    padding: 16px;
    background: var(--ui-additional-light-color);
}

.plate {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
</style>

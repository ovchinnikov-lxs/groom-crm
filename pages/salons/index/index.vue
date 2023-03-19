<script setup lang="ts">
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
        image: 'https://s3-alpha-sig.figma.com/img/f3cb/94ea/b06af86106f00978c9edeb3986bd22ad?Expires=1679875200&Signature=WFMTYb9PLm~CLPj3Uk8baxlr2FYDFd1jObBcDoZeEJyjVBWYYmXIDoM-qbnZ3r0h8a5EBFSMk9JoproEIGo-JGeFCnkLQAc~njpE5pL5eL11ciZDe8jYq3Hi0PAqRU0EtOaDOYzTflmEAoaWoDCRli-perDrMaYlIJNpAVJryG0NSFb7GbJ~XAwU~HYbPAWDxgIg5iyvOwJVTh9zkAZ0XcQX5I7SzrSckR9AYm4k0cL0B44nxOim0Xk82oKVmhL2boeA8iTIVB9QCakeYChBdjNVxsobM2B028qQeyOjOP2PI6AKYPZ7ObSX2p2DdKHoTuUYXlinSE91wA4mRhmlMg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
    },
    {
        id: '3',
        name: 'м. Сокол',
        image: '',
    },
    {
        id: '4',
        name: 'м. Сокол',
        image: 'https://s3-alpha-sig.figma.com/img/f3cb/94ea/b06af86106f00978c9edeb3986bd22ad?Expires=1679875200&Signature=WFMTYb9PLm~CLPj3Uk8baxlr2FYDFd1jObBcDoZeEJyjVBWYYmXIDoM-qbnZ3r0h8a5EBFSMk9JoproEIGo-JGeFCnkLQAc~njpE5pL5eL11ciZDe8jYq3Hi0PAqRU0EtOaDOYzTflmEAoaWoDCRli-perDrMaYlIJNpAVJryG0NSFb7GbJ~XAwU~HYbPAWDxgIg5iyvOwJVTh9zkAZ0XcQX5I7SzrSckR9AYm4k0cL0B44nxOim0Xk82oKVmhL2boeA8iTIVB9QCakeYChBdjNVxsobM2B028qQeyOjOP2PI6AKYPZ7ObSX2p2DdKHoTuUYXlinSE91wA4mRhmlMg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
    },
];
</script>

<template>
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

<style lang="scss" module>
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

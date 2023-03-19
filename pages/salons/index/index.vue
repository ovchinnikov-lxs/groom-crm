<script setup lang="ts">
import { useBreadCrumbsStore } from '~/stores/bread-crumbs';

const breadCrumbs = useBreadCrumbsStore();

breadCrumbs.changeBreadCrumbs([{
    title: 'Салоны',
}]);
</script>

<template>
    <div class="SalonsList">
        SalonsList

        <nuxt-link to="/salons/1">detail</nuxt-link>
    </div>
</template>

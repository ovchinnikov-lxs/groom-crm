<script setup lang="ts">
import DefaultMenuUser from '~/components/default/DefaultMenu/DefaultMenuUser.vue';

const { $routes } = useNuxtApp();

const navItems = [
    {
        to: $routes.salons.list,
        title: 'Салоны',
        icon: 'salons',
    },
    {
        to: $routes.staff.list,
        title: 'Команда',
        icon: 'staff',
    },
    {
        to: $routes.finance.detail,
        title: 'Финансы',
        icon: 'finance',
    },
];
</script>

<template>
    <div class="DefaultMenu">
        <div :class="$style.wrapper">

            <DefaultTheLogo/>

            <nav :class="$style.nav">
                <DefaultMenuItem
                    v-for="item in navItems"
                    v-bind="item"
                    :key="item.to"
                />
            </nav>

            <DefaultMenuUser :class="$style.user"/>

        </div>
    </div>
</template>

<style lang="scss" module>
.wrapper {
    overflow: hidden;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    row-gap: calc(var(--ui-unit) * 48);
    padding: calc(var(--ui-unit) * 6);
    border-radius: 0 5px 5px 0;
    background-color: var(--ui-additional-color);
}

.nav {
    display: flex;
    flex-direction: column;
    row-gap: calc(var(--ui-unit) * 4);
}

.user {
    margin-top: auto;
}
</style>

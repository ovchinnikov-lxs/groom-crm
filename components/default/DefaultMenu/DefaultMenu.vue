<script setup lang="ts">
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

            <DefaultMenuUser/>

        </div>
    </div>
</template>

<style lang="scss" module>
.wrapper {
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    column-gap: calc(var(--ui-unit) * 4);
    padding: 0 calc(var(--ui-unit) * 18);
    background-color: var(--ui-additional-color);
}

.nav {
    display: flex;
    align-items: center;
    column-gap: calc(var(--ui-unit) * 12);
}
</style>

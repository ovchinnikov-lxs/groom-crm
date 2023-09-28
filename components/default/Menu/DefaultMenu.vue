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
        to: $routes.services.list,
        title: 'Услуги',
        icon: 'services',
    },
    {
        to: $routes.breeds.list,
        title: 'Породы',
        icon: 'breeds',
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

            <main class="container" :class="$style.container">
                <DefaultTheLogo :class="$style.logo"/>

                <nav :class="$style.nav">
                    <DefaultMenuItem
                        v-for="item in navItems"
                        v-bind="item"
                        :key="item.to"
                    />
                </nav>

                <DefaultMenuUser :class="$style.user"/>
            </main>

        </div>
    </div>
</template>

<style lang="scss" module>
.wrapper {
    overflow: hidden;
    width: 100%;
    height: 100%;
    background-color: var(--ui-additional-color);
}

.container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    column-gap: calc(var(--ui-unit) * 4);

    @include respond-to(mobile) {
        column-gap: calc(var(--ui-unit) * 2);
    }
}

.logo {
    @include respond-to(mobile) {
        display: none;
    }
}

.logo,
.user {
    width: calc(var(--ui-unit) * 41);

    @include respond-to(mobile) {
        width: auto;
    }
}

.nav {
    display: flex;
    align-items: center;
    column-gap: calc(var(--ui-unit) * 12);

    @include respond-to(tablet) {
        column-gap: calc(var(--ui-unit) * 4);
    }

    @include respond-to(mobile) {
        column-gap: calc(var(--ui-unit) * 3);
    }
}
</style>

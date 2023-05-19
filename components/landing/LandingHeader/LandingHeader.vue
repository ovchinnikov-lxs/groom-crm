<script setup lang="ts">
const { $routes } = useNuxtApp();

const list = [
    {
        title: 'О нас',
        to: {
            hash: '#about',
        },
    },
    {
        title: 'Преимущества',
        to: {
            hash: '#advantages',
        },
    },
    {
        title: 'Тарифы',
        to: {
            hash: '#tariffs',
        },
    },
];
</script>

<template>
    <header class="LandingHeader">
        <div :class="$style.wrapper">
            <DefaultTheLogo :class="$style.logo"/>

            <nav :class="$style.nav">
                <NuxtLink
                    v-for="(item, index) in list"
                    :key="index"
                    :to="item.to"
                    :class="[$style.link, { [$style['--is-active']]: $route.hash === item.to.hash }]"
                >
                    <b>
                        {{ item.title }}
                    </b>
                </NuxtLink>

                <UiButton :class="$style.button" :to="$routes.auth.login">
                    Войти
                </UiButton>
            </nav>

        </div>
    </header>
</template>

<style module lang="scss">
.wrapper {
    display: flex;
    align-items: center;
    width: var(--container-width);
    height: 100%;
    margin: 0 auto;
}

.logo {
    color: var(--ui-black-color);
}

.nav {
    display: flex;
    align-items: center;
    column-gap: calc(var(--ui-unit) * 8);
    margin-left: auto;
    padding: calc(var(--ui-unit) * 8) calc(var(--ui-unit) * 24);
    border-radius: calc(var(--ui-unit) * 4);
    background-color: var(--ui-additional-color);
}

.link {
    color: var(--ui-black-color);
    transition: color .3s ease;

    &.--is-active {
        color: var(--ui-white-color);
    }

    @include hover {
        color: var(--ui-white-color);
    }
}

.button {
    margin-left: calc(var(--ui-unit) * 18);
}
</style>

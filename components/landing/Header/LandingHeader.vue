<script setup lang="ts">
const { $routes } = useNuxtApp();
const route = useRoute();
const $style = useCssModule();

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

const linkClassList = computed(() => (link: { hash: string }) => [{
    [$style['--is-active']]: route.hash === link.hash,
}]);
</script>

<template>
    <header class="LandingHeader">
        <div :class="$style.wrapper">

            <main :class="$style.container">

                <DefaultTheLogo :class="$style.logo"/>

                <nav :class="$style.nav">
                    <NuxtLink
                        v-for="(item, index) in list"
                        :key="index"
                        :to="item.to"
                        :class="[$style.link, linkClassList(item.to)]"
                    >
                        <b>
                            {{ item.title }}
                        </b>
                    </NuxtLink>

                    <UiButton :class="$style.button" :to="$routes.auth.login">
                        Войти
                    </UiButton>
                </nav>

            </main>

        </div>
    </header>
</template>

<style module lang="scss">
.wrapper {
    backdrop-filter: blur(var(--ui-unit));
    background-color: rgba(var(--ui-additional-light-color-rgb), .8);
}

.container {
    display: flex;
    align-items: center;
    width: var(--container-width);
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
    padding: calc(var(--ui-unit) * 3) calc(var(--ui-unit) * 24);
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

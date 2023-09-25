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
const isOpened = ref(false);

const classList = computed(() => [{
    [$style['--is-opened']]: isOpened.value,
}]);

const linkClassList = computed(() => (link: { hash: string }) => [{
    [$style['--is-active']]: route.hash === link.hash,
}]);
</script>

<template>
    <header class="LandingHeader">
        <div :class="[$style.wrapper, classList]">

            <main :class="$style.container">

                <DefaultTheLogo :class="$style.logo"/>

                <div :class="$style.hum" @click="isOpened = !isOpened">
                    <span></span>
                    <span></span>
                </div>

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
    position: relative;

    &:before {
        content: '';
        position: absolute;
        background-color: rgba(var(--ui-additional-color-rgb), .4);
        transition: height .3s ease-in-out;
        inset: 0;
        backdrop-filter: blur(var(--ui-unit));

        @include respond-to(tablet) {
            height: calc(var(--ui-unit) * 12);
        }
    }

    @include respond-to(tablet) {
        &.--is-opened {
            &:before {
                height: calc(var(--ui-unit) * 66);
            }

            .hum {
                span {
                    &:first-child {
                        transform: rotate(45deg) translate3d(6px, 6px, 0);
                    }

                    &:last-child {
                        transform: rotate(-45deg) translate3d(4px, -4px, 0);
                    }
                }
            }

            .nav {
                opacity: 1;
                pointer-events: auto;
                transition: opacity .3s ease-in-out .3s;
            }
        }
    }
}

.container {
    display: flex;
    align-items: center;
    width: var(--container-width);
    margin: 0 auto;

    @include respond-to(tablet) {
        width: var(--container-adaptive-width);
        padding: calc(var(--ui-unit) * 2) 0;
    }
}

.logo {
    position: relative;
    z-index: 2;
    color: var(--ui-black-color);
}

.hum {
    display: none;

    @include respond-to(tablet) {
        position: relative;
        z-index: 2;
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: calc(var(--ui-unit) * 8);
        height: calc(var(--ui-unit) * 8);
        row-gap: calc(var(--ui-unit) * 3);
        margin-left: auto;

        &:before {
            content: '';
            position: absolute;
            inset: calc(var(--ui-unit) * -1);
        }
    }

    span {
        width: 100%;
        height: 2px;
        border-radius: var(--ui-unit);
        background-color: var(--ui-black-color);
        transition: transform .3s ease-in-out;
    }
}

.nav {
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    column-gap: calc(var(--ui-unit) * 8);
    margin-left: auto;
    padding: calc(var(--ui-unit) * 3) calc(var(--ui-unit) * 24);
    border-radius: calc(var(--ui-unit) * 4);

    @include respond-to(tablet) {
        position: absolute;
        top: 100%;
        left: 0;
        flex-direction: column;
        align-items: stretch;
        width: 100%;
        margin-left: 0;
        padding: calc(var(--ui-unit) * 4);
        border-radius: 0;
        opacity: 0;
        pointer-events: none;
        transition: opacity .3s ease-in-out;
    }
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

    @include respond-to(tablet) {
        &:not(:first-child) {
            margin-top: calc(var(--ui-unit) * 6);
        }
    }
}

.button {
    margin-left: calc(var(--ui-unit) * 18);

    @include respond-to(tablet) {
        margin-top: calc(var(--ui-unit) * 8);
        margin-left: 0;
    }
}
</style>

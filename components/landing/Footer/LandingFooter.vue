<template>
    <footer>
        <div :class="$style.wrapper">
            <main :class="$style.container">
                <!--todo: Добавить соц сети                -->
                <div :class="$style.aside">
                    ©
                    &nbsp;
                    <DefaultTheLogo size="small" :class="$style.logo"/>,
                    &nbsp;
                    <b>{{ new Date().getFullYear() }}</b>
                </div>
            </main>
        </div>
    </footer>
</template>

<style module lang="scss">
.wrapper {
    width: 100%;
    height: 100%;
    padding: calc(var(--ui-unit) * 6) 0;
    background-color: rgba(var(--ui-additional-color-rgb), .8);
}

.container {
    display: flex;
    align-items: center;
    width: var(--container-width);
    margin: 0 auto;
}

.aside {
    display: inline-flex;
    margin-left: auto;
}

.logo {
    color: var(--ui-black-color);
}
</style>

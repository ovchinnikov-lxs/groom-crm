<template>
    <div :class="$style.LandingLayout">
        <LandingHeader :class="$style.header"/>

        <main :class="$style.main">
            <slot/>
        </main>

        <LandingFooter :class="$style.footer"/>
    </div>
</template>

<style lang="scss" module>
.LandingLayout {
    --container-width: calc(var(--ui-col) * 32);
    --container-adaptive-width: calc(100% - var(--ui-unit) * 8);

    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100vh;
    background-color: var(--ui-additional-light-color);
}

.header {
    position: sticky;
    top: 0;
    z-index: 4;
    width: 100%;
}

.header,
.footer {
    flex-shrink: 0;
}

.main {
    flex-grow: 1;
}
</style>

<template>
    <div :class="$style.DefaultLayout">
        <DefaultMenu :class="$style.menu"/>

        <div :class="$style.page">
            <slot />
        </div>
    </div>
</template>

<style lang="scss" module>
.DefaultLayout {
    display: flex;
    width: 100%;
    height: 100%;
    min-height: 100vh;
}

.menu {
    flex-shrink: 0;
}

.page {
    flex-grow: 1;
    padding: calc(var(--ui-unit) * 16) calc(var(--ui-unit) * 18);

    & > * {
        width: 100%;
        height: 100%;
    }
}
</style>

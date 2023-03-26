<template>
    <div :class="$style.DefaultLayout">
        <DefaultModal :class="$style.modal"/>
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
}

.modal {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 3;
    width: 100%;
    height: 100%;
    pointer-events: none;
}
</style>

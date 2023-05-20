<template>
    <div :class="$style.DefaultLayout">
        <UiModal :class="$style.modal"/>
        <DefaultMenu :class="$style.menu"/>

        <div class="container" :class="$style.page">
            <slot />
        </div>
    </div>
</template>

<style lang="scss" module>
.DefaultLayout {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
}

.page {
    overflow: auto;
    flex-grow: 1;
    padding: calc(var(--ui-unit) * 4) 0;
}

.modal {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 6;
    width: 100%;
    height: 100%;
}
</style>

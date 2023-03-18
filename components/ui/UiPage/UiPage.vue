<template>
    <UiPlate
        color="white"
        size="small"
        rounded
        class="UiPage"
    >
        <header class="UiPage__header">
            <slot name="header"></slot>
        </header>

        <main class="UiPage__main">
            <slot></slot>
        </main>


        <footer v-if="$slots.footer" class="UiPage__footer">
            <slot name="footer"></slot>
        </footer>

    </UiPlate>
</template>

<style lang="scss">
.UiPage {
    $page: &;

    .UiPlate__wrapper {
        padding: calc(var(--ui-unit) * 16) calc(var(--ui-unit) * 13);
    }

    &__header {
        user-select: none;
    }
}
</style>

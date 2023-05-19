<template>
    <UiPlate
        color="white"
        size="small"
        rounded
        class="UiPage"
    >
        <header class="UiPage__header">
            <UiPageBreadCrumbs/>

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

    & > .UiPlate__wrapper {
        display: flex;
        flex-direction: column;
        row-gap: calc(var(--ui-unit) * 8);
        padding: calc(var(--ui-unit) * 8) calc(var(--ui-unit) * 10);
    }

    &__header {
        display: flex;
        align-items: center;
        column-gap: calc(var(--ui-unit) * 8);
        user-select: none;
    }
}
</style>

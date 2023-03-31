<template>
    <div class="UiModalPopupWrapper">
        <header class="UiModalPopupWrapper__header">
            <slot name="header"></slot>
        </header>

        <main class="UiModalPopupWrapper__main">
            <slot name="default"></slot>
        </main>

        <footer class="UiModalPopupWrapper__footer">
            <slot name="footer"></slot>
        </footer>
    </div>
</template>

<style lang="scss">
.UiModalPopupWrapper {
    display: flex;
    flex-direction: column;
    row-gap: var(--ui-col);
}
</style>

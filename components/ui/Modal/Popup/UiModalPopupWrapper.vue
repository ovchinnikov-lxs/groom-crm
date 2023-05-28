<script setup lang="ts">
defineProps({
    tag: {
        type: String,
        default: 'div',
    },
});

defineEmits<{(e: 'close'): void}>();
</script>

<template>
    <component
        v-bind="$attrs"
        :is="tag"
        class="UiModalPopupWrapper"
    >
        <header class="UiModalPopupWrapper__header">
            <slot name="header"></slot>

            <UiIcon
                name="ui/close"
                class="UiModalPopupWrapper__close"
                @click="$emit('close')"
            />
        </header>

        <main class="UiModalPopupWrapper__main">
            <slot name="default"></slot>
        </main>

        <footer class="UiModalPopupWrapper__footer">
            <slot name="footer"></slot>
        </footer>
    </component>
</template>

<style lang="scss">
.UiModalPopupWrapper {
    @include scrollbar;

    position: relative;
    display: flex;
    flex-direction: column;
    max-height: 80vh;

    &__header {
        position: sticky;
        top: 0;
        z-index: 3;
        display: flex;
        align-items: center;
        width: 100%;
        column-gap: calc(var(--ui-unit) * 4);
        padding: calc(var(--ui-unit) * 6) calc(var(--ui-unit) * 12) calc(var(--ui-unit) * 4);
        background-color: var(--ui-white-color);
    }

    &__close {
        flex-shrink: 0;
        margin-left: auto;
        transition: transform .3s ease;
        cursor: pointer;

        @include hover {
            transform: rotate(90deg);
        }
    }

    &__main {
        padding: calc(var(--ui-unit) * 6) calc(var(--ui-unit) * 12);
    }

    &__footer {
        position: sticky;
        bottom: -1px;
        z-index: 3;
        width: 100%;
        padding: calc(var(--ui-unit) * 4) calc(var(--ui-unit) * 12);
        background-color: var(--ui-white-color);

        & > * {
            width: 100%;
        }
    }
}
</style>
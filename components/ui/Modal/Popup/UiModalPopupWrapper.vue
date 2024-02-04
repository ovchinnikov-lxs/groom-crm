<script setup lang="ts">
const props = withDefaults(defineProps<{
    tag?: string;
    closable?: boolean;
    loading?: boolean;
}>(), {
    tag: 'div',
    closable: true,
    loading: false,
});

const classList = computed(() => [{
    '--is-loading': props.loading,
}]);

defineEmits<{
    close: [void]
}>();
</script>

<template>
    <component
        v-bind="$attrs"
        :is="tag"
        class="UiModalPopupWrapper"
        :class="classList"
    >
        <header class="UiModalPopupWrapper__header">
            <slot name="header"></slot>

            <UiIcon
                v-if="closable"
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

        <UiLoader class="UiModalPopupWrapper__loader"/>
    </component>
</template>

<style lang="scss">
.UiModalPopupWrapper {
    $popup: &;

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
        padding: var(--ui-col) calc(var(--ui-unit) * 12) calc(var(--ui-unit) * 4);
        background-color: var(--ui-white-color);
        transition: opacity .25s var(--ui-cubic-bezier);
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
        @include scrollbar;

        padding: calc(var(--ui-unit) * 6) calc(var(--ui-unit) * 12);
        transition: opacity .25s var(--ui-cubic-bezier);
    }

    &__footer {
        position: sticky;
        bottom: -1px;
        z-index: 3;
        width: 100%;
        padding: calc(var(--ui-unit) * 4) calc(var(--ui-unit) * 12) var(--ui-col);
        background-color: var(--ui-white-color);
        transition: opacity .25s var(--ui-cubic-bezier);

        & > * {
            width: 100%;
        }
    }

    &__loader {
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: 3;
        width: 200px;
        height: 200px;
        opacity: 0;
        pointer-events: none;
        transform: translate3d(-50%, -50%, 0) scale(.5);
        transition: all .25s var(--ui-cubic-bezier);
    }

    &.--is-loading {
        #{$popup} {
            &__loader {
                opacity: 1;
                transform: translate3d(-50%, -50%, 0) scale(1);
            }

            &__header,
            &__main,
            &__footer {
                opacity: 0;
                pointer-events: none;
            }
        }
    }
}
</style>

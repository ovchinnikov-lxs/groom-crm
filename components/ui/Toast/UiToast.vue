<script setup lang="ts">
const storeToast = useStoreToast();
</script>

<template>
    <div class="UiToast">
        <TransitionGroup
            name="toast-list"
            tag="div"
            class="UiToast__wrapper"
        >
            <LazyUiToastItem
                v-for="item in storeToast.list"
                :key="item.id"
                v-bind="item"
                class="UiToast__item"
                @remove="storeToast.remove(item.id)"
            />
        </TransitionGroup>
    </div>
</template>

<style lang="scss">
.UiToast {
    pointer-events: none;

    &__wrapper {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        padding-top: 100px;
    }

    &__item {
        width: 320px;
        padding: 4px 0;
        transition: all .3s ease;

        &.toast-list-enter-from {
            opacity: 0;
            transform: translate3d(16px, 0, 0);
        }

        &.toast-list-leave-to {
            opacity: 0;
            transform: translate3d(16px, 0, 0);
        }

        &.toast-list-leave-active {
            position: absolute;
        }
    }
}
</style>

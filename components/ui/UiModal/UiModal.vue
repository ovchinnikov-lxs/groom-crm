<script setup lang="ts">
import { IModalItem, modal } from '~/composables/modal';
import type { ModalTypes } from '~/composables/modal';

const MODAL_TYPES: {
    [key: string]: any
} = {
    popup: defineAsyncComponent(() => import('~/components/ui/UiModal/UiModalPopup/UiModalPopup.vue')),
};
const modalIsVisible = computed(() => (id: string, type: ModalTypes) => {
    const modalIndex = modal.list.findIndex((m: IModalItem) => m.id === id);

    return !modal.list.some((m: IModalItem, i) => i > modalIndex && m.type === type);
});

</script>
<template>
    <TransitionGroup
        tag="div"
        name="modal-in"
        class="UiModal"
    >
        <component
            :is="MODAL_TYPES[item.type]"
            v-for="(item, index) in modal.list"
            :key="item.id"
            :style="{zIndex: index}"
            :is-visible="modalIsVisible(item.id, item.type)"
            v-bind="item.modalProps"
            class="UiModal__item"
            @close="modal.close(item.id)"
        >
            <template #default>
                <component
                    :is="item.component"
                    :ref="item.id"
                    :key="item.id"
                    v-bind="item.componentProps"
                    @close="modal.close(item.id)"
                />
            </template>
        </component>
    </TransitionGroup>
</template>

<style lang="scss">
.UiModal {
    pointer-events: none;

    &__item {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        pointer-events: auto;
        transition: all .6s ease;
    }
}
</style>

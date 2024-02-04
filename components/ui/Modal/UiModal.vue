<script setup lang="ts">
import type { Component } from 'vue';
import type { IModalItem, ModalTypes } from '~/types/modal';

const componentDict: Record<ModalTypes, Component> = {
    popup: defineAsyncComponent(() => import('~/components/ui/Modal/Popup/UiModalPopup.vue')),
    confirm: defineAsyncComponent(() => import('~/components/ui/Modal/Confirm/UiModalConfirm.vue')),
};

const storeModal = useStoreModal();

const modalIsVisible = computed(() => (id: string, type: ModalTypes) => {
    const modalIndex = storeModal.list.findIndex((m: IModalItem) => m.id === id);

    return !storeModal.list.some((m: IModalItem, i) => i > modalIndex && m.type === type);
});

</script>
<template>
    <TransitionGroup
        tag="div"
        name="ui-modal"
        class="UiModal"
    >
        <Component
            :is="componentDict[item.type]"
            v-for="(item, index) in storeModal.list"
            v-bind="item.modalProps"
            :id="item.id"
            :key="item.id"
            :style="{ zIndex: index }"
            :is-visible="modalIsVisible(item.id, item.type)"
            class="UiModal__item"
            @close="storeModal.close(item.id, false, $event)"
        >
            <template #default>
                <Component
                    :is="item.component"
                    v-if="item.component"
                    v-bind="item.componentProps"
                    :key="item.id"
                    @close="storeModal.close(item.id,false, $event)"
                />
            </template>
        </Component>
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
    }
}
</style>

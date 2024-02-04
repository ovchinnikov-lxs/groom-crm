import { defineStore } from 'pinia';

import { v4 as uuidv4 } from 'uuid';
import type { IModalItem, IModalParams, IModalState } from '~/types/modal';
import { lockBody, unlockBody } from '~/utils/dom';


export const useStoreModal = defineStore('modal', {
    state: (): IModalState => ({
        list: [],
        bodyIsLocked: false,
    }),

    actions: {
        open({ component, modalProps, componentProps, type = 'popup', onOpened, onClose }: IModalParams) {
            const id = uuidv4();

            if (onOpened) {
                onOpened();
            }

            this.list.push({
                id,
                component: shallowRef(component),
                modalProps,
                componentProps,
                type,
                onOpened,
                onClose,
            });

            if (!this.bodyIsLocked) {
                lockBody();
                this.bodyIsLocked = true;
            }

            return id;
        },

        close(id: IModalItem['id'], immediate: boolean = false, args?: any) {
            const modalIndex = this.list.findIndex(m => m.id === id);
            const currentModal = this.list[modalIndex];

            if (currentModal.modalProps?.closable === false && !immediate) {
                return false;
            }

            if (currentModal.onClose) {
                currentModal?.onClose(args);
            }

            this.list.splice(modalIndex, 1);

            if (!this.list.length && this.bodyIsLocked) {
                unlockBody();
                this.bodyIsLocked = false;
            }
        },
    },
});

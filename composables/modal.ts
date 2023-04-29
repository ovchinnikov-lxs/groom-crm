import { v4 as uuidv4 } from 'uuid';
import { Component } from 'vue';

// Utils
import { lockBody, unlockBody } from 'assets/ts/utils/dom-utils';

export type ModalTypes = 'popup' | 'confirm';

interface IModalParams {
    component: Component
    modalProps?: object
    componentProps?: object
    type?: ModalTypes
}

export interface IModalItem extends IModalParams{
    id: string
}

interface IModal {
    bodyIsLocked: boolean
    list: Array<IModalItem>
    open: (params: IModalParams) => void
    close: (id: string) => void
}
export const modal = reactive<IModal>({
    bodyIsLocked: false,
    list: [],
    open({ component, modalProps, componentProps, type = 'popup' } : IModalParams) {
        this.list.push({
            id: uuidv4(),
            component,
            modalProps,
            componentProps,
            type,
        });

        if (!this.bodyIsLocked) {
            lockBody();
            this.bodyIsLocked = true;
        }
    },
    close(id) {
        const modalIndex = this.list.findIndex(m => m.id === id);

        this.list.splice(modalIndex, 1);


        if (!this.list.length && this.bodyIsLocked) {
            unlockBody();
            this.bodyIsLocked = false;
        }
    },
});

export interface IModalProps {
    size: string
    isVisible: boolean
}

export const modalProps = {
    size: {
        type: String,
        default: 'medium',
    },

    isVisible: {
        type: Boolean,
        default: false,
    },
};

export function useModal(props: IModalProps) {
    const classList = computed(() => [
        `--${props.size}-size`,
        props.isVisible ? '--is-visible' : '--is-hidden',
    ]);

    return {
        classList,
    };
}

import { v4 as uuidv4 } from 'uuid';
import { Component, PropType } from 'vue';

// Utils
import { lockBody, unlockBody } from 'assets/ts/utils/dom-utils';

export type ModalTypes = 'popup' | 'confirm';
type TypeModalSize = 'small' | 'medium';

export interface IModalProps {
    size: TypeModalSize
    isVisible?: boolean
}

interface IModalParams {
    component: Component
    modalProps?: IModalProps
    componentProps?: object
    type?: ModalTypes
    onClose?: () => void
}

export interface IModalItem extends IModalParams {
    id: string
    type: ModalTypes
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
    open({ component, modalProps, componentProps, type = 'popup', onClose } : IModalParams) {
        this.list.push({
            id: uuidv4(),
            component: shallowRef(component),
            modalProps,
            componentProps,
            type,
            onClose,
        });

        if (!this.bodyIsLocked) {
            lockBody();
            this.bodyIsLocked = true;
        }
    },
    close(id) {
        const modalIndex = this.list.findIndex(m => m.id === id);

        const currentModal = this.list[modalIndex];

        if (currentModal.onClose) {
            currentModal.onClose();
        }
        this.list.splice(modalIndex, 1);

        if (!this.list.length && this.bodyIsLocked) {
            unlockBody();
            this.bodyIsLocked = false;
        }
    },
});

export const modalProps = {
    size: {
        type: String as PropType<TypeModalSize>,
        default: 'small',
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

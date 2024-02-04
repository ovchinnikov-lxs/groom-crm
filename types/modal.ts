import type { Component } from 'vue';

type ModalTypes = 'popup' | 'confirm'; // TODO:  | 'curtain'
type TypeModalSize = 'small' | 'medium';

interface IModalProps {
    size?: TypeModalSize;
    isVisible?: boolean;
    closable?: boolean;
    [key: string]: any;
}

interface IModalConfirm extends IModalProps {
    title: string;
    buttonYes?: string;
    buttonNo?: string;
}

interface IModalParams {
    component?: Component;
    modalProps?: IModalProps;
    componentProps?: any;
    type?: ModalTypes;
    onOpened?: () => void;
    onClose?: (args: any) => void;
}

interface IModalItem extends IModalParams {
    id: string;
    type: ModalTypes;
}

interface IModalState {
    bodyIsLocked: boolean;
    list: Array<IModalItem>;
}

export type {
    ModalTypes,
    TypeModalSize,
    IModalProps,
    IModalParams,
    IModalItem,
    IModalState,
    IModalConfirm,
};

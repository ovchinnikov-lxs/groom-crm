import type { Component } from 'vue';
import type { Nullable, TypeSize } from '~/types/index';
type ToastType = 'success' | 'error' | 'warning' | 'info';

interface IToastPayload {
    type: ToastType;
    title?: string;
    text: Nullable<string>;
    icon?: string | Component;
    time?: number;
    allowClose?: boolean;
    size?: TypeSize;
}

interface IToast extends IToastPayload {
    id: string;
}

interface IToastState {
    list: IToast[]
}

export type {
    ToastType,
    IToast,
    IToastState,
    IToastPayload,
};

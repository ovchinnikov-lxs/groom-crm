import { defineStore } from 'pinia';
import { v4 as uuidv4 } from 'uuid';
import type { IToast, IToastPayload, IToastState } from '~/types/toast';

export const useStoreToast = defineStore('toast', {
    state: (): IToastState => ({
        list: [],
    }),
    actions: {
        add(payload: IToastPayload): IToast['id'] {
            const id = uuidv4();

            this.list.push({
                ...payload,
                id,
            });

            return id;
        },

        remove(id: IToast['id']) {
            const index = this.list.findIndex((i: IToast) => i.id === id);
            this.list.splice(index, 1);
        },
    },
});

import { v4 as uuidv4 } from 'uuid';

interface IModalParams {
    component: () => {}
    props?: object
}

interface IModalItem extends IModalParams{
    id: string
}

interface IModal {
    list: Array<IModalItem>
    open: (params: IModalParams) => void
    close: (id: string) => void
}
export const modal = reactive<IModal>({
    list: [],
    open({ component, props } : IModalParams) {
        this.list.push({
            id: uuidv4(),
            component,
            props,
        });
    },
    close(id) {
        const modalIndex = this.list.findIndex(m => m.id === id);

        this.list.splice(modalIndex, 1);
    },
});

interface IBreadcrumbsItem {
    title: string
    to?: string
}

export const useBreadcrumbs = defineStore('breadcrumbs', {
    state: (): {
        list: Array<IBreadcrumbsItem>
        render: number,
    } => ({
        list: [],
        render: 0,
    }),

    actions: {
        setList(value: Array<IBreadcrumbsItem>) {
            this.list = value;
            this.render++;
        },
    },
});

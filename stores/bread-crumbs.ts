interface IBreadCrumbsItem {
    title: string
    to?: string
}
export const useBreadCrumbsStore = defineStore('breadCrumbs', () => {
    const list = ref<Array<IBreadCrumbsItem>>([]);

    function changeBreadCrumbs(value: Array<IBreadCrumbsItem>) {
        list.value = value;
    }

    return {
        list,
        changeBreadCrumbs,
    };
});

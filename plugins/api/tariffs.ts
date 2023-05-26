export interface ITariffsItem {
    id: string;
    name: string;
    description: string;
    price: number;
}

export class TariffsApi {
    getList() {
        return useApi<ITariffsItem[]>('/tariffs');
    }
}

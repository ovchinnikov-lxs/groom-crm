export interface IServiceCategory {
    id: string;
    name: string;
    description: string;
    preview: string;
}

export interface IService {
    id: string;
    name: string;
    description: string;
    preview: string;
    price: number;
    duration: number;
    breeds: Array<string>;
}

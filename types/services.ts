import type { Tables } from '~/types/supabase';

export interface IService {
    id: string;
    name: string;
    description: string;
    preview: string;
    price: number;
    duration: number;
    breeds: Array<string>;
}

export interface IServiceDetail extends Tables<'ServiceDetail'> {
    breeds: Tables<'Breed'>[];
}

export interface IServiceCategory extends Tables<'ServiceCategory'> {
    services: IServiceDetail[];
}

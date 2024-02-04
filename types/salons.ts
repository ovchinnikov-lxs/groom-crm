import type { Tables } from '~/types/supabase';
import type { Nullable } from '~/types/index';

interface ISalonDetail extends Tables<'Salon'>{
    location: {
        lat: Nullable<number>;
        lng: Nullable<number>;
        address: Nullable<string>;
    }
    staff: {
        user: Tables<'Profile'>
    }[]
}

export type {
    ISalonDetail,
};

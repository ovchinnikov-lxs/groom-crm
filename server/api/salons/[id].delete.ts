import { serverSupabaseClient } from '#supabase/server';
import type { Database } from '~/types/supabase';

export default defineEventHandler(async event => {
    const client = await serverSupabaseClient<Database>(event);
    const id = getRouterParam(event, 'id');

    if (!id) {
        return null;
    }

    return await client
        .from('Salon')
        .delete()
        .eq('id', id);
});

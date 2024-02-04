import { serverSupabaseClient } from '#supabase/server';
import type { Database } from '~/types/supabase';

export default defineEventHandler(async event => {
    const client = await serverSupabaseClient<Database>(event);
    const id = getRouterParam(event, 'id');

    if (!id) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Param is required',
        });
    }

    const { data, error } = await client
        .from('Breed')
        .select()
        .eq('id', id);

    if (error) {
        throw createError({
            statusCode: 400,
            statusMessage: error.message,
        });
    }

    return data[0];
});

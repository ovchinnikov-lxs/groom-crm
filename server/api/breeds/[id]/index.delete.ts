import { serverSupabaseClient } from '#supabase/server';
import type { Database } from '~/types/supabase';

export default defineEventHandler(async event => {
    const client = await serverSupabaseClient<Database>(event);
    const id = getRouterParam(event, 'id');

    if (!id) {
        throw createError({
            statusCode: 400,
            statusMessage: 'id is required',
        });
    }

    return await client
        .from('Breed')
        .delete()
        .eq('id', id);
});

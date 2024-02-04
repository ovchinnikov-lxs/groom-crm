import { serverSupabaseClient } from '#supabase/server';
import type { Database } from '~/types/supabase';

export default defineEventHandler(async event => {
    const client = await serverSupabaseClient<Database>(event);
    const id = getRouterParam(event, 'detail');

    if (!id) {
        throw createError({
            statusCode: 400,
            statusMessage: 'id is required',
        });
    }

    return await client
        .from('ServiceDetail')
        .delete()
        .eq('id', id);
});

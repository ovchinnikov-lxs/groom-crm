import { serverSupabaseClient } from '#supabase/server';
import type { Database } from '~/types/supabase';

export default defineEventHandler(async event => {
    const client = await serverSupabaseClient<Database>(event);
    const query = getQuery(event);

    if (!query.company_id) {
        throw createError({
            statusCode: 400,
            statusMessage: 'company_id is required',
        });
    }

    return await client
        .from('Breed')
        .select()
        .ilike('name', `%${query.search}%`)
        .order('name', { ascending: true });
});

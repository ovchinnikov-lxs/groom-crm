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

    if (!query.search) {
        return await client
            .from('Breed')
            .select()
            .eq('company_id', query.company_id)
            .order('name', { ascending: true });
    }

    return await client
        .from('Breed')
        .select()
        .eq('company_id', query.company_id)
        .ilike('name', `%${query.search}%`)
        .order('name', { ascending: true });
});

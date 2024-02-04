import cloneDeep from 'lodash/cloneDeep';
import { serverSupabaseClient } from '#supabase/server';
import type { Database } from '~/types/supabase';

export default defineEventHandler(async event => {
    const [
        client,
        body,
    ] = await Promise.all([
        serverSupabaseClient<Database>(event),
        readBody(event),
    ]);

    if (!body.company_id) {
        return null;
    }

    const params = cloneDeep(body);
    delete params.company_id;

    const { data } = await client
        .from('Company')
        .update(params)
        .eq('id', body.company_id)
        .select();


    if (!data) {
        return null;
    }

    return data[0];
});

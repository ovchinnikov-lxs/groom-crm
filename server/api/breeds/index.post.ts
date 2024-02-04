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
        throw createError({
            statusCode: 400,
            statusMessage: 'company_id is required',
        });
    }

    const { data, error } = await client.from('Breed').insert([{
        name: body.name,
        description: body.description,
        image: body.image,
        company_id: body.company_id,
    }]);

    if (error) {
        throw createError({
            statusCode: Number(error.code),
            statusMessage: error.message,
        });
    }

    return data;
});

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

    const { data, error } = await client
        .from('ServiceCategory')
        .insert([{
            company_id: body.company_id,
            name: body.name,
            description: body.description,
            image: body.image,
        }]);

    if (error) {
        throw createError({
            statusCode: 400,
            statusMessage: error.message,
        });
    }

    return data;
});

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

    const id = getRouterParam(event, 'id');

    if (!id) {
        throw createError({
            statusCode: 400,
            statusMessage: 'id is required',
        });
    }

    const { data, error } = await client
        .from('Breed')
        .update({
            name: body.name,
            description: body.description,
            image: body.image,
        })
        .eq('id', id);

    if (error) {
        throw createError({
            statusCode: Number(error.code),
            statusMessage: error.message,
        });
    }

    return data;
});

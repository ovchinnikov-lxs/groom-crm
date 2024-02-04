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
    const detailId = getRouterParam(event, 'detail');

    if (!detailId) {
        throw createError({
            statusCode: 400,
            statusMessage: 'detailId is required',
        });
    }

    const { data, error } = await client
        .from('ServiceDetail')
        .update({
            name: body.name,
            description: body.description,
            image: body.image,
            duration: body.duration,
            price: body.price,
        })
        .eq('id', detailId);

    await client
        .from('ServiceBreed')
        .delete()
        .eq('service_id', detailId);
    await client
        .from('ServiceBreed')
        .insert(body.breeds.map((id: string) => ({
            breed_id: id,
            service_id: detailId,
        })));

    if (error) {
        throw createError({
            statusCode: 400,
            statusMessage: error.message,
        });
    }

    return data;
});

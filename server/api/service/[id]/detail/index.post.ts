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

    const categoryId = getRouterParam(event, 'id');


    if (!categoryId) {
        return null;
    }

    const { data, error } = await client
        .from('ServiceDetail')
        .insert([{
            name: body.name,
            price: body.price,
            duration: body.duration,
            description: body.description,
            image: body.image,
            company_id: body.company_id,
            category_id: categoryId,
        }])
        .select();


    if (error) {
        throw createError({
            statusCode: 400,
            statusMessage: error.message,
        });
    }

    const newService = data[0];

    await client
        .from('ServiceBreed')
        .insert(body.breeds.map((breedId: string) => ({
            service_id: newService.id,
            breed_id: breedId,
        })));


    return newService;
});

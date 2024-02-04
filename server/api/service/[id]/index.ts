import { serverSupabaseClient } from '#supabase/server';
import type { Database } from '~/types/supabase';

export default defineEventHandler(async event => {
    const client = await serverSupabaseClient<Database>(event);
    const id = getRouterParam(event, 'id');

    if (!id) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Param is required',
        });
    }

    const [
        { data: categoryData, error: categoryError },
        { data: servicesData, error: servicesError },
    ] = await Promise.all([
        client
            .from('ServiceCategory')
            .select()
            .eq('id', id),
        client
            .from('ServiceDetail')
            .select(`
                *,
                breeds:ServiceBreed(Breed(*))
            `)
            .eq('category_id', id),
    ]);

    if (categoryError || servicesError || !categoryData) {
        throw createError({
            statusCode: 400,
            statusMessage: categoryError?.message || servicesError?.message || 'Some error',
        });
    }

    return {
        ...categoryData[0],
        services: servicesData?.map(item => ({
            ...item,
            breeds: item.breeds.map(i => ({
                ...i.Breed,
            })),
        })) || [],
    };
});

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
        .from('Salon')
        .insert([{
            name: body.name,
            avatar: body.avatar,
            open_at: body.open_at,
            close_at: body.close_at,
            price: body.price,
            location: body.location,
            company_id: body.company_id,
        }])
        .select();

    if (error) {
        throw createError({
            statusCode: 400,
            statusMessage: error.message,
        });
    }

    if (!body.staff?.length) {
        return data[0];
    }

    // TODO: ADD CHECK ROLE AND USER
    const res = await client
        .from('Staff')
        .insert(body.staff.map((userId: string) => ({
            user_id: userId,
            salon_id: data[0].id,
        })));

    if (res.error) {
        throw createError({
            statusCode: 400,
            statusMessage: res.error.message,
        });
    }

    return data[0];
});

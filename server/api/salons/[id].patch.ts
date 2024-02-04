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
        return null;
    }

    const { data, error } = await client
        .from('Salon')
        .update({
            name: body.name,
            avatar: body.avatar,
            open_at: body.open_at,
            close_at: body.close_at,
            price: body.price,
            location: body.location,
        })
        .eq('id', id)
        .select();

    if (error) {
        throw createError({
            statusCode: 400,
            statusMessage: error.message,
        });
    }

    const currentStaff = await client
        .from('Staff')
        .select()
        .eq('salon_id', id);

    if (currentStaff.data) {
        const newValues = body.staff.filter((id: string) => !currentStaff.data.map(item => item.user_id).includes(id));
        const deletedValues = currentStaff.data.map(i => i.user_id).filter(id => !body.staff.includes(id));

        await Promise.all([
            client.from('Staff').insert(newValues.map((userId: string) => ({
                user_id: userId,
                salon_id: id,
            }))),
            client.from('Staff')
                .delete()
                .eq('salon_id', id)
                .in('user_id', deletedValues),
        ]);
    }

    return data[0];
});

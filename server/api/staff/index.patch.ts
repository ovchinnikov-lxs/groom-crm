import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server';
import type { Database } from '~/types/supabase';

export default defineEventHandler(async event => {
    const [
        client,
        body,
        user,
    ] = await Promise.all([
        serverSupabaseClient<Database>(event),
        readBody(event),
        serverSupabaseUser(event),
    ]);

    if (!user) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Only auth user can edit',
        });
    }

    // TODO: Add profile role validation

    if (!body.id) {
        throw createError({
            statusCode: 400,
            statusMessage: 'staff id is required',
        });
    }

    const res = await client
        .from('Profile')
        .update({
            full_name: body.full_name,
            description: body.description,
            role: body.role,
            salary: body.salary,
        })
        .eq('id', body.id)
        .select();

    if (!res.data) {
        return null;
    }

    return res.data[0];
});

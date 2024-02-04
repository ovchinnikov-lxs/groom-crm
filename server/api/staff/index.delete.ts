import { serverSupabaseServiceRole, serverSupabaseUser } from '#supabase/server';
import type { Database } from '~/types/supabase';

export default defineEventHandler(async event => {
    const [
        client,
        body,
        user,
    ] = await Promise.all([
        serverSupabaseServiceRole<Database>(event),
        readBody(event),
        serverSupabaseUser(event),
    ]);

    if (!user) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Only auth user can delete',
        });
    }

    // TODO: Add profile role validation

    if (!body.id) {
        throw createError({
            statusCode: 400,
            statusMessage: 'staff id is required',
        });
    }

    const { data, error } = await client.auth.admin.deleteUser(body.id);

    if (error) {
        throw createError({
            statusCode: error.status,
            statusMessage: error.message,
            name: error.name,
        });
    }

    return data;
});

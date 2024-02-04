import { serverSupabaseServiceRole } from '#supabase/server';
import type { Database } from '~/types/supabase';

export default defineEventHandler(async event => {
    const [
        client,
        body,
    ] = await Promise.all([
        serverSupabaseServiceRole<Database>(event),
        readBody(event),
    ]);

    if (!body.email || !body.company_id || !body.role || !body.salary) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Complete required fields',
        });
    }

    const config = useRuntimeConfig();

    const { data, error } = await client.auth.admin.inviteUserByEmail(body.email, {
        data: {
            ...body,
            salary: Number(body.salary),
        },
        redirectTo: `${config.public.API_BASE_URL}/auth/confirm`,
    });

    if (error) {
        throw createError({
            statusCode: error.status,
            statusMessage: error.message,
            name: error.name,
        });
    }

    return data;
});

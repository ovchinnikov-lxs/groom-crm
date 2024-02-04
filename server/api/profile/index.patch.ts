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
        return null;
    }

    const { data } = await client
        .from('Profile')
        .update({
            avatar: body.avatar,
            description: body.description,
            full_name: body.full_name,
        })
        .eq('id', user.id)
        .select();

    if (!data) {
        return null;
    }

    return data[0];
});

import { serverSupabaseClient, serverSupabaseUser } from '#supabase/server';
import type { Database } from '~/types/supabase';

export default defineEventHandler(async event => {
    const [
        client,
        user,
    ] = await Promise.all([
        serverSupabaseClient<Database>(event),
        serverSupabaseUser(event),
    ]);

    if (!user) {
        return null;
    }

    const { data } = await client
        .from('Profile')
        .select()
        .eq('id', user.id);

    if (!data) {
        return null;
    }

    return data[0];
});

import type { UseFetchOptions } from 'nuxt/app';
import { defu } from 'defu';

// Constants
import { AUTH_TOKEN_KEY } from 'assets/ts/constants/auth';

export function useApi<T>(url: string, options: UseFetchOptions<T> = {}) {
    const userAuth = useCookie(AUTH_TOKEN_KEY);
    const config = useRuntimeConfig();

    const defaults: UseFetchOptions<T> = {
        baseURL: config.public.SERVER_API_URL,
        headers: userAuth.value
            ? { Authorization: `Bearer ${userAuth.value}` }
            : {},

    };

    const params = defu(options, defaults);

    return useFetch(url, params);
}

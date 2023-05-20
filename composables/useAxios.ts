import type { UseFetchOptions } from 'nuxt/app';
import { defu } from 'defu';

// Constants
import { AUTH_TOKEN_KEY } from 'assets/ts/constants/auth';

export function useAxios<T>(url: string, options: UseFetchOptions<T> = {}) {
    const userAuth = useCookie(AUTH_TOKEN_KEY, {
        path: '/',
    });
    const config = useRuntimeConfig();

    const defaults: UseFetchOptions<T> = {
        baseURL: config.baseUrl ?? 'http://localhost:8000/api',
        headers: userAuth.value
            ? { Authorization: `Bearer ${userAuth.value}` }
            : {},

    };

    const params = defu(options, defaults);

    return useFetch(url, params);
}

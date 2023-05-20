import { routes } from '~/plugins/routes';
import { api } from '~/plugins/api';

declare module '#app' {
    interface NuxtApp {

        $routes: routes
        $api: api,
    }
}

export {}

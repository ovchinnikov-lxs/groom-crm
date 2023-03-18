import { routes } from '~/plugins/routes';

declare module '#app' {
    interface NuxtApp {

        $routes: routes
    }
}

export {}

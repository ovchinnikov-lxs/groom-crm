// https://nuxt.com/docs/api/configuration/nuxt-config
import stylelint from 'vite-plugin-stylelint';

export default defineNuxtConfig({
    runtimeConfig: {
        public: {
            GOOGLE_MAP_API_KEY: '',
            API_BASE_URL: 'http://localhost:3000',
        },
    },

    devtools: { enabled: true },

    app: {
        pageTransition: {
            name: 'page',
            mode: 'out-in',
        },

        layoutTransition: {
            name: 'layout',
            mode: 'out-in',
        },

        head: {
            charset: 'utf-16',
            viewport: 'width=device-width, initial-scale=1',
        },
    },

    css: ['~/assets/scss/common/_bundle.scss'],

    imports: {
        dirs: ['stores'],
    },

    modules: [
        ['@nuxtjs/supabase', {
            redirectOptions: {
                login: '/auth/login',
                callback: '/auth/confirm',
                exclude: [
                    '/',
                    '/auth/*',
                ],
            },
        }],
        '@nuxtjs/svg-sprite',
        '@pinia/nuxt',
    ],

    pinia: {
        autoImports: [
            // automatically imports `defineStore`
            'defineStore', // import { defineStore } from 'pinia'
            ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
        ],
    },

    router: {
        options: {
            linkActiveClass: '--is-active-link',
            linkExactActiveClass: '--is-exact-link',
        },
    },

    typescript: {
        strict: true,
        typeCheck: true,
    },

    vite: {
        plugins: [
            stylelint(),
        ],
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `
                    @use "~/assets/scss/shared/_functions.scss" as *;
                    @use "~/assets/scss/shared/_mixins.scss" as *;
                    `,
                },
            },
        },
    },
});

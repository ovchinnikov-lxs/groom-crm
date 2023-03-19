// https://nuxt.com/docs/api/configuration/nuxt-config
import stylelint from 'vite-plugin-stylelint';

export default defineNuxtConfig({
    typescript: {
        strict: true,
    },

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
            title: 'GROOM.CRM',
            meta: [
                { name: 'description', content: 'Приложение для записи клиентов' },
            ],
        },
    },

    css: ['~/assets/scss/common/_bundle.scss'],

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

    router: {
        options: {
            linkActiveClass: '--is-active-link',
            linkExactActiveClass: '--is-exact-link',
        },
    },

    modules: [
        'nuxt-icons',
        '@pinia/nuxt',
    ],

    imports: {
        dirs: ['stores'],
    },

    pinia: {
        autoImports: [
            // automatically imports `defineStore`
            'defineStore', // import { defineStore } from 'pinia'
            ['defineStore', 'definePiniaStore'], // import { defineStore as definePiniaStore } from 'pinia'
        ],
    },
});

// https://nuxt.com/docs/api/configuration/nuxt-config
import stylelint from 'vite-plugin-stylelint';

export default defineNuxtConfig({
    typescript: {
        strict: true,
    },

    app: {
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
});

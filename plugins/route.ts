export default defineNuxtPlugin(() => {
    const routes: {
        [key: string]: string | object
    } = {
        index: '/',
        second: '/second',
    };

    return {
        provide: {
            routes,
        },
    };
});

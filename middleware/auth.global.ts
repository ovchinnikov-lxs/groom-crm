export default defineNuxtRouteMiddleware(to => {
    const auth = useAuth();
    const { $routes } = useNuxtApp();

    if (!auth.loggedIn && !to.meta.layout) {
        return navigateTo($routes.auth.login);
    }

    if (auth.loggedIn && to.meta.layout === 'auth') {
        return navigateTo($routes.salons.list);
    }
});

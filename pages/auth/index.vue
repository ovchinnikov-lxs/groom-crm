<script setup lang="ts">
const { $routes } = useNuxtApp();

navigateTo($routes.auth.login);
</script>

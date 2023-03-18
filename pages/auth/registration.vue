<script setup lang="ts">
definePageMeta({
    layout: 'auth',
    pageTransition: {
        name: 'top',
        mode: 'out-in',
    },
});
</script>

<template>
    <div :class="$style.RegistrationPage">
        <AuthRegistrationForm/>
        <AuthRegistrationInfo/>
    </div>
</template>

<style lang="scss" module>
.RegistrationPage {
    display: flex;
    flex-direction: column;
    row-gap: calc(var(--ui-unit) * 5);
}
</style>

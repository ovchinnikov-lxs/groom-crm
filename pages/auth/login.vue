<script setup lang="ts">
definePageMeta({
    layout: 'auth',
});
</script>

<template>
    <div :class="$style.LoginPage">
        <section :class="$style.container">
            <AuthAside :class="$style.aside"/>

            <div :class="$style.loginSide">
                <AuthLoginForm :class="$style.form"/>

                <AuthLoginInfo :class="$style.info"/>
            </div>

        </section>
    </div>
</template>

<style lang="scss" module>
.LoginPage {
    display: flex;
    width: 100%;
}

.container {
    @include container;

    display: flex;
    align-items: center;
}

.loginSide {
    display: flex;
    flex-direction: column;
    width: calc(var(--ui-col) * 14);
    row-gap: calc(var(--ui-unit) * 5);
    margin-left: auto;
}
</style>

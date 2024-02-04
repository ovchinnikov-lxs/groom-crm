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
    <div class="AuthConfirmPage">
        <div :class="$style.wrapper">

            <h4>Вход в систему</h4>

            <UiLoader :class="$style.loader"/>
        </div>
    </div>
</template>

<style lang="scss" module>
.wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 16px;
}

.loader {
    width: 128px;
    height: 128px;
}
</style>

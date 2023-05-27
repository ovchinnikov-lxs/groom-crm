<script setup lang="ts">
// Constants
import { COMPANY_NAME } from '~/assets/ts/constants';
</script>

<template>
    <UiPlate rounded class="RegistrationInfo">
        <div :class="$style.wrapper">
            <div class="text-small">
                Если у Вас уже есть аккаунт в {{ COMPANY_NAME }}
            </div>

            <UiButton
                to="/auth/login"
                size="small"
            >
                Войти
            </UiButton>
        </div>
    </UiPlate>
</template>

<style lang="scss" module>
.wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    row-gap: calc(var(--ui-unit) * 4);
    padding: calc(var(--ui-unit) * 8) calc(var(--ui-unit) * 32);
    text-align: center;
    color: var(--ui-secondary-color);
}
</style>

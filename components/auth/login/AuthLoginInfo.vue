<template>
    <UiPlate rounded class="AuthLoginInfo">
        <div :class="$style.wrapper">
            <UiButton size="small" :to="$routes.auth.registration">
                Зарегистрироваться
            </UiButton>

            <div class="text-small" :class="$style.text">
                После регистрации Вы получите доступ к новым возможностям
            </div>

            <UiLink
                :href="$routes.landing"
                color="black"
                size="small"
                :class="$style.link"
            >
                Узнать подробнее
            </UiLink>
        </div>
    </UiPlate>
</template>

<style lang="scss" module>
.wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    row-gap: calc(var(--ui-unit) * 2);
    padding: calc(var(--ui-unit) * 6) calc(var(--ui-unit) * 32);
}

.text {
    text-align: center;
    color: var(--ui-secondary-color);
}

.link {
    text-decoration: underline;
}
</style>

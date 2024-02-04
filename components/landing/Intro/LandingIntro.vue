<template>
    <section class="LandingIntro">
        <div :class="$style.wrapper">

            <aside :class="$style.aside">

                <h2>
                    Добро пожаловать в&nbsp;<span>{{ COMPANY_NAME }}</span>&nbsp;&mdash; ваше универсальное решение для управления салоном
                </h2>

                <h4 :class="$style.text">
                    Управляйте онлайн-записями, храните информацию о&nbsp;клиентах, предлагайте удобную регистрацию
                    и&nbsp;контролируйте свои финансы&nbsp;&mdash; все это с&nbsp;помощью {{ COMPANY_NAME }}
                </h4>

                <UiButton to="/auth/registration" :class="$style.button">
                    Получить 15 дней бесплатно
                </UiButton>

            </aside>

            <div :class="$style.imageWrapper">
                <UiImage
                    :has-preview="false"
                    storage-id="static"
                    src="images/dog.png"
                    :class="$style.image"
                />

                <svg
                    width="455"
                    height="458"
                    viewBox="0 0 455 458"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    :class="$style.icon"
                >
                    <path
                        d="M451.765 453.849L6.00897 270.367L408.062 4.44002L451.765 453.849Z"
                        stroke="currentColor"
                        stroke-width="5"
                    />
                </svg>
            </div>

        </div>
    </section>
</template>

<style module lang="scss">
.wrapper {
    display: flex;
    align-items: center;
    width: var(--container-width);
    height: 100%;
    column-gap: var(--ui-col);
    row-gap: var(--ui-col);
    margin: 0 auto;
    padding: calc(var(--ui-col) * 2) 0;

    @include respond-to(tablet) {
        flex-direction: column;
        align-items: stretch;
        width: var(--container-adaptive-width);
        padding: calc(var(--ui-unit) * 4) 0;
    }
}

.aside {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: calc(var(--ui-unit) * 164);
    row-gap: calc(var(--ui-unit) * 6);

    @include respond-to(tablet) {
        width: 100%;
    }

    h2 {
        span {
            color: var(--ui-primary-color);
        }
    }
}

.button {
    &:not(:first-child) {
        margin-top: calc(var(--ui-unit) * 8);
    }

    @include respond-to(mobile) {
        width: 100%;
    }
}

.text {
    color: var(--ui-secondary-color);
}

.imageWrapper {
    position: relative;
    width: calc(var(--ui-unit) * 86);
    height: calc(var(--ui-unit) * 148);
    margin-right: calc(var(--ui-unit) * 28);
    margin-left: auto;

    @include respond-to(tablet) {
        display: none;
    }
}

.image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.icon {
    position: absolute;
    top: 47%;
    left: 35%;
    color: var(--ui-additional-color);
    transform: translate3d(-50%, -50%, 0);
}
</style>

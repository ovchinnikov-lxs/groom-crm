<script setup lang="ts">
// Constants
import { COMPANY_NAME } from '~/utils/const/company';
</script>

<template>
    <div class="LandingContacts">
        <div :class="$style.wrapper">

            <div>
                <h3>
                    Начните работу с&nbsp;{{ COMPANY_NAME }} <span>сегодня</span> и&nbsp;испытайте лучшее приложение для управления салонами,
                    разработанное с&nbsp;учетом особенностей вашего бизнеса.
                </h3>

                <div class="text-medium" :class="$style.text">
                    Примите будущее с&nbsp;нашими индивидуальными решениями,
                    которые сделают ваш салон лучше других.
                </div>
            </div>

            <UiButton to="/auth/registration">
                Получить 15 дней бесплатно
            </UiButton>
        </div>
    </div>
</template>

<style module lang="scss">
.wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: var(--container-width);
    row-gap: calc(var(--ui-unit) * 12);
    margin: 0 auto;
    padding: calc(var(--ui-unit) * 12) 0;
    text-align: center;

    @include respond-to(tablet) {
        width: var(--container-adaptive-width);
    }

    span {
        color: var(--ui-primary-color);
    }
}

.text {
    margin-top: calc(var(--ui-unit) * 3);
    color: var(--ui-secondary-color);
}
</style>

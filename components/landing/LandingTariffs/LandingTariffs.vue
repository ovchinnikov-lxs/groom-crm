<script setup lang="ts">
import { splitThousands } from '~/assets/ts/utils/format-utils';
const { $routes } = useNuxtApp();

const tariffs = useTariffs();
</script>

<template>
    <section class="LandingTariffs">
        <UiPlate
            rounded
            color="white"
            :class="$style.wrapper"
        >
            <h4 :class="$style.title">Тарифы</h4>

            <div class="text-large" :class="$style.text">
                Мы&nbsp;разработали модель ценообразования GROOM.CRM с&nbsp;учетом особенностей
                различных предприятий, чтобы обеспечить ее&nbsp;доступность и&nbsp;бюджетность.
                <br/>
                Выбирайте из&nbsp;трех различных тарифных&nbsp;планов:
            </div>

            <div :class="$style.list">
                <UiPlate
                    v-for="item in tariffs.list"
                    :key="item.id"
                    rounded
                    :class="[$style.item, [$style[`--${item.name.toLowerCase()}-plan`]]]"
                >
                    <h5>{{ item.name }}</h5>

                    <div
                        class="text-small"
                        :class="$style.description"
                        v-html="item.description"
                    >
                    </div>

                    <div :class="$style.bottom">
                        <h4>
                            {{ splitThousands(item.price) }} ₽/мес.
                        </h4>

                        <UiButton
                            :to="{
                                path: $routes.auth.registration,
                                query: { tariffId: item.id },
                            }"
                        >
                            Выбрать
                        </UiButton>
                    </div>
                </UiPlate>
            </div>

        </UiPlate>
    </section>
</template>

<style module lang="scss">
.wrapper {
    width: var(--container-width);
    margin: 0 auto;
    padding: calc(var(--ui-unit) * 12) 0;

    & > :global(.UiPlate__wrapper) {
        display: flex;
        flex-direction: column;
        row-gap: calc(var(--ui-unit) * 8);
        padding: calc(var(--ui-unit) * 8) calc(var(--ui-unit) * 16);
    }
}

.title {
    text-align: center;
}

.text {
    text-align: center;
    color: var(--ui-secondary-color);
}

.list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    grid-column-gap: calc(var(--ui-unit) * 4);
    grid-row-gap: calc(var(--ui-unit) * 4);
}

.item {
    user-select: none;

    :global(.UiPlate__wrapper) {
        display: flex;
        flex-direction: column;
        align-items: center;
        row-gap: calc(var(--ui-unit) * 4);
        padding: calc(var(--ui-unit) * 8) calc(var(--ui-unit) * 8);
        text-align: center;
    }

    &.--basic-plan {
        grid-area: 1 / 1 / 2 / 2;
    }

    &.--standard-plan {
        grid-area: 1 / 2 / 2 / 3;
    }

    &.--premium-plan {
        grid-area: 2 / 1 / 3 / 3;
    }
}

.description {
    color: var(--ui-secondary-color);
}

.bottom {
    display: flex;
    flex-direction: column;
    row-gap: calc(var(--ui-unit) * 6);
    margin-top: auto;
}
</style>

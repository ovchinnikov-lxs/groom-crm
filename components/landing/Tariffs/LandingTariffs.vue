<script setup lang="ts">
const tariffs = useStoreTariffs();
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
                Мы&nbsp;разработали модель ценообразования {{ COMPANY_NAME }} с&nbsp;учетом особенностей
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
                                path: '/auth/registration',
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

    @include respond-to(tablet) {
        width: var(--container-adaptive-width);
        padding: calc(var(--ui-unit) * 8) 0;
    }

    & > :global(.UiPlate__wrapper) {
        display: flex;
        flex-direction: column;
        row-gap: calc(var(--ui-unit) * 8);
        padding: calc(var(--ui-unit) * 8) calc(var(--ui-unit) * 16);

        @include respond-to(tablet) {
            row-gap: calc(var(--ui-unit) * 4);
            padding: calc(var(--ui-unit) * 8) calc(var(--ui-unit) * 4);
        }
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
    grid-template-areas:
        'basic standart'
        'premium premium';
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    grid-column-gap: calc(var(--ui-unit) * 4);
    grid-row-gap: calc(var(--ui-unit) * 4);

    @include respond-to(tablet) {
        grid-template-areas:
            'basic basic'
            'standart standart'
            'premium premium';
    }
}

.item {
    user-select: none;

    :global(.UiPlate__wrapper) {
        display: flex;
        flex-direction: column;
        align-items: center;
        row-gap: calc(var(--ui-unit) * 4);
        padding: calc(var(--ui-unit) * 8);
        text-align: center;

        @include respond-to(tablet) {
            padding: calc(var(--ui-unit) * 4);
        }
    }

    &.--basic-plan {
        grid-area: basic;
    }

    &.--standard-plan {
        grid-area: standart;
    }

    &.--premium-plan {
        grid-area: premium;
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

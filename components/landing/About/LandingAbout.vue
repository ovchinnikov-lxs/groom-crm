<script setup lang="ts">
// Constants
import { COMPANY_NAME } from '~/assets/ts/constants';
</script>

<template>
    <section class="LandingAbout">
        <UiPlate
            color="white"
            rounded
            :class="$style.wrapper"
        >
            <h3>О НАС</h3>

            <div class="text-large">
                {{ COMPANY_NAME }} была основана командой страстных любителей животных,
                которые понимают важность груминга для наших любимых питомцев. <b>Наша миссия&nbsp;&mdash;
                    облегчить жизнь владельцам салонов и&nbsp;их&nbsp;клиентам, предоставив беспроблемный
                    и&nbsp;эффективный способ управления и&nbsp;развития их&nbsp;бизнеса.</b> Мы&nbsp;стремимся
                предлагать индивидуальные решения, отвечающие уникальным потребностям салонов груминга,
                помогая вам оставаться впереди на&nbsp;конкурентном рынке с&nbsp;помощью нашего инновационного
                программного обеспечения.
            </div>
        </UiPlate>
    </section>
</template>

<style module lang="scss">
.wrapper {
    width: var(--container-width);
    height: 100%;
    margin: 0 auto;
    padding: calc(var(--ui-unit) * 32) 0;

    :global(.UiPlate__wrapper) {
        display: flex;
        flex-direction: column;
        row-gap: var(--ui-col);
        padding: calc(var(--ui-unit) * 12) calc(var(--ui-unit) * 24);
        border: var(--ui-unit) solid var(--ui-additional-color);
    }
}
</style>

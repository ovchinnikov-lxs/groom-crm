<script setup lang="ts">
// Constants
import { COMPANY_NAME } from '~/utils/const/company';
</script>

<template>
    <section class="LandingAdvantages">
        <div :class="$style.wrapper">
            <div :class="$style.plate">
                <h1>Почему мы?</h1>
            </div>

            <div :class="$style.container">

                <div :class="$style.imageWrapper">
                    <div :class="[$style.circle, $style['--is-large']]">
                        <div :class="[$style.circle, $style['--is-medium']]">
                            <div :class="[$style.circle, $style['--is-small']]">
                            </div>
                        </div>
                    </div>

                    <UiImage
                        storage-id="static"
                        :has-preview="false"
                        src="images/dog.png"
                        :class="$style.image"
                    />
                </div>

                <ol :class="$style.aside">
                    <li>
                        <b>{{ COMPANY_NAME }}</b> упрощает процесс ведения онлайн-записи, облегчая доступ к&nbsp;информации о&nbsp;клиентах и&nbsp;встречах в&nbsp;режиме реального времени.
                    </li>
                    <li>
                        Наш удобный интерфейс позволяет быстро и&nbsp;удобно планировать и&nbsp;вести прием.
                    </li>
                    <li>
                        Функция регистрации позволяет клиентам присоединиться к&nbsp;вашему салону через безопасный и&nbsp;беспрепятственный цифровой процесс.
                    </li>
                    <li>
                        Надежные функции управления финансами <b>{{ COMPANY_NAME }}</b> позволяют с&nbsp;легкостью отслеживать расходы, доходы и&nbsp;прибыль салона, делая вас организованным и&nbsp;информированным.
                    </li>
                    <li>
                        Наше программное обеспечение поставляется с&nbsp;настраиваемыми шаблонами, которые отвечают уникальным потребностям груминг-салонов и&nbsp;помогают повысить узнаваемость вашего бренда.
                    </li>
                </ol>
            </div>
        </div>
    </section>
</template>

<style module lang="scss">
.wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    row-gap: calc(var(--ui-unit) * 8);
    padding: calc(var(--ui-col) * 2) 0;

    @include respond-to(tablet) {
        row-gap: calc(var(--ui-unit) * 4);
        padding: calc(var(--ui-unit) * 8) 0;
    }
}

.plate {
    position: relative;
    z-index: 2;
    width: 59%;
    margin-left: auto;
    padding: calc(var(--ui-unit) * 8) var(--ui-col);
    border-radius: calc(var(--ui-unit) * 5) 0 0 calc(var(--ui-unit) * 5);
    background-color: var(--ui-additional-color);
    text-transform: uppercase;
    color: var(--ui-white-color);
    box-shadow: var(--ui-box-shadow);

    @include respond-to(tablet) {
        width: 90%;
        padding: calc(var(--ui-unit) * 6) calc(var(--ui-unit) * 12);
    }
}

.container {
    display: flex;
    align-items: center;
    width: var(--container-width);
    margin: 0 auto;

    @include respond-to(tablet) {
        position: relative;
        width: var(--container-adaptive-width);
    }
}

.imageWrapper {
    position: relative;
    width: calc(var(--ui-unit) * 120);
    height: calc(var(--ui-unit) * 120);

    @include respond-to(tablet) {
        @include aspect-ratio(1,1);

        position: absolute;
        top: 50%;
        left: 50%;
        width: 45%;
        height: auto;
        opacity: .4;
        transform: translate3d(-50%, -50%, 0);
    }
}

.image {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 3;
    width: 100%;
    object-fit: contain;
    height: 100%;
    transform: translate3d(-50%, -50%, 0);
}

.circle {
    position: absolute;
    inset: 0;
    border-radius: 50%;

    &.--is-large {
        display: flex;
        width: 100%;
        height: 100%;
        border: 3px solid var(--ui-white-color);

        &:before,
        &:after {
            content: "";
            position: absolute;
            width: 6%;
            height: 6%;
            border-radius: 50%;
            background-color: var(--ui-additional-color);
        }

        &:before {
            top: 29%;
        }

        &:after {
            bottom: 0;
            left: 65%;
        }
    }

    &.--is-medium {
        display: flex;
        width: 80%;
        height: 80%;
        margin: auto;
        border: 3px solid var(--ui-white-color);

        &:before {
            content: "";
            position: absolute;
            top: 12%;
            right: 11%;
            width: 6%;
            height: 6%;
            border-radius: 50%;
            background-color: var(--ui-additional-color);
        }
    }

    &.--is-small {
        width: 62%;
        height: 62%;
        margin: auto;
        background-color: var(--ui-additional-color);
    }
}

.aside {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    width: calc(var(--ui-unit) * 168);
    row-gap: calc(var(--ui-unit) * 8);
    margin-left: auto;
    font-size: calc(var(--ui-unit) * 5);

    li {
        &::marker {
            font-weight: bold;
        }
    }

    @include respond-to(tablet) {
        width: 100%;
        margin-left: 0;
    }
}
</style>

<script setup lang="ts">
// Constants
import { COMPANY_NAME } from '~/assets/ts/constants';
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
                        :has-preview="false"
                        object-fit="contain"
                        src="/images/dog.png"
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
}

.plate {
    width: 59%;
    margin-left: auto;
    padding: calc(var(--ui-unit) * 8) var(--ui-col);
    border-radius: calc(var(--ui-unit) * 5) 0 0 calc(var(--ui-unit) * 5);
    background-color: var(--ui-additional-color);
    text-transform: uppercase;
    color: var(--ui-white-color);
    box-shadow: var(--ui-box-shadow);
}

.container {
    display: flex;
    align-items: center;
    width: var(--container-width);
    margin: 0 auto;
}

.imageWrapper {
    position: relative;
    width: calc(var(--ui-unit) * 120);
    height: calc(var(--ui-unit) * 120);
}

.image {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 3;
    width: 100%;
    height: 100%;
    transform: translate3d(-50%, -50%, 0);
}

.circle {
    border-radius: 50%;

    &.--is-large {
        position: relative;
        display: flex;
        width: calc(var(--ui-unit) * 120);
        height: calc(var(--ui-unit) * 120);
        border: 3px solid var(--ui-white-color);

        &:before,
        &:after {
            content: "";
            position: absolute;
            width: calc(var(--ui-unit) * 8);
            height: calc(var(--ui-unit) * 8);
            border-radius: 50%;
            background-color: var(--ui-additional-color);
        }

        &:before {
            top: calc(var(--ui-unit) * 32);
        }

        &:after {
            bottom: 0;
            left: 65%;
        }
    }

    &.--is-medium {
        position: relative;
        display: flex;
        width: calc(var(--ui-unit) * 96);
        height: calc(var(--ui-unit) * 96);
        margin: auto;
        border: 3px solid var(--ui-white-color);

        &:before {
            content: "";
            position: absolute;
            top: 10%;
            right: 11%;
            width: calc(var(--ui-unit) * 8);
            height: calc(var(--ui-unit) * 8);
            border-radius: 50%;
            background-color: var(--ui-additional-color);
        }
    }

    &.--is-small {
        width: calc(var(--ui-unit) * 75);
        height: calc(var(--ui-unit) * 75);
        margin: auto;
        background-color: var(--ui-additional-color);
    }
}

.aside {
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
}
</style>

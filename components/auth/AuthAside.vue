<script setup lang="ts">
// Constants
import { COMPANY_NAME } from '~/utils/const/company';
</script>

<template>
    <div class="AuthAside">
        <div :class="$style.wrapper">
            <h2>{{ COMPANY_NAME }}</h2>

            <h4 :class="$style.subtitle">Приложение для записи клиентов</h4>

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
    </div>
</template>

<style lang="scss" module>
.wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
}

.subtitle {
    color: var(--ui-secondary-color);
}

.imageWrapper {
    position: relative;
    width: calc(var(--ui-unit) * 86);
    height: calc(var(--ui-unit) * 148);
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

<template>
    <div class="UiEmpty">
        <div class="UiEmpty__wrapper">

            <UiImage
                src="/images/empty.png"
                :has-preview="false"
                object-fit="contain"
                class="UiEmpty__image"
            />

            <h5 class="UiEmpty__text">
                <slot name="text"></slot>
            </h5>
        </div>
    </div>
</template>

<style lang="scss">
.UiEmpty {
    &__wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        height: 100%;
        row-gap: calc(var(--ui-unit) * 8);
        padding: var(--ui-col) 0;
    }

    &__image {
        width: calc(var(--ui-unit) * 100);
    }

    &__text {
        text-align: center;
    }
}
</style>

<template>
    <div class="UiEmpty">
        <div class="UiEmpty__wrapper">
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
    }

    &__text {
        text-align: center;
    }
}
</style>

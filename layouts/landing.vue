<template>
    <div :class="$style.LandingLayout">
        <header>
            header
        </header>

        <main>
            <slot/>
        </main>

        <footer>
            footer
        </footer>
    </div>
</template>

<style lang="scss" module>
.LandingLayout {
    width: 100%;
    background-color: var(--ui-additional-light-color);
}
</style>

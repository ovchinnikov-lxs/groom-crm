<template>
    <div :class="$style.AuthLayout">
        <header :class="$style.header">
            <h1>GROOM.CRM</h1>
        </header>

        <main :class="$style.main">
            <slot />
        </main>
    </div>
</template>

<style lang="scss" module>
.AuthLayout {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    min-height: 100vh;
    row-gap: calc(var(--ui-unit) * 6);
    padding: var(--ui-col);
    background-color: var(--additional-light-color);

    @include respond-to(mobile) {
        padding: calc(var(--ui-unit) * 4);
    }
}

.header {
    flex-shrink: 0;

    h1 {
        margin: 0;
        text-align: center;
    }
}

.main {
    display: flex;
    flex-grow: 1;

    & > * {
        display: flex;
        flex-grow: 1;
        width: 100%;
    }
}
</style>

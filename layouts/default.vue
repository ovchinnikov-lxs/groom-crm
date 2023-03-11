<template>
    <div :class="$style.DefaultLayout">
        <div :class="$style.container">
            <slot />
        </div>
    </div>
</template>

<style lang="scss" module>
.DefaultLayout {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    min-height: 100vh;
}

.header,
.footer {
    flex-shrink: 0;
}

.container {
    flex-grow: 1;
}
</style>

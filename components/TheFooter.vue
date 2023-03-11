<template>
    <div class="TheFooter">
        <div :class="$style.wrapper">
            <NuxtLink :to="$routes.index">index</NuxtLink>
            <NuxtLink :to="$routes.second">second</NuxtLink>
        </div>
    </div>
</template>

<style lang="scss" module>
.wrapper {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    column-gap: mul($unit, 12);
    padding: mul($unit, 4);
}
</style>

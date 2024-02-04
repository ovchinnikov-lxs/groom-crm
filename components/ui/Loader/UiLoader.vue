<template>
    <div class="UiLoader">
        <div class="UiLoader__wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
                <radialGradient
                    id="a9"
                    cx=".66"
                    fx=".66"
                    cy=".3125"
                    fy=".3125"
                    gradientTransform="scale(1.5)"
                ><stop offset="0" stop-color="var(--ui-primary-color)"/><stop
                    offset=".3"
                    stop-color="var(--ui-primary-color)"
                    stop-opacity=".9"
                /><stop
                    offset=".6"
                    stop-color="var(--ui-primary-color)"
                    stop-opacity=".6"
                /><stop
                    offset=".8"
                    stop-color="var(--ui-primary-color)"
                    stop-opacity=".3"
                /><stop
                    offset="1"
                    stop-color="var(--ui-primary-color)"
                    stop-opacity="0"
                /></radialGradient><circle
                    transform-origin="center"
                    fill="none"
                    stroke="url(#a9)"
                    stroke-width="30"
                    stroke-linecap="round"
                    stroke-dasharray="200 1000"
                    stroke-dashoffset="0"
                    cx="100"
                    cy="100"
                    r="70"
                ><animateTransform
                    type="rotate"
                    attributeName="transform"
                    calcMode="spline"
                    dur="1.7"
                    values="360;0"
                    keyTimes="0;1"
                    keySplines="0 0 1 1"
                    repeatCount="indefinite"
                /></circle><circle
                    transform-origin="center"
                    fill="none"
                    opacity=".2"
                    stroke="var(--ui-primary-color)"
                    stroke-width="30"
                    stroke-linecap="round"
                    cx="100"
                    cy="100"
                    r="70"
                /></svg>
        </div>
    </div>
</template>

<style lang="scss">
.UiLoader {
    &__wrapper {
        width: 100%;
        height: 100%;
    }
}
</style>

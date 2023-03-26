<template>
    <div class="DefaultModalContainer">
        <transition
            appear
            name="bottom"
            mode="out-in"
        >
            <div :class="$style.wrapper">

                <header :class="$style.header">
                    <slot name="header"></slot>

                    <div :class="$style.close" @click="$emit('close')">
                        <nuxt-icon name="ui/close" :class="$style.icon"/>
                    </div>
                </header>

                <main :class="$style.main">
                    <slot name="default"></slot>
                </main>

                <footer :class="$style.footer">
                    <slot name="footer"></slot>
                </footer>

            </div>
        </transition>
    </div>
</template>

<style lang="scss" module>
.wrapper {
    display: flex;
    flex-direction: column;
    width: calc(var(--ui-col) * 25);
    min-height: calc(var(--ui-unit) * 125);
    max-height: calc(var(--ui-col) * 20);
    margin: 0 auto;
    border-radius: calc(var(--ui-unit) * 2.5);
    background-color: var(--ui-white-color);
}

.header,
.footer {
    flex-shrink: 0;
    user-select: none;
}

.header {
    display: flex;
    align-items: center;
    column-gap: var(--ui-col);
    padding: calc(var(--ui-unit) * 8) var(--ui-col) 0;
}

.close {
    margin-left: auto;
    transition: transform .3s ease;
    cursor: pointer;

    svg {
        width: calc(var(--ui-unit) * 6);
        height: calc(var(--ui-unit) * 6);
    }

    @include hover {
        transform: rotate(90deg);
    }
}

.main {
    flex-grow: 1;
    padding: calc(var(--ui-unit) * 6) var(--ui-col);
}

.footer {
    display: flex;
    align-items: center;
    column-gap: calc(var(--ui-unit) * 4);
    margin-top: auto;
    padding: calc(var(--ui-unit) * 8) var(--ui-col) calc(var(--ui-unit) * 8);

    & > * {
        flex-grow: 1;
    }
}
</style>

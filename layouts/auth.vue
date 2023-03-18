<template>
    <div :class="$style.AuthLayout">
        <header :class="$style.header">
            <section :class="$style.container">

                <DefaultTheLogo size="large" :class="$style.logo"/>

            </section>
        </header>

        <main :class="$style.main">
            <section :class="$style.container">
                <AuthAside :class="$style.aside"/>

                <div :class="$style.content">
                    <slot/>
                </div>
            </section>
        </main>

        <footer :class="$style.footer">
            <section :class="$style.container">
                <!--      todo: Добавить соц сети          -->
            </section>
        </footer>
    </div>
</template>

<style lang="scss" module>
.AuthLayout {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    min-height: 100vh;
}

.container {
    @include container;

    display: flex;
    align-items: center;
}

.header,
.footer {
    display: flex;
    align-items: center;
    width: 100%;
    background-color: var(--ui-additional-color);
}

.header {
    height: calc(var(--ui-unit) * 18);
}

.logo {
    margin-left: auto;
}

.footer {
    height: calc(var(--ui-unit) * 12);
}

.copy {
    margin-left: auto;
    color: var(--ui-white-color);
}

.main {
    display: flex;
    flex-grow: 1;

    .container {
        column-gap: calc(var(--ui-unit) * 8);
    }
}

.content {
    width: calc(var(--ui-col) * 14);
    margin-left: auto;
}
</style>

<script setup lang="ts">
const { $routes } = useNuxtApp();
const auth = useAuth();

const isOpened = ref(false);
async function onLogout() {
    isOpened.value = false;
    await auth.logout();
    navigateTo($routes.auth.login);
}
</script>

<template>
    <div class="DefaultMenuUser">
        <div :class="$style.wrapper">


            <div :title="auth.user.fullName" :class="$style.previewWrapper">
                <UiImage
                    v-if="auth.user.preview"
                    :src="auth.user.preview"
                    :class="$style.preview"
                />

                <div>{{ auth.user?.fullName?.split(' ').map(i => i[0]).join('') }}</div>
            </div>

            <UiTooltip
                v-model="isOpened"
                interactive
                position="bottom"
            >
                <template #header>
                    <UiButton
                        tag="NuxtLink"
                        :to="$routes.user.detail"
                        icon
                        size="small"
                        :class="$style.button"
                    >
                        <UiIcon name="ui/settings"/>
                    </UiButton>
                </template>

                <template #bottom>
                    <UiButton size="x-small" @click="onLogout">
                        Выйти
                    </UiButton>
                </template>
            </UiTooltip>

        </div>
    </div>
</template>

<style module lang="scss">
.wrapper {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    height: 100%;
    column-gap: calc(var(--ui-unit) * 2);
}

.previewWrapper {
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: calc(var(--ui-unit) * 8);
    height: calc(var(--ui-unit) * 8);
    border-radius: 50%;
    background-color: var(--ui-additional-light-color);
    font-size: calc(var(--ui-unit) * 3);
    color: var(--ui-secondary-color);
    transform: translate3d(0, 0, 0);
    user-select: none;
}

.preview {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.name {
    color: var(--ui-black-color);
}

.button {
    flex-shrink: 0;
}
</style>

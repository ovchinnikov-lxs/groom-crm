<script setup lang="ts">
const { $routes } = useNuxtApp();

const user = {
    full_name: 'Анастасия Молькова',
    preview: null,
};
</script>

<template>
    <div class="DefaultMenuUser">
        <div :class="$style.wrapper">

            <div :title="user.full_name" :class="$style.previewWrapper">
                <UiImage
                    v-if="user.preview"
                    :src="user.preview"
                    :class="$style.preview"
                />

                <div>{{ user.full_name.split(' ').map(i => i[0]).join('') }}</div>
            </div>

            <UiButton
                tag="NuxtLink"
                :to="$routes.user.detail"
                icon
                size="small"
                :class="$style.button"
            >
                <UiIcon name="ui/settings"/>
            </UiButton>

        </div>
    </div>
</template>

<style module lang="scss">
.wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    row-gap: calc(var(--ui-unit) * 2);
}

.previewWrapper {
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: var(--ui-col);
    height: var(--ui-col);
    border-radius: 50%;
    background-color: var(--ui-additional-light-color);
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

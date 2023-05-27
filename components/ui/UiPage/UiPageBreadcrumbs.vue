<script setup lang="ts">
const breadcrumbs = useBreadcrumbs();
</script>

<template>
    <div class="UiPageBreadcrumbs">
        <transition name="right" mode="out-in">
            <div :key="breadcrumbs.render" class="UiPageBreadcrumbs__wrapper">
                <div
                    v-for="(item, index) in breadcrumbs.list"
                    :key="index"
                    class="UiPageBreadcrumbs__item"
                >

                    <UiIcon
                        v-if="index"
                        size="large"
                        name="ui/arrow-right"
                        class="UiPageBreadcrumbs__icon"
                    />

                    <UiLink
                        :tag="!item.to ? 'span' : 'NuxtLink'"
                        :to="item.to"
                        size="custom"
                        :color="index || breadcrumbs.list.length === 1 ? 'black' : 'secondary'"
                        class="UiPageBreadcrumbs__link"
                    >
                        <b>
                            {{ item.title }}
                        </b>
                    </UiLink>

                </div>
            </div>
        </transition>
    </div>
</template>

<style lang="scss">
.UiPageBreadcrumbs {
    &__wrapper {
        display: flex;
        align-items: center;
        column-gap: calc(var(--ui-unit) * 8);
    }

    &__icon {
        position: absolute;
        top: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--ui-secondary-color);
        transform: translate3d(-100%, -50%, 0);
    }

    &__item {
        position: relative;
        display: flex;
        align-items: flex-end;
        font-size: calc(var(--ui-unit) * 6);
    }

    &__link {
        &:not(.--is-interactive) {
            cursor: default;
        }
    }
}
</style>

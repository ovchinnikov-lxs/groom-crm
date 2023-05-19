<script setup lang="ts">
import { useBreadCrumbsStore } from '~/stores/bread-crumbs';

const store = useBreadCrumbsStore();
await useAsyncData('breadCrumbs', async () => store.list);

const list = computed(() => store.list);
</script>

<template>
    <div class="UiPageBreadCrumbs">
        <transition name="right" mode="out-in">
            <div :key="JSON.stringify(list)" class="UiPageBreadCrumbs__wrapper">
                <div
                    v-for="(item, index) in list"
                    :key="index"
                    class="UiPageBreadCrumbs__item"
                >

                    <UiIcon
                        v-if="index"
                        size="large"
                        name="ui/arrow-right"
                        class="UiPageBreadCrumbs__icon"
                    />

                    <UiLink
                        :tag="!item.to ? 'span' : 'NuxtLink'"
                        :to="item.to"
                        size="custom"
                        :color="index || list.length === 1 ? 'black' : 'secondary'"
                        class="UiPageBreadCrumbs__link"
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
.UiPageBreadCrumbs {
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

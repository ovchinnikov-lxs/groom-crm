<script setup lang="ts">
defineProps({
    title: {
        type: String,
        required: true,
    },

    to: {
        type: String,
        required: true,
    },

    icon: {
        type: String,
        required: true,
    },
});
</script>
<template>
    <NuxtLink
        :to="to"
        :title="title"
        :class="$style.DefaultMenuItem"
    >
        <div :class="$style.wrapper">
            <nuxt-icon :name="`menu/${icon}`" :class="$style.icon"/>

            <span>
                {{ title }}
            </span>
        </div>
    </NuxtLink>
</template>

<style lang="scss" module>
.DefaultMenuItem {
    &:global(.--is-active-link) {
        .wrapper {
            &:before {
                transform: translateX(0);
            }
        }
    }
}

.wrapper {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    column-gap: calc(var(--ui-unit) * 3);
    padding: calc(var(--ui-unit) * 4) calc(var(--ui-unit) * 8);
    font-size: calc(var(--ui-unit) * 6);
    line-height: 150%;
    color: var(--ui-black-color);
    transition: color .3s ease;

    &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: calc(var(--ui-unit) + 1px);
        background-color: var(--ui-white-color);
        transform: translateX(calc(-100% - 24px));
        transition: all .3s ease;
    }

    .icon,
    span {
        position: relative;
        z-index: 2;
    }

    @include hover {
        &:before {
            transform: translateX(-100%);
        }
    }
}

.icon {
    flex-shrink: 0;
    width: calc(var(--ui-unit) * 8);
    height: calc(var(--ui-unit) * 8);
}
</style>

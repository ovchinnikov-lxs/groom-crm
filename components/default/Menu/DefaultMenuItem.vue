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
            <UiIcon
                :name="`menu/${icon}`"
                size="large"
                :class="$style.icon"
            />

            <b>
                {{ title }}
            </b>
        </div>
    </NuxtLink>
</template>

<style lang="scss" module>
.DefaultMenuItem {
    display: block;

    &:global(.--is-active-link) {
        .wrapper {
            &:before {
                transform: translateY(50%);
            }
        }

        &:global(:not(.--is-exact-link)) {
            @include hover {
                .wrapper {
                    &:before {
                        transform: translateY(0);
                    }
                }
            }
        }
    }

    &:global(.--is-exact-link) {
        .wrapper {
            color: var(--ui-white-color);

            &:before {
                transform: translateY(0);
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
    padding: calc(var(--ui-unit) * 3);
    font-size: calc(var(--ui-unit) * 4);
    line-height: 150%;
    color: var(--ui-black-color);
    transition: color .3s ease;
    user-select: none;

    &:before {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: var(--ui-unit);
        border-radius: 2px 2px 0 0;
        background-color: var(--ui-white-color);
        transform: translateY(100%);
        transition: all .3s ease;
    }

    .icon,
    b {
        position: relative;
        z-index: 2;
    }

    @include hover {
        &:before {
            transform: translateY(0);
        }
    }

    @include respond-to(mobile) {
        b {
            display: none;
        }
    }
}

.icon {
    flex-shrink: 0;
}
</style>

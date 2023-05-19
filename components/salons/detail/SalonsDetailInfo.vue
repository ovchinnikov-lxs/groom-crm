<script setup lang="ts">
import type { PropType } from 'vue';
import { plural } from '~/assets/ts/utils/format-utils';
import { modal } from '~/composables/modal';

defineProps({
    id: {
        type: String,
        required: true,
    },

    image: {
        type: [String, null] as PropType<string | null>,
        default: null,
    },

    name: {
        type: String,
        required: true,
    },

    openAt: {
        type: String,
        required: true,
    },

    closeAt: {
        type: String,
        required: true,
    },

    masters: {
        type: Array,
        default: () => [],
    },
});

function onUpdate() {
    modal.open({
        component: defineAsyncComponent(() => import('~/components/salons/SalonSave.vue')),
        componentProps: {
            type: 'update',
        },
    });
}
</script>
<template>
    <UiPlate class="SalonsDetailInfo">
        <div :class="$style.wrapper">

            <div :class="$style.imageWrapper">
                <UiImage
                    v-if="image"
                    :src="image"
                    :class="$style.image"
                />
            </div>

            <div :class="$style.info">
                <h5>{{ name }}</h5>

                <div class="text-x-small" :class="$style.time">
                    С {{ openAt }} до {{ closeAt }}
                </div>

                <div class="text-medium">
                    <template v-if="masters.length">
                        {{ masters.length }} мастер{{ plural(masters.length, ['', 'а', 'ов']) }}
                    </template>
                    <template v-else>
                        Нет мастеров
                    </template>
                </div>

            </div>

            <UiIcon
                name="ui/edit"
                size="large"
                :class="$style.icon"
                @click="onUpdate"
            />

        </div>
    </UiPlate>
</template>

<style lang="scss" module>
.wrapper {
    display: flex;
    align-items: flex-start;
    width: 100%;
    height: 100%;
    column-gap: calc(var(--ui-unit) * 4);
    padding: calc(var(--ui-unit) * 4);
}

.imageWrapper {
    overflow: hidden;
    flex-shrink: 0;
    width: calc(var(--ui-unit) * 20);
    height: calc(var(--ui-unit) * 20);
    border-radius: calc(var(--ui-unit) * 2.5);
    background-color: var(--ui-white-color);
    transform: translate3d(0, 0, 0);
}

.image {
    width: 100%;
    height: 100%;
}

.info {
    display: flex;
    flex-direction: column;
    row-gap: var(--ui-unit);
}

.time {
    color: var(--ui-secondary-color);
}

.icon {
    margin-left: auto;
    transition: color .3s ease;
    cursor: pointer;

    @include hover {
        color: var(--ui-primary-color);
    }
}
</style>

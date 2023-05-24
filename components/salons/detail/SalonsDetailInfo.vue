<script setup lang="ts">
import type { PropType } from 'vue';
import { plural } from '~/assets/ts/utils/format-utils';

defineProps({
    id: {
        type: String,
        required: true,
    },

    preview: {
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

defineEmits<{(e: 'update'): void; (e: 'delete'): void }>();
</script>
<template>
    <UiPlate class="SalonsDetailInfo">
        <div :class="$style.wrapper">

            <SalonsPreview :preview="preview" :class="$style.preview"/>

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

            <div :class="$style.controls">
                <UiButton size="small" @click="$emit('update')">
                    Редактировать
                </UiButton>

                <UiButton
                    outline
                    color="error"
                    size="small"
                    @click="$emit('delete')"
                >
                    Удалить
                </UiButton>
            </div>

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

.preview {
    overflow: hidden;
    flex-shrink: 0;
    width: calc(var(--ui-unit) * 20);
    height: calc(var(--ui-unit) * 20);
    border-radius: calc(var(--ui-unit) * 2.5);
    transform: translate3d(0, 0, 0);
}

.info {
    display: flex;
    flex-direction: column;
    row-gap: var(--ui-unit);
}

.time {
    color: var(--ui-secondary-color);
}

.controls {
    display: flex;
    flex-direction: column;
    row-gap: calc(var(--ui-unit) * 3);
    margin-left: auto;
}
</style>

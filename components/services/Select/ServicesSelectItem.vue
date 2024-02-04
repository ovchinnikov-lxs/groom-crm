<script setup lang="ts">
import type { IService } from '~/types/services';
import { getHumanTime, plural, splitThousands } from '~/utils/format';

interface IServiceSelectItem extends IService{
    active?: boolean;
}

defineProps<IServiceSelectItem>();

defineEmits<{
    remove: [id: string]
}>();
</script>

<template>
    <div class="ServicesSelectItem">
        <div :class="$style.wrapper">

            <div :class="$style.imageWrapper">
                <UiImage
                    v-if="preview"
                    :src="preview"
                    :class="$style.image"
                />
            </div>

            <div :class="$style.content">

                <h3 :class="$style.name">
                    {{ name }}
                </h3>

                <div :class="$style.description" v-html="description">
                </div>

                <div :class="$style.info">
                    <div :class="$style.duration">
                        <template v-if="getHumanTime(duration).hours">
                            {{ getHumanTime(duration).hours }} час{{ plural(getHumanTime(duration).hours, ['', 'а', 'ов']) }}
                        </template>
                        <template v-if="getHumanTime(duration).minutes">
                            <template v-if="getHumanTime(duration).hours">,</template>
                            {{ getHumanTime(duration).minutes }} минут{{ plural(getHumanTime(duration).minutes, ['а', 'ы', '']) }}
                        </template>
                    </div>

                    <b :class="$style.price">
                        {{ splitThousands(price) }} ₽
                    </b>
                </div>

            </div>

            <UiIcon
                v-if="active"
                name="ui/delete"
                :class="$style.delete"
                @click="$emit('remove', id)"
            />

        </div>
    </div>
</template>

<style lang="scss" module>
.wrapper {
    display: flex;
    align-items: flex-start;
    width: 100%;
    height: 100%;
    column-gap: calc(var(--ui-unit) * 4);
    padding: calc(var(--ui-unit) * 4) calc(var(--ui-unit) * 6);
    border-radius: calc(var(--ui-unit) * 4);
    border: 1px solid var(--ui-additional-color);
    background-color: var(--ui-white-color);
    transition: transform .3s ease;

    @include hover {
        transform: scale(1.01);
    }
}

.imageWrapper {
    @include aspect-ratio(1,1);

    position: sticky;
    top: 0;
    width: 10%;
    border-radius: calc(var(--ui-unit) * 4);
    border: 1px solid var(--ui-additional-color);
}

.content {
    display: flex;
    flex-direction: column;
    row-gap: calc(var(--ui-unit) * 3);
    margin-left: auto;
    text-align: right;
}

.info {
    display: flex;
    align-items: center;
    column-gap: calc(var(--ui-unit) * 3);
    margin-top: auto;
    margin-left: auto;
}

.name {
    font-size: calc(var(--ui-unit) * 6);
}

.description {
    color: var(--ui-secondary-color);
}

.delete {
    flex-shrink: 0;
    color: var(--ui-error-color);
    transition: color .3s ease;
    cursor: pointer;

    @include hover {
        color: var(--ui-primary-color);
    }
}
</style>

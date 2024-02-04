<script setup lang="ts">
import { plural } from '~/utils/format';
import type { Tables } from '~/types/supabase';

interface ISalon extends Tables<'Salon'>{
    staff: {
        user: Tables<'Profile'>
    }[];
}

interface IProps {
    salon: ISalon
}

const props = defineProps<IProps>();

defineEmits<{(e: 'update'): void; (e: 'delete'): void }>();
const storeProfile = useStoreProfile();

const masters = computed(() => props.salon.staff
    .filter(item => [ROLES_KEYS.MASTER, ROLES_KEYS.OWNER]
        .includes(item.user.role)));
</script>

<template>
    <UiPlate class="SalonsDetailInfo">
        <div :class="$style.wrapper">

            <SalonsPreview :preview="salon.avatar" :class="$style.preview"/>

            <div :class="$style.info">
                <h5>{{ salon.name }}</h5>

                <div class="text-x-small" :class="$style.time">
                    С {{ salon.open_at.slice(0, 5) }} до {{ salon.close_at.slice(0, 5) }}
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

            <div v-if="storeProfile.isOwner" :class="$style.controls">
                <LazyUiButton size="small" @click="$emit('update')">
                    Редактировать
                </LazyUiButton>

                <LazyUiButton
                    outline
                    color="error"
                    size="small"
                    @click="$emit('delete')"
                >
                    Удалить
                </LazyUiButton>
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

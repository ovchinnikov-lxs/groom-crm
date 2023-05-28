<script setup lang="ts">
import { PropType } from 'vue';
import SalonsMasterCol from '~/components/salons/master/SalonsMasterCol.vue';

export interface IScheduleItem {
    id: string
    service_name: string
    pet_breed: string
    pet_name: string
    service_price: number
    service_time: number
    booked_time: string
    status: 'active' | 'cancelled' | 'ready'
}

export interface IScheduleMaster {
    id: string
    name: string
    schedule: Array<IScheduleItem>
}

const props = defineProps({
    openAt: {
        type: String,
        required: true,
    },

    closeAt: {
        type: String,
        required: true,
    },

    schedule: {
        type: Array as PropType<IScheduleMaster[]>,
        default: () => [],
    },
});

const hourDiff = ref(0);
const TODAY = `01/01/${new Date().getFullYear()}`;

function onInitSchedule() {
    const OPEN_AT_TIME = new Date(`${TODAY} ${props.openAt}:00`);
    const CLOSE_AT_TIME = new Date(`${TODAY} ${props.closeAt}:00`);

    const timeStart = OPEN_AT_TIME.getHours();
    const timeEnd = CLOSE_AT_TIME.getHours();
    hourDiff.value = timeEnd - timeStart + 1;
}

watch(props, () => {
    onInitSchedule();
}, { immediate: true });

const getTime = computed(() => (index: number) => {
    const date = new Date(`${TODAY} ${props.openAt}:00`);
    date.setHours(date.getHours() + index);

    return date.toLocaleTimeString(['RU'], { hour: '2-digit', minute: '2-digit' });
});
</script>

<template>
    <div class="SalonsDetailSchedule">
        <div :class="$style.wrapper">

            <div :class="$style.masters">
                <SalonsMasterCol
                    v-for="item in schedule"
                    :key="item.id"
                    :open-at="openAt"
                    v-bind="item"
                    :class="$style.col"
                />
            </div>

            <div :class="$style.schedule">
                <div
                    v-for="(_, index) in hourDiff"
                    :key="index"
                    :data-title="getTime(index)"
                    :class="$style.line"
                >

                </div>
            </div>

        </div>
    </div>
</template>

<style lang="scss" module>
.wrapper {
    --master-name-height: calc(var(--ui-unit) * 10);

    position: relative;
    width: 100%;
    height: 100%;
    margin-top: var(--master-name-height);
    border-radius: calc(var(--ui-unit) * 4);
    border: 1px solid var(--ui-additional-color);
    background-color: rgba(var(--ui-additional-light-color-rgb), .4);
}

.masters {
    @include scrollbar;

    position: absolute;
    top: calc(var(--master-name-height) * -1);
    left: 0;
    overflow: auto;
    display: flex;
    width: 100%;
    height: calc(100% + var(--master-name-height));
    column-gap: calc(var(--ui-unit) * 4);
    padding: 0 calc(var(--ui-unit) * 5);
    border-radius: calc(var(--ui-unit) * 4);
}

.col {
    flex-shrink: 0;
    min-width: calc(var(--ui-unit) * 65);
}

.schedule {
    width: 100%;
    height: 100%;
    padding: var(--ui-col) 0;
    pointer-events: none;
}

.line {
    position: relative;
    height: calc(var(--ui-col) * 2);
    border-top: 1px solid rgba(var(--ui-additional-color-rgb), .4);

    &:last-child {
        height: 0;
    }

    &:before {
        content: attr(data-title);
        position: absolute;
        font-size: calc(var(--ui-unit) * 3);
        line-height: 125%;
        color: var(--ui-additional-color);
        transform: translate3d(calc(-100% - var(--ui-unit)), -50%, 0);
    }
}
</style>
